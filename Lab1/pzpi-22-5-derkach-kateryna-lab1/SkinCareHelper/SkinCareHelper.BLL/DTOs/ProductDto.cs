using Microsoft.AspNetCore.Http;
using SkinCareHelper.BLL.DTOs.Enums;

namespace SkinCareHelper.BLL.DTOs
{
    public class ProductDto
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; } = null!;

        public IFormFile? Photo { get; set; } 

        public PhotoDto? ProductPhoto { get; set; }

        public string? PhotoId { get; set; } 

        public string ProductDescription { get; set; } = null!;

        public ProductTypeDto? ProductType { get; set; } 

        public SkinTypeDto SkinType { get; set; } 

        public SkinIssueDto SkinIssue { get; set; }

        public string Brand { get; set; } = null!;

        public List<RoutineProductDto> RoutineProducts { get; set; } = new List<RoutineProductDto>();

        public List<BanDto> Bans { get; set; } = new List<BanDto>();
    }
}
