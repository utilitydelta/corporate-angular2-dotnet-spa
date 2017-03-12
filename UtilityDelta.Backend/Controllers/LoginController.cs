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
        private readonly IAntiforgery _Antiforgery;
        private readonly IHttpContextAccessor _HttpContextAccessor;
        private readonly SignInManager<User> _SignInManager;
        private readonly IUserClaimsPrincipalFactory<User> _UserClaimsPrincipalFactory;
        private readonly UserManager<User> _UserManager;

        public LoginController(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IHttpContextAccessor http,
            IUserClaimsPrincipalFactory<User> claimsPrincipalFactory,
            IAntiforgery antiforgery)
        {
            _Antiforgery = antiforgery;
            _UserClaimsPrincipalFactory = claimsPrincipalFactory;
            _HttpContextAccessor = http;
            _UserManager = userManager;
            _SignInManager = signInManager;
        }

        /// <summary>
        ///     Try using username: "admin" with password "password"
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<SignInResult> Post([FromBody] LoginData data)
        {
            var result = await _SignInManager.PasswordSignInAsync(data.Username, data.Password, true, false);

            if (result.Succeeded)
            {
                //We must update the anti-forgery token as the token is bound to the logged in user
                //https://github.com/aspnet/Antiforgery/issues/93
                //Update the user so we know who to generate the token for
                var user = await _UserManager.FindByIdAsync(data.Username);
                _HttpContextAccessor.HttpContext.User = await _UserClaimsPrincipalFactory.CreateAsync(user);
                //Update the token based on the newly logged in user
                var tokens = _Antiforgery.GetAndStoreTokens(_HttpContextAccessor.HttpContext);
                //Make sure the client gets the updated token in the response cookie
                _HttpContextAccessor.HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken);
            }

            return result;
        }

        public class LoginData
        {
            public string Password { get; set; }
            public string Username { get; set; }
        }
    }
}