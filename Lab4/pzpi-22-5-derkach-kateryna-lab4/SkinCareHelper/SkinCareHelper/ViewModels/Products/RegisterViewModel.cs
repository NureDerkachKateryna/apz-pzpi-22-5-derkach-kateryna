using SkinCareHelper.BLL.DTOs.Enums;

namespace SkinCareHelper.ViewModels.Products
{
    public class RegisterViewModel
    {
        public string DisplayName { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public SkinIssueDto SkinIssue { get; set; }

        public SkinTypeDto SkinType { get; set; }

        public string Password { get; set; } = null!;
    }
}
