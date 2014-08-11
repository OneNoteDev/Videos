using Microsoft.Live;
using Newtonsoft.Json;
using OneNoteWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace OneNoteWebApp.Controllers
{
    public class OneNoteController : Controller
    {
        private const string _pagesEndPoint = "https://www.onenote.com/api/v1.0/pages";
        private const string _clientId = "[Client Id Goes Here]";
        private const string _clientSecret = "[Client Secret Goes Here]";
        private const string _clientRedirect = "[Client Redirect Url Goes Here]";
        private string[] scopes = new string[] { "wl.signin", "wl.offline_access", "Office.OneNote_Create" };

        private LiveAuthClient _liveAuthClient = new LiveAuthClient(_clientId, _clientSecret, _clientRedirect);

        //
        // GET: /OneNote/
        public async Task<ActionResult> CreateNewPage()
        {
            LiveLoginResult loginStatus = await _liveAuthClient.InitializeWebSessionAsync(this.HttpContext);

            this.Response.Redirect(_liveAuthClient.GetLoginUrl(scopes));

            return null;
        }

        public async Task<ActionResult> Redirect(string code)
        {
            if (code != null)
            {
                LiveLoginResult loginStatus = await _liveAuthClient.ExchangeAuthCodeAsync(this.HttpContext);

                OneNoteCreateViewModel model = await Create(loginStatus.Session);

                return View("NewOneNotePage", model);
            }
            else
                RedirectToAction("Index", "Home");

            return null;
        }

        private async Task<OneNoteCreateViewModel> Create(LiveConnectSession liveConnectSession)
        {
            string sampleHtml = @"<html>" +
                          "<head>" +
                              "<title>A Sample Page from ASP.NET MVC</title>" +
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
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", liveConnectSession.AccessToken);
            httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await httpClient.SendAsync(createPageMessage);

            return await ProcessResponse(response);

        }

        private async Task<OneNoteCreateViewModel> ProcessResponse(HttpResponseMessage response)
        {
            OneNoteCreateViewModel model = new OneNoteCreateViewModel();

            if (response.StatusCode == System.Net.HttpStatusCode.Created)
            {
                model.ResponseMessage = "New page created successfully - code " + response.StatusCode.ToString();

                string payload = await response.Content.ReadAsStringAsync();
                model.ResponseMessage += "<br>" + payload;

                dynamic responseObject = JsonConvert.DeserializeObject(payload);

                model.NewPageLink = responseObject.links.oneNoteWebUrl.href;
            }
            else
            {
                model.ResponseMessage = "New page creation failed - code " + response.StatusCode.ToString();
            }

            return model;
        }
	}
}