using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using OneNotePhoneApp.Resources;
using System.Net.Http;
using Newtonsoft.Json;
using Microsoft.Phone.Tasks;

namespace OneNotePhoneApp
{
    public partial class MainPage : PhoneApplicationPage
    {
        private string _accessToken;
        private string _newPageURL;

        private const string _pagesEndPoint = "https://www.onenote.com/api/v1.0/pages";

        // Constructor
        public MainPage()
        {
            InitializeComponent();

            // Sample code to localize the ApplicationBar
            //BuildLocalizedApplicationBar();
        }

        private void signInButton_SessionChanged(object sender, Microsoft.Live.Controls.LiveConnectSessionChangedEventArgs e)
        {
            if (signInButton.IsEnabled)
            {
                if (e.Status == Microsoft.Live.LiveConnectSessionStatus.Connected)
                {
                    _accessToken = e.Session.AccessToken;

                    infoTextBlock.Text = "Authentication successful";
                }
                else
                {
                    infoTextBlock.Text = "Authentication failed";
                }
            }
        }

        private async void createPageButton_Click(object sender, RoutedEventArgs e)
        {
            infoTextBlock.Text = "sending request...";
            openPageInBrowserButton.Visibility = System.Windows.Visibility.Collapsed;

            string sampleHtml = @"<html>" +
                                       "<head>" +
                                           "<title>A Sample Windows Phone App Page</title>" +
                                           "<meta name=\"created\" content=\"" + DateTime.Now.ToString("o") + "\" />" + // Date in ISO8601 format with local time zone offset
                                       "</head>" +
                                       "<body>" +
                                           "<p>This is a page that just contains some simple <i>formatted</i> <b>text</b></p>" +
                                           "<p>Here is a <a href=\"http://www.microsoft.com\">link</a></p>" +
                                           "<p>Here is an image: <img src=\"http://i.microsoft.com/global/en-us/news/publishingimages/homepage/highlights/prod_xboxone_hl.jpg\" />" +
                                       "</body>" +
                                     "</html>";

            var createPageMessage = new HttpRequestMessage(HttpMethod.Post, _pagesEndPoint)
            {
                Content = new StringContent(sampleHtml, System.Text.Encoding.UTF8, "text/html")
            };

            HttpClient httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _accessToken);
            httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await httpClient.SendAsync(createPageMessage);

            await ProcessResponse(response);
        }

        private async System.Threading.Tasks.Task ProcessResponse(HttpResponseMessage response)
        {
            if (response.StatusCode == HttpStatusCode.Created)
            {
                string payload = await response.Content.ReadAsStringAsync();

                infoTextBlock.Text = "Page created successfully. Payload: " + payload;
                dynamic responseObject = JsonConvert.DeserializeObject(payload);

                _newPageURL = responseObject.links.oneNoteWebUrl.href;

                openPageInBrowserButton.Visibility = System.Windows.Visibility.Visible;
            }
            else
            {
                infoTextBlock.Text = "Page creation failed. Error " + response.StatusCode;
            }
        }

        private void openPageInBrowserButton_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrEmpty(_newPageURL))
            {
                WebBrowserTask webTask = new WebBrowserTask()
                {
                    Uri = new Uri(_newPageURL, UriKind.Absolute)
                };

                webTask.Show();
            }
        }

        // Sample code for building a localized ApplicationBar
        //private void BuildLocalizedApplicationBar()
        //{
        //    // Set the page's ApplicationBar to a new instance of ApplicationBar.
        //    ApplicationBar = new ApplicationBar();

        //    // Create a new button and set the text value to the localized string from AppResources.
        //    ApplicationBarIconButton appBarButton = new ApplicationBarIconButton(new Uri("/Assets/AppBar/appbar.add.rest.png", UriKind.Relative));
        //    appBarButton.Text = AppResources.AppBarButtonText;
        //    ApplicationBar.Buttons.Add(appBarButton);

        //    // Create a new menu item with the localized string from AppResources.
        //    ApplicationBarMenuItem appBarMenuItem = new ApplicationBarMenuItem(AppResources.AppBarMenuItemText);
        //    ApplicationBar.MenuItems.Add(appBarMenuItem);
        //}
    }
}