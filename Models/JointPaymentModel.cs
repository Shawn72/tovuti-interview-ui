using System;

namespace TovutiUI.Models
{
    public class JointPaymentModel
    {
        public Int64 custmrid { get; set; }
        public string national_id { get; set; }
        public decimal creditlimit { get; set; }
        public Int64 trx_id { get; set; }
        public DateTime duedate { get; set; }
        public decimal amountgiven { get; set; }
        public decimal amtpaid { get; set; }
        public DateTime paydate { get; set; }
        public bool fullypaid { get; set; }
    }
}
