using DATN_Base.Context;
using DATN_Base.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Data;
using System.Data.SqlClient;

namespace ASP.Net_React.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class AccountController : ControllerBase
    {
        public static List<Account> accounts = new List<Account>();

        [HttpPost]
        [Route("Registration")]
        public IActionResult Register(Account account)
        {
            var newaccount = new Account();
            {
                newaccount.Id = Guid.NewGuid();
                newaccount.UserName= account.UserName;
                newaccount.Password= account.Password;
                newaccount.Address = account.Address;
                newaccount.PhoneNo = account.PhoneNo;

            };
            accounts.Add(newaccount);
            return Ok(new
            {
                Success = true,
                newaccount
            });
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(string username, string password)
        {   
            var user = accounts
           .FirstOrDefault(u => u.UserName == username && u.Password == password);
            bool isSuccess = user != null;
            try
            {
                return Ok(new { isSuccess });
            }
            catch (Exception ex)
            {
                throw;
            }

        }
        // GET: api/<HangHoaController>
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(accounts);
        }

    }
}

