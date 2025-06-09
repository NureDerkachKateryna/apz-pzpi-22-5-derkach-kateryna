using Microsoft.AspNetCore.Identity;
using SkinCareHelper.DAL.Entities.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkinCareHelper.DAL.Entities
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; } = null!;

        public SkinType? SkinType { get; set; }

        public SkinIssue? SkinIssue { get; set; } 

        public List<SkincareRoutine> SkincareRoutines { get; set; } = new List<SkincareRoutine>();

        public List<Ban> Bans { get; set; } = new List<Ban>();
        
        public List<User> Users { get; set; } = new List<User>();

        public string? DermatologistId { get; set; }

        public User? Dermatologist { get; set; }
    }
}
