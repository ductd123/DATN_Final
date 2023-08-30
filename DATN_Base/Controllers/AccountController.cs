using DATN_Base.Models;
using DATN_Base.Service;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace ASP.Net_React.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class AccountController : ControllerBase
    {
        SqlConnection conn = new SqlConnection("server=APVN-PF3XBMS8\\OLIVER;database=master;Integrated Security=true");
        SqlCommand cmd = null;
        SqlDataAdapter da = null;
        private readonly string _connectionString;
        public AccountController()
        {
            // Khai báo chuỗi kết nối
            _connectionString = "server=APVN-PF3XBMS8\\OLIVER;database=master;Integrated Security=true";
        }

        [HttpPost]
        [Route("Registration")]
        public IActionResult Register(Account account)
        {
            // Tạo kết nối tới cơ sở dữ liệu
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                // Tạo truy vấn INSERT
                string query = "INSERT INTO [DATN].[dbo].[EmpManagement] (Name, PhoneNo, Address, IsActive) VALUES (@Name ,@PhoneNo , @Address, @IsActive)";

                // Tạo và thực thi SqlCommand
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Name", account.Name);
                    command.Parameters.AddWithValue("@PhoneNo", account.PhoneNo);
                    command.Parameters.AddWithValue("@Address", account.Address);
                    command.Parameters.AddWithValue("@IsActive", account.IsActive);
                    command.ExecuteNonQuery();
                }
            }

            // Trả về kết quả thành công
            return Ok("Đăng ký tài khoản thành công");
        }

        [HttpPost]

        public string Registration(Account employee)
        {
            string msg = string.Empty;
            try
            {
                cmd = new SqlCommand("usp_Register", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", employee.Name);
                cmd.Parameters.AddWithValue("@PhoneNo", employee.PhoneNo);
                cmd.Parameters.AddWithValue("@Address", employee.Address);
                cmd.Parameters.AddWithValue("@IsActive", employee.IsActive);

                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                if (i > 0)
                {
                    msg = "Data inserted.";
                }
                else
                {
                    msg = "Error.";
                }

            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;

        }

        [HttpPost]
        [Route("Login")]
        public string Login(Account employee)
        {
            string msg = string.Empty;
            try
            {
                da = new SqlDataAdapter("usp_Login", conn);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@Name", employee.Name);
                da.SelectCommand.Parameters.AddWithValue("@PhoneNo", employee.PhoneNo);
                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    msg = "Use is valid";
                }
                else
                {
                    msg = "Use is invalid";
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return msg;

        }

    }
}

