using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagementApi.Core.Entities;

namespace UserManagementApi.Core.IServices
{
    public interface IUserService
    {
        Task<bool> AddUser(User user);

        Task<bool> EditUser(User user);

        Task<List<User>> GetUsers();

        Task<User> GetUser(int userId);

        Task<string> DeleteUser(int userId);
    }
}
