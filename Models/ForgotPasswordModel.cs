using System.ComponentModel.DataAnnotations;

namespace TovutiUI.Models
{
    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
