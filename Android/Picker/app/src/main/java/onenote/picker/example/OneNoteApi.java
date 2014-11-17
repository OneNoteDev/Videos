package onenote.picker.example;

import android.app.Activity;
import android.os.AsyncTask;
import android.util.Log;

import com.microsoft.live.LiveAuthClient;
import com.microsoft.live.LiveAuthException;
import com.microsoft.live.LiveAuthListener;
import com.microsoft.live.LiveConnectSession;
import com.microsoft.live.LiveStatus;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class OneNoteApi {
    private static final String ENDPOINT = "https://www.onenote.com/api/v1.0/";
    public final List<String> scopes = Arrays.asList("wl.signin", "wl.offline_access", "office.onenote_create");
    public final String clientId;
    public String liveAuthToken = "";

    private static final String ISO_8601 = "yyyy-MM-dd HH:mm:ss.SSSZ";
    private static final String TAG = "OneNote";
    private final Activity activity;  
    private LiveAuthClient liveClient;

    public OneNoteApi(Activity a) {
        this.activity = a;
        this.clientId = a.getResources().getString(R.string.clientId);
        liveClient = new LiveAuthClient(activity, clientId);
    }

    public void signin(final Callback<String> cb) {
        liveClient.login(activity, scopes, new LiveAuthListener() {
            @Override
            public void onAuthComplete(LiveStatus status, LiveConnectSession session, Object userState) {
                if (status == LiveStatus.CONNECTED) {
                    liveAuthToken = session.getAccessToken();
                    cb.success(session.getAccessToken());
                } else {
                    Exception e = new Exception("Auth Failed " + status.name());
                    Log.e(TAG, "signin failed", e);
                    cb.failure(e);
                }
            }

            @Override
            public void onAuthError(LiveAuthException exception, Object userState) {
                cb.failure(exception);
                Log.e(TAG, "auth failed", exception);
            }
        });
    }

    public static String pageHtml(){
        String date = new SimpleDateFormat(ISO_8601).format(new Date());
        final String html = "<html>" +
                "<head>" +
                "<title>OneNote Section Picker Demo</title>" +
                "<meta name=\"created\" content=\"" + date + "\" />" +
                "</head>" +
                "<body>" +
                "<img data-render-src=\"http://blogs.msdn.com/b/onenotedev/archive/2014/07/22/ios-and-android-section-pickers-now-available.aspx\" alt=\"A beautiful logo\" width=\"1500\" />" +
                 "</body>" +
                "</html>";
        return html;
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    public void createPage(final String html, final String sectionId, final Callback<String> cb ){


        new AsyncTask(){

            @Override
            protected Object doInBackground(Object... params) {


                try {

                    HttpURLConnection conn = (HttpURLConnection) new URL(ENDPOINT+"sections/"+sectionId+"/pages").openConnection();
                    conn.setDoInput(true);
                    conn.setDoOutput(true);
                    conn.setRequestMethod("POST");

                    conn.setRequestProperty("Content-Type", "text/html");
                    conn.setRequestProperty("Accept", "application/json");
                    conn.setRequestProperty("Authorization", "Bearer "+liveAuthToken);

                    DataOutputStream out = new DataOutputStream(conn.getOutputStream());
                    out.write(html.getBytes("UTF-8"));
                    out.flush();
                    out.close();

                    cb.success(streamToString( conn.getInputStream() ));


                } catch (Exception e) {
                    cb.failure(e);
                }



                return null;
            }
        }.execute();




    }

    public static String streamToString(InputStream is) throws Exception {

        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        StringBuilder sb = new StringBuilder();

        String line = null;
        try {
            while ((line = reader.readLine()) != null) {
                sb.append(line + "\n");
            }

        } finally {
            try {
                is.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return sb.toString();
    }


}
