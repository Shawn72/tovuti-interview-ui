using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace TovutiUI.Models
{
    public class RoleModel
    {
        public string Id { get; set; }
        public string RoleId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string RoleName { get; set; }
        public string UserId { get; set; }

        public List<SelectListItem> List_Roles = new List<SelectListItem>();
    }
}
