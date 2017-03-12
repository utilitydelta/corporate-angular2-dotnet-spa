using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UtilityDelta.Backend.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class CurrentUserController
    {
        private readonly IHttpContextAccessor m_httpContextAccessor;
        private readonly IAntiforgery m_antiforgery;

        public CurrentUserController(IHttpContextAccessor http, IAntiforgery antiforgery)
        {
            m_antiforgery = antiforgery;
            m_httpContextAccessor = http;
        }

        [HttpGet]
        public dynamic Get()
        {
            //Update the token based on the newly logged in user
            var tokens = m_antiforgery.GetAndStoreTokens(m_httpContextAccessor.HttpContext);

            //Make sure the client gets the updated token in the response cookie
            m_httpContextAccessor.HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken);

            return new
            {
                username = m_httpContextAccessor.HttpContext.User.Identity.Name
            };
        }
    }
}