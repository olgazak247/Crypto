using CryptoDashboardApi.Models;
using Microsoft.Extensions.Options;
using System.Data.SqlClient;

namespace CryptoDashboardApi.Data
{
    public class UserRepo : IUserRepo
    {
        private readonly ConnectionStrings connectionStrings;

        public UserRepo(IOptions<ConnectionStrings> connectionStrings)
        {
            this.connectionStrings = connectionStrings.Value;
        }

        public User GetUser(User userInput)
        {
            var user = ConnectToDatabase(userInput.Username);
            
            if (user != null)
            {
                if (user.Password == userInput.Password)
                {
                    return user;
                }
            }

            return null;
        }

        public User AddUser(User userInput)
        {
            var isValid = ControlUsername(userInput.Username);
            if (isValid)
            {
                AddToDatabase(userInput);
                return userInput;
            }

            return new User();                       
        }

        private  User ConnectToDatabase(string username)
        {
            string constr = this.connectionStrings.DefaultConnection;
            
            var user = new User();
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = $"SELECT * FROM Users WHERE Username ='{username}'";
                using SqlCommand cmd = new SqlCommand(query, con);
                cmd.Connection.Open();
                cmd.ExecuteNonQuery();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        user = new User
                        {
                            Username = reader["Username"].ToString(),
                            Password = reader["Password"].ToString(),
                            Description = reader["Description"].ToString()
                        };
                    }
                }
                con.Close();
            }

            return user;
        }

        private void AddToDatabase(User user)
        {
            string constr = this.connectionStrings.DefaultConnection;
            
            using (SqlConnection con = new SqlConnection(constr))
            {
                string query = $"INSERT into Users (Username, Password) VALUES ('{user.Username}', '{user.Password}')";                
                using SqlCommand cmd = new SqlCommand(query, con);
                cmd.Connection.Open();
                cmd.ExecuteNonQuery();                
                con.Close();
            }            
        }

        private bool ControlUsername(string username)
        {
            var userOutput = ConnectToDatabase(username);
            var isValid = false;
            if (string.IsNullOrEmpty(userOutput.Username))
            {
                isValid = true;
            }

            return isValid;
        }        
    }
}
