using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TovutiUI.Models;

namespace TovutiUI.DBContexts
{
    public class DatabaseContext : IdentityDbContext<UserModel>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        //Add the the entities down here       

    }
}
