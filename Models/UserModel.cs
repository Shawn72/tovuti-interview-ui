using Microsoft.AspNetCore.Identity;

namespace TovutiUI.Models
{
    public class UserModel : IdentityUser
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
    }
}
