using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SkinCareHelper.BLL.Abstractions;
using SkinCareHelper.BLL.DTOs;
using SkinCareHelper.BLL.Validators;
using SkinCareHelper.DAL.Abstractions;
using SkinCareHelper.DAL.Entities;
using SkinCareHelper.DAL.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkinCareHelper.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        private readonly IBanRepository _banRepository;

        private readonly ILogger<UserService> _logger;

        private readonly IMapper _mapper;

        private readonly IValidator<UserDto> _validator;

        private readonly UserManager<User> _userManager;

        public UserService(IUserRepository userRepository, IBanRepository banRepository, ILogger<UserService> logger, IMapper mapper, UserManager<User> userManager)
        {            
            _userRepository = userRepository;
            _banRepository = banRepository;
            _logger = logger;
            _mapper = mapper;
            _validator = new UserValidator();
            _userManager = userManager;
        }
        public async Task AddUserAsync(UserDto userDto)
        {
            try
            {
                if(!this._validator.Validate(userDto).IsValid)
                {
                    throw new ArgumentException("User is not valid");
                }

                User user = new User();

                this._mapper.Map(userDto, user);

                await this._userRepository.AddUserAsync(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                throw;
            }
        }

        public async Task MakeAppointmentAsync(string userId, string dermatologistId)
        {
            try
            {
                User user = await this._userRepository.GetUserAsync(x => x.Id.Equals(userId));
                user.DermatologistId = dermatologistId;

                await _userRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                throw;
            }
        }

        public async Task DeleteUserAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentNullException("User id must not be null or empty");
            }

            try
            {
                await this._userRepository.DeleteUserAsync(userId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                throw;
            }
        }

        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            try
            {
                List<User> users = new List<User>();

                users = await this._userRepository.GetAllUsersAsync(x => !string.IsNullOrEmpty(x.Id));

                List<UserDto> userDtos = new List<UserDto>();

                this._mapper.Map(users, userDtos);

                return userDtos;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                throw;
            }
        }

        public async Task<UserDto> GetUserByEmailAsync(string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    throw new ArgumentNullException("Email must not be null");
                }

                User user = new User();

                user = (await this._userRepository.GetAllUsersAsync(x => email.Equals(x.Email))).First();

                UserDto userDto = new UserDto();

                this._mapper.Map(user, userDto);

                return userDto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                throw;
            }            
        }

        public async Task<UserDto> GetUserByIdAsync(string userId)
        {
            try
            {
                if (string.IsNullOrEmpty(userId))
                {
                    throw new ArgumentNullException("User id must not be null or empty");
                }

                User user = new User();

                user = await this._userRepository.GetUserAsync(x => x.Id.Equals(userId));

                UserDto userDto = new UserDto();

                this._mapper.Map(user, userDto);

                return userDto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                throw;
            }
        }

        public async Task UpdateUserAsync(UserDto userDto)
        {
            try
            {
                if (!this._validator.Validate(userDto).IsValid || string.IsNullOrEmpty(userDto.Id))
                {
                    throw new ArgumentNullException("User is not valid");
                }

                var existingUser = await this._userRepository.GetUserAsync(u => u.Id.Equals(userDto.Id));

                existingUser.DisplayName = userDto.DisplayName;
                existingUser.Email = userDto.Email;
                existingUser.UserName = userDto.UserName;
                existingUser.SkinType = (SkinType)userDto.SkinType;
                existingUser.SkinIssue = (SkinIssue)userDto.SkinIssue;

                await this._userRepository.UpdateUserAsync(existingUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                throw;
            }
        }

        public async Task UpdateUserRoleAsync(string userId, string role)
        {
            try
            {
                if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(role))
                {
                    throw new ArgumentNullException("User is not valid");
                }

                var existingUser = await this._userRepository.GetUserAsync(u => u.Id.Equals(userId));


                string existingUserRole = await this.GetUserRoleAsync(existingUser.Id);

                await _userManager.RemoveFromRoleAsync(existingUser, existingUserRole);

                await _userManager.AddToRoleAsync(existingUser, role);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                throw;
            }
        }

        public async Task<string> GetUserRoleAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User id must not be null or empty");
            }

            try
            {
                User user = await _userRepository
                    .GetUserAsync(u => u.Id.Equals(userId))
                    ?? throw new InvalidOperationException("User is not found");

                string role = (await this._userManager.GetRolesAsync(user)).FirstOrDefault()
                    ?? throw new InvalidOperationException("UserRole is not found");

                return role;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
