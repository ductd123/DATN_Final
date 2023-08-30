
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

public class Account
    {
    [Key]
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string PhoneNo { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
    }
