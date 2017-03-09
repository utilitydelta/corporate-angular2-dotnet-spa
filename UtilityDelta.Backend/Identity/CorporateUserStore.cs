using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace UtilityDelta.Backend.Identity
{
    public class CorporateUserStore : IUserStore<User>, IUserPasswordStore<User>
    {
        //TODO: Replace this with a proper database or call to 3rd party system
        private static readonly User Admin = new User
        {
            Username = "admin",
            PasswordHash = "AQAAAAEAACcQAAAAEKbGOP6gyiR+tQVSnAw4Ul2AA+XHvS376cJcyuLfMv7tuoNGFiQFP8RNvK0oIOiMgg=="
        };

        public Task<IdentityResult> CreateAsync(User user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> DeleteAsync(User user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
        }

        /// <summary>
        ///     Used to find currently logged in user's details
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<User> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            return await Task.Run(() => Admin);
        }

        /// <summary>
        ///     Used when logging in with username
        /// </summary>
        /// <param name="normalizedUserName"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<User> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            return await Task.Run(() => Admin);
        }

        public Task<string> GetNormalizedUserNameAsync(User user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        ///     Used to check password is correct when logging in
        /// </summary>
        /// <param name="user"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<string> GetPasswordHashAsync(User user, CancellationToken cancellationToken)
        {
            //this is the hash for the string: "password"
            return await Task.Run(() => Admin.PasswordHash);
        }

        /// <summary>
        ///     Used after successfull login with username and password to get 'user id'
        /// </summary>
        /// <param name="user"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<string> GetUserIdAsync(User user, CancellationToken cancellationToken)
        {
            return await Task.Run(() => Admin.Username);
        }

        /// <summary>
        ///     Used after login to get username for the logged in user
        /// </summary>
        /// <param name="user"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<string> GetUserNameAsync(User user, CancellationToken cancellationToken)
        {
            return await Task.Run(() => Admin.Username);
        }

        public Task<bool> HasPasswordAsync(User user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetNormalizedUserNameAsync(User user, string normalizedName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetPasswordHashAsync(User user, string passwordHash, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetUserNameAsync(User user, string userName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> UpdateAsync(User user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}