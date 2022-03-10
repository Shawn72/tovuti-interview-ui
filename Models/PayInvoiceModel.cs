using System;

namespace TovutiUI.Models
{
    public class PayInvoiceModel
    {
        public Int64 id { get; set; }
        public Int64 invc_id { get; set; }
        public DateTime date_paid { get; set; }
        public Int64 account_id { get; set; }
        public decimal amount_paid { get; set; }  

    }
}
