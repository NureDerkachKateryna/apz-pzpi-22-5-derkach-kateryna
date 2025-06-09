using SkinCareHelper.BLL.DTOs.Enums;
using SkinCareHelper.DAL.Entities.Enums;

namespace SkinCareHelper.ViewModels.Products
{
    public class UpdateUserViewModel 
    {
        public string Id { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string DisplayName { get; set; } = null!;

        public string? Role { get; set; } 

        public SkinTypeDto SkinType { get; set; }

        public SkinIssueDto SkinIssue { get; set; }
    }
}
