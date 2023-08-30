using System.Data.SqlClient;

namespace DATN_Base.Service
{
    public class RegistrationService
    {
        private readonly string _connectionString;

        public RegistrationService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void SaveRegistration(string name, string phoneNumber, string address, int isActive)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                string query = "INSERT INTO YourTableName (Name, PhoneNumber, Address) VALUES (@Name, @PhoneNumber, @Address)";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Name", name);
                    command.Parameters.AddWithValue("@PhoneNumber", phoneNumber);
                    command.Parameters.AddWithValue("@Address", address);

                    command.ExecuteNonQuery();
                }
            }
        }
    }
}
