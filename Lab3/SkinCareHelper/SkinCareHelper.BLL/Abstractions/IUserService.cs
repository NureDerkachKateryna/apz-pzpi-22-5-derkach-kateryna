using SkinCareHelper.BLL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkinCareHelper.BLL.Abstractions
{
    public interface IUserService
    {
        Task AddUserAsync(UserDto userDto);

        Task UpdateUserAsync(UserDto userDto);

        Task UpdateUserRoleAsync(string userId, string role);

        Task<UserDto> GetUserByIdAsync(string userId);

        Task<List<UserDto>> GetAllUsersAsync();

        Task DeleteUserAsync(string userId);

        Task<UserDto> GetUserByEmailAsync(string email);

        Task MakeAppointmentAsync(string userId, string dermatologistId);

        Task<string> GetUserRoleAsync(string userId);
    }
}
