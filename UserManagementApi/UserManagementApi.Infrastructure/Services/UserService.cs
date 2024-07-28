using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagementApi.Core.Entities;
using UserManagementApi.Core.IRepository;
using UserManagementApi.Core.IServices;

namespace UserManagementApi.Infrastructure.Services
{
    public class UserService : IUserService
    {
        public IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> AddUser(User user)
        {
            return await _userRepository.AddUser(user);
        }

        public async Task<string> DeleteUser(int userId)
        {
            var user = await _userRepository.GetUser(userId);

            if (user == null)
            {
                return "User not found";
            }
            
            await _userRepository.DeleteUser(user);

            return null;
        }

        public async Task<bool> EditUser(User user)
        {
            return await _userRepository.EditUser(user);
        }

        public async Task<User> GetUser(int userId)
        {
            return await _userRepository.GetUser(userId);
        }

        public async Task<List<User>> GetUsers()
        {
            return await _userRepository.GetUsers();
        }
    }
}
