using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(OneNoteWebApp.Startup))]
namespace OneNoteWebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
