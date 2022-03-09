using System;
using System.ComponentModel.DataAnnotations;

namespace TovutiUI.Entities
{
    public class SalesTransactions
    {
        [Key]
        public Int64 id { get; set; }
        public decimal product_amount { get; set; }
        public DateTime transaction_date { get; set; }
        public string payment_mode { get; set; }
        public decimal price { get; set; }
        public string unit_of_measurement { get; set; }
        public Int64 invoice_id { get; set; }
    }
}
