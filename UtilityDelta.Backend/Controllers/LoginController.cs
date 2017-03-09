using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UtilityDelta.Backend.Identity;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace UtilityDelta.Backend.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class LoginController
    {
        private readonly IAntiforgery m_antiforgery;
        private readonly IHttpContextAccessor m_httpContextAccessor;
        private readonly SignInManager<User> m_signInManager;
        private readonly IUserClaimsPrincipalFactory<User> m_userClaimsPrincipalFactory;
        private readonly UserManager<User> m_userManager;

        public LoginController(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IHttpContextAccessor http,
            IUserClaimsPrincipalFactory<User> claimsPrincipalFactory,
            IAntiforgery antiforgery)
        {
            m_antiforgery = antiforgery;
            m_userClaimsPrincipalFactory = claimsPrincipalFactory;
            m_httpContextAccessor = http;
            m_userManager = userManager;
            m_signInManager = signInManager;
        }

        /// <summary>
        ///     Try using username: "admin" with password "password"
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpGet]
        [ValidateAntiForgeryToken]
        public async Task<SignInResult> Get(string username, string password)
        {
            var result = await m_signInManager.PasswordSignInAsync(username, password, true, false);

            if (result.Succeeded)
            {
                //We must update the anti-forgery token as the token is bound to the logged in user
                //https://github.com/aspnet/Antiforgery/issues/93

                //Update the user so we know who to generate the token for
                var user = await m_userManager.FindByIdAsync(username);
                m_httpContextAccessor.HttpContext.User = await m_userClaimsPrincipalFactory.CreateAsync(user);

                //Update the token based on the newly logged in user
                var tokens = m_antiforgery.GetAndStoreTokens(m_httpContextAccessor.HttpContext);

                //Make sure the client gets the updated token in the response cookie
                m_httpContextAccessor.HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken);
            }

            return result;
        }
    }
}