package onenote.picker.example;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.microsoft.onenote.pickerlib.OneNotePickerActivity;

import java.net.URL;
import java.util.Date;

public class MyActivity extends Activity {


    private static final int REQUEST_ID = 100;
    private View btnCreateDoc;
    private View btnSignin;
    private OneNoteApi oneNoteApi;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my);

        btnSignin = findViewById(R.id.signin);
        btnCreateDoc = findViewById(R.id.createDoc);

        this.oneNoteApi = new OneNoteApi(this);
    }

    public void signin(View v) {
        oneNoteApi.signin(new UICallback<String>(this) {
            @Override
            public void onSuccess(String token) {
                toast("Auth success");
                btnSignin.setEnabled(false);
                btnCreateDoc.setEnabled(true);
            }

            @Override
            public void onFailure(Throwable error) {
                toast("Auth Failed");
            }

        });
    }

    public void createDocument(View v) {


        Intent i = new Intent(this,OneNotePickerActivity.class);
        i.putExtra("ACCESS_TOKEN", oneNoteApi.liveAuthToken);
        startActivityForResult(i, REQUEST_ID);
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        //PICKER COMPLETES WITH SELECTED SECTION
        if(requestCode == REQUEST_ID) {
            if (resultCode == RESULT_OK) {

                //LOAD VALUES
                String sectionID = data.getExtras().getString("SECTION_ID");
                String sectionName = data.getExtras().getString("SECTION_NAME");
                URL pagesURL = (URL) data.getExtras().get("PAGES_URL");
                Date createdTime = (Date) data.getExtras().get("CREATED_TIME");
                Date modifiedTime = (Date) data.getExtras().get("MODIFIED_TIME");
                String lastModifiedBy = data.getExtras().getString("LAST_MODIFIED_BY");

                //DO SOMETHING WITH THE INFO
                oneNoteApi.createPage(OneNoteApi.pageHtml(), sectionID,new UICallback<String>(this) {
                    @Override
                    public void onSuccess(String result) {
                        toast("page created successfully");
                    }

                    @Override
                    public void onFailure(Throwable result) {
                        toast("failed to create page");
                    }
                });

            }

            //PICKER CANCELLED OR generated an error
            else if (resultCode == RESULT_CANCELED) {
                if (data.getExtras().getBoolean("USER_CANCELLED")) {

                    //USER CANCELLED OPERATION.
                    toast("user cancelled");

                } else if (data.getExtras().getBoolean("API_ERROR")) {
                    //API BASED ERROR. LOAD ERROR INFO
                    String apiErrorCode = data.getExtras().getString("API_ERROR_CODE");
                    String apiErrorString = data.getExtras().getString("API_ERROR_STRING");
                    URL apiErrorURL = (URL) data.getExtras().get("API_ERROR_URL");

                    //DO SOMETHING WITH ERROR INFO
                    toast("api error " + apiErrorString);
                } else {
                    //SYSTEM EXCEPTION. LOAD EXCEPTION
                    Exception e = (Exception) data.getExtras().get("SYSTEM_EXCEPTION");

                    //HANDLE EXCEPTION
                    toast("Exception " + e.getMessage());

                }
            }
        }
    }

    public void toast(String message) {
        Toast.makeText(MyActivity.this, message, Toast.LENGTH_SHORT).show();
    }

}
