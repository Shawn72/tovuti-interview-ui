using System;
using System.ComponentModel.DataAnnotations;

namespace TovutiUI.Entities
{
    public class CustomerDetails
    {
        [Key]
        public Int64 id { get; set; }
        public string firstname { get; set; }
        public string middlename { get; set; }
        public string lastname { get; set; }
        public string id_number { get; set; }
        public string email { get; set; }
        public decimal credit_limit { get; set; }
        public string payment_terms { get; set; }
    }
}
