package com.example.onenotesample;

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

import android.app.Activity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.microsoft.live.LiveAuthClient;
import com.microsoft.live.LiveAuthException;
import com.microsoft.live.LiveAuthListener;
import com.microsoft.live.LiveConnectSession;
import com.microsoft.live.LiveStatus;

public class MainActivity extends Activity {

    private static final String ONENOTE_CREATE_PAGE_ENDPOINT = "https://www.onenote.com/api/v1.0/pages";
    //TODO: enter your apps client id
	private static final String CLIENT_ID = "";
	private static final String ISO_8601 = "yyyy-MM-dd HH:mm:ss.SSSZ";
	private TextView textView;
	private LiveAuthClient liveClient;
	private String token;

	@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        textView = (TextView) findViewById(R.id.text);
    }
	
	private void log(final String text) {
		runOnUiThread(new Runnable() {
			
			@Override
			public void run() {
				textView.append(text+"\n");
			}
		});
	}
	
	public void signIn(View v){
		
		liveClient = new LiveAuthClient(this, CLIENT_ID);
		liveClient.login(this, Arrays.asList("wl.signin", "office.onenote_create", "wl.offline_access"), new LiveAuthListener() {
			
			

			@Override
			public void onAuthError(LiveAuthException ex, Object arg1) {
				log(ex.getMessage());
			}
			
			@Override
			public void onAuthComplete(LiveStatus status, LiveConnectSession session, Object arg2) {
				if(status == LiveStatus.CONNECTED){
					log("Connected");
					token = session.getAccessToken();
					findViewById(R.id.createPage).setEnabled(true);
				}
			}
		});
		
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void createPage(View v){
		String date = new SimpleDateFormat(ISO_8601).format(new Date());
		final String html = "<html>" +
                "<head>" +
                "<title>A Sample Android App Page</title>" +
                "<meta name=\"created\" content=\"" + date + "\" />" + 
            "</head>" +
            "<body>" +
                "<p>This is a page that just contains some simple <i>formatted</i> <b>text</b></p>" +
                "<p>Here is a <a href=\"http://www.microsoft.com\">link</a></p>" +
                "<p>Here is an image: <img src=\"http://i.microsoft.com/global/en-us/news/publishingimages/homepage/highlights/prod_xboxone_hl.jpg\" />" +
            "</body>" +
          "</html>";
		
		new AsyncTask(){

			@Override
			protected Object doInBackground(Object... params) {
				log("uploading...");
				
				try {
					
					HttpURLConnection conn = (HttpURLConnection) new URL(ONENOTE_CREATE_PAGE_ENDPOINT).openConnection();
					conn.setDoInput(true);
					conn.setDoOutput(true);
					conn.setRequestMethod("POST");
					
					conn.setRequestProperty("Content-Type", "text/html");
					conn.setRequestProperty("Accept", "application/json");
					conn.setRequestProperty("Authorization", "Bearer "+token);
					
					DataOutputStream out = new DataOutputStream(conn.getOutputStream());
					out.write(html.getBytes("UTF-8"));
					out.flush();
					out.close();
					
					log("upload complete");
					
					log("RESPONSE: "+conn.getResponseCode());
					log( streamToString( conn.getInputStream() ) );
					
				} catch (Exception e) {
					log(e.getMessage());
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
