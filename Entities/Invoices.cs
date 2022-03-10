using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TovutiUI.Entities
{
    public class Invoices
    {
        [Key]
        public Int64 id { get; set; }
        public string payment_terms { get; set; }
        public DateTime transaction_date { get; set; }
        public DateTime due_date { get; set; }
        public decimal amount { get; set; }
        public Int64 customer_id { get; set; }
        public Int64 sale_trx_id { get; set; }
        public bool fully_paid { get; set; }

        public List<SelectListItem> List_Customers_Accounts = new List<SelectListItem>();

    }
}
