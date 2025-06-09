using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SkinCareHelper.BLL.Abstractions;
using SkinCareHelper.BLL.DTOs;
using SkinCareHelper.DAL.Entities;
using SkinCareHelper.DAL.Entities.Enums;
using SkinCareHelper.ViewModels.Products;

namespace SkinCareHelper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        private readonly IMapper _mapper;

        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserService userService, IMapper mapper, ILogger<UsersController> logger)
        {
            _userService = userService;
            _mapper = mapper;
            _logger = logger;
        }

        [Authorize]
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string userId)
        {
            try
            {
                await this._userService.DeleteUserAsync(userId);

                return NoContent();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                List<UserDto> usersDtos = await this._userService.GetAllUsersAsync();

                List<UserViewModel> users = new List<UserViewModel>();

                this._mapper.Map(usersDtos, users);

                foreach (UserViewModel user in users)
                {
                    user.Role = await this._userService.GetUserRoleAsync(user.Id);
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("Dermatologists")]
        public async Task<IActionResult> GetDermatologists()
        {
            try
            {
                List<UserDto> usersDtos = await this._userService.GetAllUsersAsync();

                List<UserViewModel> users = new List<UserViewModel>();

                this._mapper.Map(usersDtos, users);

                foreach (UserViewModel user in users)
                {
                    user.Role = await this._userService.GetUserRoleAsync(user.Id);
                }

                return Ok(users.Where(u => u.Role == Roles.Dermatologist));
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("Dermatologist/{dermatologistId}")]
        public async Task<IActionResult> GetUsersByDermatologist(string dermatologistId)
        {
            try
            {
                List<UserDto> usersDtos = await this._userService.GetAllUsersAsync();

                List<UserViewModel> users = new List<UserViewModel>();

                this._mapper.Map(usersDtos, users);

                foreach (UserViewModel user in users)
                {
                    user.Role = await this._userService.GetUserRoleAsync(user.Id);
                }

                var usersByDermatologist = users.Where(u => u.DermatologistId == dermatologistId);

                return Ok(usersByDermatologist);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("GetUser/{userId}")]
        public async Task<IActionResult> GetUser([FromRoute] string userId)
        {
            try
            {
                UserDto userDto = await this._userService.GetUserByIdAsync(userId);
                UserViewModel user = new UserViewModel();

                user.Role = await this._userService.GetUserRoleAsync(userId);

                this._mapper.Map(userDto, user);

                return Ok(user);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> EditUser([FromBody] UpdateUserViewModel updateUserViewModel)
        {
            try
            {
                UserDto user = new UserDto();

                this._mapper.Map(updateUserViewModel, user);

                user.Id = updateUserViewModel.Id;

                await this._userService.UpdateUserAsync(user);

                return NoContent();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("EditUserRole/{userId}")]
        public async Task<IActionResult> EditUserRole(
            [FromRoute]
            string userId,
            [FromBody]
            UpdateUserRoleViewModel updateUserRoleViewModel)
        {
            try
            {
                await this._userService.UpdateUserRoleAsync(userId, updateUserRoleViewModel.Role);

                return NoContent();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("MakeAppointment/{userId}/{dermatologistId}")]
        public async Task<IActionResult> MakeAppointment([FromRoute] string userId, string dermatologistId)
        {
            try
            {
                await _userService.MakeAppointmentAsync(userId, dermatologistId);

                return Ok();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);

                return BadRequest(ex.Message);
            }
        }
    }
}
