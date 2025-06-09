using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SkinCareHelper.DAL.DbContexts;
using SkinCareHelper.DAL.Entities;
using SkinCareHelper.DAL.Entities.Enums;

namespace SkinCareHelper.DAL.Repositories
{
    public class Seed
    {
        public static async Task SeedData(DataContextEF context, UserManager<User> userManager)
        {
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole() { Id = "fab4fac1-c546-41de-aebc-a14da6895711", Name = Roles.Admin, ConcurrencyStamp = "1", NormalizedName = Roles.Admin.ToUpper() },
                new IdentityRole() { Id = "ee80df5e-b172-4943-b968-643b028f1b7d", Name = Roles.Customer, ConcurrencyStamp = "2", NormalizedName = Roles.Customer.ToUpper() },
                new IdentityRole() { Id = "3ee0553e-2725-4d38-a181-b32070ed7cf5", Name = Roles.Dermatologist, ConcurrencyStamp = "3", NormalizedName = Roles.Dermatologist.ToUpper() },
            };

            context.Roles.AddRange(roles);

            var users = new List<User>
            {
                new User
                {
                    Id = "a2d80de6-1f21-48e3-8cdd-af2bb7638b7a",
                    DisplayName = "Jung Jungkook",
                    Email = "jungkook@test.com",
                    UserName = "jungkook"
                },
                new User
                {
                    Id = "bc2719a0-771d-4396-a892-356d4e077ed9",
                    DisplayName = "Park Gunwook",
                    Email = "gunwook@test.com",
                    UserName = "gunwook"
                },
                new User
                {
                    Id = "7afa95a9-0a9f-4531-8cf0-ee953ba2a492",
                    DisplayName = "Kim Taerae",
                    Email = "taerae@test.com",
                    UserName = "taerae",
                    SkinIssue = Entities.Enums.SkinIssue.comedones,
                    SkinType = Entities.Enums.SkinType.combination
                },
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

            List<IdentityUserRole<string>> identityUserRoles = new List<IdentityUserRole<string>>
            {
                new IdentityUserRole<string>
                {
                    UserId = "a2d80de6-1f21-48e3-8cdd-af2bb7638b7a",
                    RoleId = "fab4fac1-c546-41de-aebc-a14da6895711"
                },
                new IdentityUserRole<string>
                {
                    UserId = "bc2719a0-771d-4396-a892-356d4e077ed9",
                    RoleId = "3ee0553e-2725-4d38-a181-b32070ed7cf5"
                },
                new IdentityUserRole<string>
                {
                    UserId = "7afa95a9-0a9f-4531-8cf0-ee953ba2a492",
                    RoleId = "ee80df5e-b172-4943-b968-643b028f1b7d"
                },
            };

            context.UserRoles.AddRange(identityUserRoles);

            var products = new List<Product>
            {
                new Product
                {
                    ProductName = "TOCOBO - Bifida Biome Essence",
                    ProductDescription = "Bifida Biome Essence",
                    ProductType = ProductType.serum,
                    SkinType = SkinType.all,
                    SkinIssue = SkinIssue.all,
                    Brand = "TOCOBO"
                },
                new Product
                {
                    ProductName = "TOCOBO - Bio Watery Sun Cream",
                    ProductDescription = "Bio Watery Sun Cream",
                    ProductType = ProductType.sunscreen,
                    SkinType = SkinType.all,
                    SkinIssue = SkinIssue.all,
                    Brand = "TOCOBO"
                },
                new Product
                {
                    ProductName = "TOCOBO - Cica Calming Gel Cream",
                    ProductDescription = "Cica Calming Gel Cream",
                    ProductType = ProductType.moisturizer,
                    SkinType = SkinType.all,
                    SkinIssue = SkinIssue.all,
                    Brand = "TOCOBO"
                },
                new Product
                {
                    ProductName = "Heimish - All Clean Green Foam",
                    ProductDescription = "All Clean Green Foam",
                    ProductType = ProductType.cleanser,
                    SkinType = SkinType.all,
                    SkinIssue = SkinIssue.all,
                    Brand = "Heimish"
                },
                new Product
                {
                    ProductName = "Epilax - Silk Touch Enzyme Powder",
                    ProductDescription = "Silk Touch Enzyme Powder",
                    ProductType = ProductType.exfoliation,
                    SkinType = SkinType.all,
                    SkinIssue = SkinIssue.all,
                    Brand = "Epilax"
                },
                new Product
                {
                    ProductName = "Paula's Choice - Skin Perfecting - 2%",
                    ProductDescription = "Skin Perfecting - 2%",
                    ProductType = ProductType.acid,
                    SkinType = SkinType.all,
                    SkinIssue = SkinIssue.all,
                    Brand = "Paula's Choice"
                },
                new Product
                {
                    ProductName = "Paula's Choice - Clinical - 1% Retinol Treatment",
                    ProductDescription = "Clinical - 1% Retinol Treatment",
                    ProductType = ProductType.retinol,
                    SkinType = SkinType.all,
                    SkinIssue = SkinIssue.all,
                    Brand = "Paula's Choice"
                },
                new Product
                {
                    ProductName = "SKIN1004 - Madagascar Centella Light Cleansing Oil",
                    ProductDescription = "Madagascar Centella Light Cleansing Oil",
                    ProductType = ProductType.cleansing_oil,
                    SkinType = SkinType.all,
                    SkinIssue = SkinIssue.all,
                    Brand = "SKIN1004"
                },
                new Product
                {
                    ProductName = "Anua - Heartleaf 77% Soothing Toner",
                    ProductDescription = "Heartleaf 77% Soothing Toner",
                    ProductType = ProductType.toner,
                    SkinType = SkinType.all,
                    SkinIssue = SkinIssue.all,
                    Brand = "Anua"
                },
                new Product
                {
                    ProductName = "Beauty of Joseon - Revive Eye Serum - Ginseng + Retinal",
                    ProductDescription = "Revive Eye Serum - Ginseng + Retinal",
                    ProductType = ProductType.eye_cream,
                    SkinType = SkinType.all,
                    SkinIssue = SkinIssue.all,
                    Brand = "Beauty of Joseon"
                },
                new Product
                {
                    ProductName = "Dr. Althea - 345 Relief Cream",
                    ProductDescription = "345 Relief Cream",
                    ProductType = ProductType.moisturizer,
                    SkinType = SkinType.all,
                    SkinIssue = SkinIssue.all,
                    Brand = "Dr. Althea",
                    Bans = new List<Ban>
                    {
                        new Ban
                        {
                            UserId = "7afa95a9-0a9f-4531-8cf0-ee953ba2a492",
                        }
                    },
                },
            };

            context.Products.AddRange(products);

            await context.SaveChangesAsync();
        }
    }
}
