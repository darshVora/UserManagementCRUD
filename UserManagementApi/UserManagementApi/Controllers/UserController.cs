using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserManagementApi.Core.Entities;
using UserManagementApi.Core.IServices;

namespace UserManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        public IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            var added = await _userService.AddUser(user);

            if (added)
            {
                return Ok(new { Message = "User added successfully" });
            }

            return BadRequest(new { Message = "User can't be added" });
        }

        [HttpPost("DeleteUser/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var error = await _userService.DeleteUser(userId);

            if (string.IsNullOrEmpty(error))
            {
                return Ok(new { Message = "User deleted successfully" });
            }
            else
            {
                return BadRequest(new { Message = error });
            }
        }

        [HttpPost("EditUser")]
        public async Task<IActionResult> EditUser([FromBody] User user)
        {
            var result = await _userService.EditUser(user);

            if (result)
            {
                return Ok(new { Message = "User edited successfully" });
            }

            return BadRequest(new { Message = "User can't be edited" });
        }

        [HttpGet("GetUser/{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            return Ok(await _userService.GetUser(userId));
        }

        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _userService.GetUsers());
        }
    }
}