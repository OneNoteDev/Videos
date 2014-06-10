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

namespace WindowsStoreApp
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        private static readonly string[] _scopes = new string[] { "wl.signin", "wl.offline_access", "Office.OneNote_Create" };
        private static readonly Uri _pagesEndPoint = new Uri("https://www.onenote.com/api/v1.0/pages");
        private LiveAuthClient _liveAuthClient = new LiveAuthClient();
        private LiveConnectClient _liveConnectClient;

        public MainPage()
        {
            this.InitializeComponent();
        }

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            this.LoadPage();
        }

        private async void LoadPage()
        {
            try
            {
                LiveLoginResult loginResult = await _liveAuthClient.InitializeAsync(_scopes);

                if (loginResult.Status == LiveConnectSessionStatus.Connected)
                {
                    responseTextBlock.Text = "initialized";

                    signInButton.IsEnabled = true;
                }
            }
            catch (Exception ex)
            {
                responseTextBlock.Text = ex.ToString();
            }
        }

        private async void signInButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                LiveLoginResult loginResult = await _liveAuthClient.LoginAsync(_scopes);

                if (loginResult.Status == LiveConnectSessionStatus.Connected)
                {
                    _liveConnectClient = new LiveConnectClient(loginResult.Session);

                    responseTextBlock.Text = "signed in";

                    createPageButton.IsEnabled = true;
                }
            }
            catch (LiveAuthException ex)
            {
                responseTextBlock.Text = ex.ToString();
            }
        }

        private async void createPageButton_Click(object sender, RoutedEventArgs e)
        {
            await this.CreateTestPage();
        }

        private async System.Threading.Tasks.Task CreateTestPage()
        {
            try
            {
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _liveConnectClient.Session.AccessToken);

                string sampleHtml = @"<html>" +
                                       "<head>" +
                                           "<title>A Sample Page</title>" +
                                           "<meta name=\"created\" content=\"" + DateTime.Now.ToString("o") + "\" />" + // Date in ISO8601 format with local time zone offset
                                       "</head>" +
                                       "<body>" +
                                           "<p>This is a page that just contains some simple <i>formatted</i> <b>text</b></p>" +
                                           "<p>Here is a <a href=\"http://www.microsoft.com\">link</a></p>" +
                                           "<p>Here is an image: <img src=\"http://i.microsoft.com/global/en-us/news/publishingimages/homepage/highlights/prod_xboxone_hl.jpg\" />" +
                                       "</body>" +
                                     "</html>";

                var createMessage = new HttpRequestMessage(HttpMethod.Post, _pagesEndPoint)
                {
                    Content = new StringContent(sampleHtml, System.Text.Encoding.UTF8, "text/html")
                };

                HttpResponseMessage response = await client.SendAsync(createMessage);

                responseTextBlock.Text = response.ToString();
                responseTextBlock.Text += await response.Content.ReadAsStringAsync();
            }
            catch (Exception ex)
            {
                responseTextBlock.Text = ex.ToString();
            }
        }
    }
}