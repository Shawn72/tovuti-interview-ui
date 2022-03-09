using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using TovutiUI.DBContexts;
using TovutiUI.EmailService;
using TovutiUI.Models;

namespace TovutiUI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();

            services.AddControllersWithViews();

            string connectionString = Configuration.GetConnectionString("ConStr"); //for test, code first

            services.AddDbContext<DatabaseContext>(c => c.UseMySQL(connectionString));

            services.AddIdentity<UserModel, IdentityRole>(
            opt =>
            {
                opt.Password.RequiredLength = 5;
                opt.Password.RequireDigit = false;
                opt.Password.RequireUppercase = false;
                opt.User.RequireUniqueEmail = true;

            }).AddEntityFrameworkStores<DatabaseContext>().AddDefaultTokenProviders();
            services.Configure<DataProtectionTokenProviderOptions>(opt =>
             opt.TokenLifespan = TimeSpan.FromHours(2));

            // services.AddScoped<IUserClaimsPrincipalFactory<UserModel>, CustomFactoryClaim>();

            var emailConfig = Configuration.GetSection("EmailConfiguration").Get<EmailConfig>();

            services.AddSingleton(emailConfig);

            services.AddScoped<IEmailSender, EmailSender>();

            services.AddAutoMapper(typeof(Startup));

            services.AddCors(policy =>
            {
                policy.AddPolicy("CorsPolicy", opt => opt
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithExposedHeaders("X-Pagination"));
            });          

            services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = "/Account/Login";
                options.AccessDeniedPath = new PathString("/Account/AccessDenied");
            });

            services.AddAuthorization(options => {
                options.AddPolicy("readpolicy",
                    builder => builder.RequireRole("Admin, Novice"));
                options.AddPolicy("writepolicy",
                    builder => builder.RequireRole("Admin"));
            });

            services.AddDistributedMemoryCache();

            services.AddSession(options => {
                options.Cookie.Name = "_aspnetCoreSession";
                options.IdleTimeout = TimeSpan.FromMinutes(5);//You can set Time   
                options.Cookie.IsEssential = true;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {            
            app.UseExceptionHandler("/Error");

            app.UseHsts();

            app.UseDeveloperExceptionPage();

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseAuthentication();

            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
