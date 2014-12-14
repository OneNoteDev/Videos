using Microsoft.Live;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234238

namespace App613
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class OneNotePage : Page
    {
        private static readonly string[] _scopes = new string[] { "wl.signin", "wl.offline_access", "Office.OneNote_Create" };
        private static readonly Uri _pagesEndPoint = new Uri("https://www.onenote.com/api/v1.0/pages");
        private LiveAuthClient _liveAuthClient = new LiveAuthClient();
        private LiveConnectClient _liveConnectClient;

        public OneNotePage()
        {
            this.InitializeComponent();
        }

        protected async override void OnNavigatedTo(NavigationEventArgs e)
        {
            LiveLoginResult loginResult = await _liveAuthClient.InitializeAsync(_scopes);
            signInButton.IsEnabled = true;
        }

        private async void signInButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                LiveLoginResult loginResult = await _liveAuthClient.LoginAsync(_scopes);

                if (loginResult.Status == LiveConnectSessionStatus.Connected)
                {
                    _liveConnectClient = new LiveConnectClient(loginResult.Session);

                    createPageButton.IsEnabled = true;
                }
            }
            catch { }
        }

        private async void createPageButton_Click(object sender, RoutedEventArgs e)
        {
            infoTextBlock.Text = "Sending Request...";

            string sampleHtml = @"<html>" +
                                       "<head>" +
                                           "<title>A Sample Universal App Page</title>" +
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
            httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _liveConnectClient.Session.AccessToken);

            HttpResponseMessage response = await httpClient.SendAsync(createPageMessage);

            await ProcessResponse(response);
        }

        private async System.Threading.Tasks.Task ProcessResponse(HttpResponseMessage response)
        {
            if (response.StatusCode == System.Net.HttpStatusCode.Created)
            {
                string payload = await response.Content.ReadAsStringAsync();

                infoTextBlock.Text = "Page created successfully. Payload: " + payload;
            }
            else
            {
                infoTextBlock.Text = "Page creation failed. Payload: " + response.StatusCode;
            }
        }
    }
}
