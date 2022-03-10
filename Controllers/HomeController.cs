using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TovutiUI.DBContexts;
using TovutiUI.Entities;
using TovutiUI.Models;

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

       // public static string MysqlConStr;

        MySqlTransaction mysqlTrx = (dynamic)null;

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

        //navigate to customer register page
        public IActionResult RegisterCustomer() {
            CheckSessionID();
            return View();
        }

        //insert new customer in the DB
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
   
        //view all customers list in the DB
        public IActionResult CustomersList()
        {
            CheckSessionID();
            try
            {
                WebClient wc = new WebClient();
                List<CustomerDetails> cstDs = null;
                string json = wc.DownloadString(Baseurl + "api/Customers");
                cstDs = JsonConvert.DeserializeObject<List<CustomerDetails>>(json);
                var allitems = (from a in cstDs select a).ToList();
                return View(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }

        //redirect to add account page
        public IActionResult EnterCustomerAccounts()
        {
            CheckSessionID();
            DropdownListModel listModel = PopulateCustomerDDL();
            return View(listModel);
        }

        //list customers in a dropdown list
        public DropdownListModel PopulateCustomerDDL()
        {
            try
            {
                WebClient wc = new WebClient();
                List<CustomerDetails> customerLst = new List<CustomerDetails>();
                DropdownListModel cstDdl = new DropdownListModel();

                //customers list
                string jsonRes = wc.DownloadString(Baseurl + "api/Customers");
                customerLst = JsonConvert.DeserializeObject<List<CustomerDetails>>(jsonRes);

                var customerListItems = customerLst.Select(c => new SelectListItem
                {
                    Value = c.id.ToString(),
                    Text = c.firstname + " " + c.lastname.ToString()
                });

                var cstdropdownLst = new SelectList(customerListItems, "Value", "Text");

                cstDdl.List_Customers = cstdropdownLst.ToList();

                return cstDdl;
            }
            catch (Exception)
            {
                throw;
            }
        }        

        //insert new customer account in the DB
        public async Task<JsonResult> InsertCustomerAccount(CustomerAccounts account)
        {
            try
            {
                var stCode = (dynamic)null;
                var res = (dynamic)null;

                //by default the newly created account is assumed to be active
                account.active = true;

                var json = JsonConvert.SerializeObject(account);
                var stringContent = new StringContent(json, Encoding.UTF8, "application/json"); ;
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(Baseurl);
                var response = await client.PostAsync("/api/CustomerAccounts/createcstaccount", stringContent);

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

        //view customer accounts filtered by Id
        public IActionResult GetCustomerAccounts(string id)
        {
            CheckSessionID();
            try
            {
                WebClient wc = new WebClient();
                List<CustomerAccounts> cstAccs = null;
                string json = wc.DownloadString(Baseurl + "api/CustomerAccounts/" +Convert.ToInt64(id) );
                cstAccs = JsonConvert.DeserializeObject<List<CustomerAccounts>>(json);
                var allitems = (from a in cstAccs select a).ToList();
                return View(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }

        //redirect to make sale page
        public IActionResult EnterSale()
        {
            CheckSessionID();
            DropdownListModel listModel = PopulateCustomerDDL();
            return View(listModel);
        }

        //insert sale transaction
        public async Task<JsonResult> InsertSaleTransaction(SalesTransactions sale)
        {
            try
            {
                var stCode = (dynamic)null;
                var res = (dynamic)null;
                var json = JsonConvert.SerializeObject(sale);

                var stringContent = new StringContent(json, Encoding.UTF8, "application/json"); ;
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(Baseurl);
                var response = await client.PostAsync("/api/Sale/MakeSale", stringContent);

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

        //view sales transactions list
        public IActionResult GetSalesList()
        {
            CheckSessionID();
            try
            {
                WebClient wc = new WebClient();
                List<SalesTransactions> sales = null;
                string json = wc.DownloadString(Baseurl + "api/Sale" );
                sales = JsonConvert.DeserializeObject<List<SalesTransactions>>(json);
                var allitems = (from a in sales select a).ToList();
                return View(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }

        //go to generate invoice page        
         public IActionResult CreateInvoicePage(string id)
         {
            CheckSessionID();
            try
            {
                WebClient wc = new WebClient();
                SalesTransactions sale = null;
                string json = wc.DownloadString(Baseurl + "api/Sale/" + Convert.ToInt64(id));             
                sale = JsonConvert.DeserializeObject<SalesTransactions>(json);
                return View(sale);
            }
            catch (Exception ex)
            {
                throw;
            }
         }

        //insert generated invoice to dB  
        public async Task<JsonResult> InsertSaleInvoice(Invoices invoice)
        {
            try
            {
                var stCode = (dynamic)null;
                var res = (dynamic)null;
                var json = JsonConvert.SerializeObject(invoice);
                invoice.fully_paid = false;

                var stringContent = new StringContent(json, Encoding.UTF8, "application/json"); ;
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(Baseurl);
                var response = await client.PostAsync("/api/SaleInvoices/createinvoice", stringContent);

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

        //view invoices list
        public IActionResult GetInvoicesList()
        {
            CheckSessionID();
            try
            {
                WebClient wc = new WebClient();
                List<Invoices> sales = null;
                string json = wc.DownloadString(Baseurl + "api/SaleInvoices");
                sales = JsonConvert.DeserializeObject<List<Invoices>>(json);
                var allitems = (from a in sales select a).ToList();
                return View(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }
        //redirect to payment page with details
        public IActionResult PaymentPage(string id)
        {
            CheckSessionID();
            try
            {
                //populate customer accounts dropdownlist
                WebClient wc = new WebClient();

                List<CustomerAccounts> accountLst = new List<CustomerAccounts>();
                Invoices invs = new Invoices();

                //Accounts list
                string jsonRes = wc.DownloadString(Baseurl + "api/CustomerAccounts/" + Convert.ToInt64(id));
                accountLst = JsonConvert.DeserializeObject<List<CustomerAccounts>>(jsonRes);

                var accountListItems = accountLst.Select(c => new SelectListItem
                {
                    Value = c.id.ToString(),
                    Text = "Account: "+c.account_number + " Balance: " + c.account_balance.ToString()
                });
                var accdropdownLst = new SelectList(accountListItems, "Value", "Text");               
                
                string json = wc.DownloadString(Baseurl + "api/SaleInvoices/" + Convert.ToInt64(id));
                invs = JsonConvert.DeserializeObject<Invoices>(json);
                invs.List_Customers_Accounts = accdropdownLst.ToList();
                return View(invs);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //insert generated invoice to dB  
        public async Task<JsonResult> InsertInvoicePayment(PayInvoiceModel payed)
        {
            try
            {
                var stCode = (dynamic)null;
                var res = (dynamic)null;
                var json = JsonConvert.SerializeObject(payed);            

                var stringContent = new StringContent(json, Encoding.UTF8, "application/json"); ;
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(Baseurl);
                var response = await client.PostAsync("/api/Payments/MakePayment", stringContent);

                stCode = (int)response.StatusCode;

                if (stCode == 200)
                {
                      //success status, then continue excute balance calculation function
                      var k = UpdateAccountBalance(payed);
                      res = k.Value;
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

        //update acccount balance using MySQl
        public JsonResult UpdateAccountBalance(PayInvoiceModel payModel)
        {
            var res = (dynamic)null;
            try
            {
                using (con = new MySqlConnection(MySQLConx))
                {
                   con.Open();

                    MySqlCommand commandUpdt = con.CreateCommand();
                    commandUpdt.CommandType = CommandType.Text;
                    commandUpdt.CommandText = "UPDATE customer_accounts SET account_balance = account_balance + @amountToMinus WHERE id = @accountId";

                    // assign both transaction object and connection to Command object for a pending local transaction

                    // Start a local transaction
                    mysqlTrx = con.BeginTransaction();
                    commandUpdt.Connection = con;
                    commandUpdt.Transaction = mysqlTrx;

                    //use parametarized queries to prevent sql injection
                    commandUpdt.Parameters.AddWithValue("@amountToMinus", payModel.amount_paid);
                    commandUpdt.Parameters.AddWithValue("@accountId", payModel.account_id);

                    if (commandUpdt.ExecuteNonQuery() == 1)
                    {
                        //update is success, return Json result success and exit
                        //now commit
                        mysqlTrx.Commit();
                        res = "success";
                        Json(res);
                    }
                    else
                    {
                        mysqlTrx.Rollback(); 
                        res= "error";
                    }
                    con.Close();
                }            

            }
            catch (MySqlException ex)
            {
                try
                {
                    //rollback the transaction if any error occurs during the process of inserting
                    con.Open();
                    mysqlTrx.Rollback();
                    con.Close();
                }
                catch (MySqlException ex2)
                {
                    if (mysqlTrx.Connection != null)
                    {                      
                        TempData["isMessage"] = "An exception of type " + ex2.GetType() + " was encountered while attempting to roll back the transaction";
                    }
                }
                TempData["isMessage"] = "op not success due to this error: " + ex.Message + "";
            }
            finally
            {
                //close connection to release resources
                con.Close();
            }
            return Json(res);
        }

        //view customer list to drill down to  statement
        public IActionResult CustomersStatemtList()
        {
            CheckSessionID();
            try
            {
                WebClient wc = new WebClient();
                List<CustomerDetails> cstDs = null;
                string json = wc.DownloadString(Baseurl + "api/Customers");
                cstDs = JsonConvert.DeserializeObject<List<CustomerDetails>>(json);
                var allitems = (from a in cstDs select a).ToList();
                return View(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }

        //view specific customer statement in an exportable datatable
        public IActionResult GetCustomerStatement(string id)
        {
            CheckSessionID();
            try
            {
                WebClient wc = new WebClient();
                List<JointPaymentModel> cstDs = null;
                string json = wc.DownloadString(Baseurl + "api/Payments/" +id);
                cstDs = JsonConvert.DeserializeObject<List<JointPaymentModel>>(json);
                var allitems = (from a in cstDs select a).ToList();
                return View(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public JsonResult CustomerStatement(string id)
        {
            try
            {
                WebClient wc = new WebClient();
                List<JointPaymentModel> cstDs = null;
                string json = wc.DownloadString(Baseurl + "api/Payments/" + id);
                cstDs = JsonConvert.DeserializeObject<List<JointPaymentModel>>(json);
                var allitems = (from a in cstDs select a).ToList();
                return Json(allitems);
            }
            catch (Exception)
            {
                throw;
            }
        }


        //end of controller class
    }
    //end of namespace
}
