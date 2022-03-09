using System;
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
        public string user_id { get; set; }
    }
}
