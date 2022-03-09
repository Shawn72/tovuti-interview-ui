using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TovutiUI.DBContexts;
using TovutiUI.Entities;

namespace TovutiUI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IConfiguration _configuration;

        public static string Baseurl;

        private IWebHostEnvironment Environment;
        private DatabaseContext Context { get; }

        private readonly IHttpContextAccessor _httpContextAccessor;
        private ISession _session => _httpContextAccessor.HttpContext.Session;

        public string userI;

        public string MySQLConx;

        MySqlConnection con = (dynamic)null;

        public const string UserRole = "URole";

        public HomeController(IConfiguration config, DatabaseContext _context, IWebHostEnvironment _environment, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = config;
            Context = _context;
            Baseurl = _configuration["StaticStrings:BaseUrl"];
            Environment = _environment;
            _httpContextAccessor = httpContextAccessor;
            userI = _session.GetString("UserId");
            MySQLConx = _configuration.GetConnectionString("ConStr");
        }


        public IActionResult Index() {
            if (userI == null)
            {
                return RedirectToAction("Login", "Account");
            }
            if (userI != null)
            {
                ViewBag.Name = userI;
                GetMyUserRole();
            }
            return View();
        }
        public void CheckSessionID()
        {
            ViewBag.Name = userI;
            if (string.IsNullOrWhiteSpace(userI))
            {
                RedirectToAction("Login", "Account");
            }
            if (userI != null)
            {
                GetMyUserRole();
            }
        }
        public void GetMyUserRole()
        {
            try
            {
                var userID = (dynamic)null;
                using (con = new MySqlConnection(MySQLConx))
                {
                    string getRoleId = "SELECT u.Id, u.email, r.RoleId, o.Name FROM aspnetusers u," +
                        "aspnetuserroles r, aspnetroles o WHERE r.RoleId = o.Id AND r.UserId=u.Id AND  u.Email = @userEmail";

                    //check if user exists first
                    con.Open();
                    MySqlCommand commandXt = new MySqlCommand(getRoleId, con);

                    // use parametarized queries to prevent sql injection
                    commandXt.Parameters.AddWithValue("@userEmail", userI);

                    MySqlDataReader rd = commandXt.ExecuteReader();
                    if (rd.HasRows)
                    {
                        while (rd.Read())
                        {
                            userID = rd["Id"];
                            _session.SetString(UserRole, rd["Name"] as string);
                        }
                        TempData["userRole"] = _session.GetString("URole");
                        ViewBag.userRole = TempData["userRole"];
                    }
                    else { }
                }
            }
            catch (MySqlException ex)
            {
            }
            finally
            {
                con.Close();
            }

        }

        public IActionResult RegisterCustomer() { return View(); }

        public async Task<JsonResult> InsertCustomerDetails(CustomerDetails customer)
        {
            try
            {
                var stCode = (dynamic)null;
                var res = (dynamic)null;
                var json = JsonConvert.SerializeObject(customer);

                var stringContent = new StringContent(json, Encoding.UTF8, "application/json"); ;
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(Baseurl);
                var response = await client.PostAsync("/api/Customers/RegisterCustomer",  stringContent);

                stCode = (int)response.StatusCode;

                if (stCode == 200)
                {
                    res = "success";
                    Json(res);
                }
                else //500, 404, anything other than 200, switch default
                {
                    res = "error";
                    Json(res);
                }
                return Json(res);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
