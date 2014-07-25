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
using System.Collections;

namespace OneNotePhoneApp
{
    public partial class MainPage : PhoneApplicationPage
    {
        private string _accessToken;

        private const string _pagesEndPoint = "https://www.onenote.com/api/v1.0/pages";
        private const string _notebooksEndPoint = "https://www.onenote.com/api/beta/Notebooks";
        private const string _notebookSectionsEndPoint = "https://www.onenote.com/api/beta/Notebooks/{0}/Sections";

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
                if (e.Status == Microsoft.Live.LiveConnectSessionStatus.Connected)
                {
                    _accessToken = e.Session.AccessToken;

                    infoTextBlock.Text = "Authentication successful";

                    getNotebooksButton.IsEnabled = true;
                }
                else
                {
                    infoTextBlock.Text = "Authentication failed";
                }
        }

        private async void getNotebooksButton_Click(object sender, RoutedEventArgs e)
        {
            await GetNotebooks();
        }

        private async System.Threading.Tasks.Task GetNotebooks()
        {
            infoTextBlock.Text = "Sending Request...";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _accessToken);
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            var getNotebooksRequest = new HttpRequestMessage(HttpMethod.Get, _notebooksEndPoint);

            var response = await client.SendAsync(getNotebooksRequest);

            string payload = await response.Content.ReadAsStringAsync();

            if (response.StatusCode == HttpStatusCode.OK)
            {
                var notebooksContainer = JsonConvert.DeserializeObject<NotebooksResponse.RootObject>(payload);

                noteBooksListBox.ItemsSource = notebooksContainer.Notebooks;

                infoTextBlock.Text = "";

            }
            else
            {
                infoTextBlock.Text = response.StatusCode + " " + payload;
            }
        }

        private async void noteBooksListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var selectedNotebook = (NotebooksResponse.Notebook)e.AddedItems[0];

            await GetSectionsInNotebook(selectedNotebook);
        }

        private async System.Threading.Tasks.Task GetSectionsInNotebook(NotebooksResponse.Notebook selectedNotebook)
        {
            infoTextBlock.Text = "Sending Request...";
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _accessToken);
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            var getNotebookSectionsRequest = new HttpRequestMessage(HttpMethod.Get, string.Format(_notebookSectionsEndPoint, selectedNotebook.id));

            var response = await client.SendAsync(getNotebookSectionsRequest);

            string payload = await response.Content.ReadAsStringAsync();

            if (response.StatusCode == HttpStatusCode.OK)
            {
                var sectionsContainer = JsonConvert.DeserializeObject<NotebookSectionsResponse.RootObject>(payload);

                sectionsListBox.ItemsSource = sectionsContainer.Sections;

                infoTextBlock.Text = "";

            }
            else
            {
                infoTextBlock.Text = response.StatusCode + " " + payload;
            }
        }

        private void sectionsListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var selectedSection = (NotebookSectionsResponse.Section)e.AddedItems[0];

            infoTextBlock.Text = "Selected Section: " + selectedSection.ToString();

        }


    }
}

