using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UtilityDelta.Backend.Identity;

namespace UtilityDelta.Backend.Controllers
{
    [Route("api/[controller]")]
    public class LogoffController
    {
        private readonly IAntiforgery m_antiforgery;
        private readonly IHttpContextAccessor m_httpContextAccessor;
        private readonly SignInManager<User> m_signInManager;

        public LogoffController(
            SignInManager<User> signInManager,
            IHttpContextAccessor http,
            IAntiforgery antiforgery)
        {
            m_antiforgery = antiforgery;
            m_httpContextAccessor = http;
            m_signInManager = signInManager;
        }

        [HttpPost]
        public async Task<string> Post()
        {
            await m_signInManager.SignOutAsync();

            //We must update the anti-forgery token as the token is bound to the logged in user
            //https://github.com/aspnet/Antiforgery/issues/93

            //Remove the user as we are logging off
            m_httpContextAccessor.HttpContext.User = null;

            //Now generate a new token
            var tokens = m_antiforgery.GetAndStoreTokens(m_httpContextAccessor.HttpContext);
            m_httpContextAccessor.HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken);

            return "Signed out!";
        }
    }
}