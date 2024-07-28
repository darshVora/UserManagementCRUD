using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagementApi.Core.Entities;

namespace UserManagementApi.Core.IRepository
{
    public interface IUserRepository
    {
        Task<bool> AddUser(User user);

        Task<bool> EditUser(User user);

        Task<List<User>> GetUsers();

        Task<User> GetUser(int userId);

        Task<bool> DeleteUser(User user);
    }
}
