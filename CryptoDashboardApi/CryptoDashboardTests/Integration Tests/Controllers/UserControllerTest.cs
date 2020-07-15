using CryptoDashboardApi;
using CryptoDashboardApi.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CryptoDashboardTests.Integration_Tests.Controllers
{
    public class UserControllerTest : IClassFixture<WebApplicationFactory<Startup>>
    {        
        private readonly WebApplicationFactory<Startup> _factory;

        public UserControllerTest(WebApplicationFactory<Startup> factory)
        {                      
            _factory = factory;            
        }

        private StringContent GetStringContent(object obj)
        {
            return new StringContent(JsonConvert.SerializeObject(obj), Encoding.Default, "application/json");
        }

        [Fact]
        public async Task GetTestIfClientNotExist()
        {
            // Arrange
            var request = new
            {
                Url = "/api/user/getuser",
                Body = new
                {
                    Username = "TestUsername1",
                    Password = "TestPassword1",
                    Description = ""
                }
            };
            var client = _factory.CreateClient();

            // Act
            var response = await client.PostAsync(request.Url, GetStringContent(request.Body));
            var value = await response.Content.ReadAsStringAsync();
            var jvalue = JsonConvert.DeserializeObject<User>(value);            

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.NotNull(value);
            Assert.Null(jvalue.Description);
            Assert.Null(jvalue.Username);
            Assert.Null(jvalue.Password);
        }

        [Fact]
        public async Task GetTestIfClientExist()
        {
            // Arrange
            var request = new
            {
                Url = "/api/user/getuser",
                Body = new
                {
                    Username = "FirstUser",
                    Password = "Number1",
                    Description = ""
                }
            };
            var client = _factory.CreateClient();

            // Act
            var response = await client.PostAsync(request.Url, GetStringContent(request.Body));
            var value = await response.Content.ReadAsStringAsync();
            var jvalue = JsonConvert.DeserializeObject<User>(value);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.NotNull(value);
            Assert.Equal("", jvalue.Description);
            Assert.Equal("Number1", jvalue.Password);
            Assert.Equal("FirstUser", jvalue.Username);
        }

        [Fact]
        public async Task AddUserTestIfClientNotExist()
        {
            // Arrange
            var request = new
            {
                Url = "/api/user/adduser",
                Body = new
                {
                    Username = "TestUsername1",
                    Password = "TestPassword1",
                    Description = ""
                }
            };
            var client = _factory.CreateClient();            

            // Act
            var response = await client.PostAsync(request.Url, GetStringContent(request.Body));
            var value = await response.Content.ReadAsStringAsync();
            var jvalue = JsonConvert.DeserializeObject<User>(value);
            DeleteRowFromDB(jvalue.Username);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.NotNull(value);
            Assert.Equal("", jvalue.Description);
            Assert.Equal("TestUsername1", jvalue.Username);
            Assert.Equal("TestPassword1", jvalue.Password);
        }

        [Fact]
        public async Task AddUserTestIfClientExist()
        {
            // Arrange
            var request = new
            {
                Url = "/api/user/adduser",
                Body = new
                {
                    Username = "FirstUser",
                    Password = "Number1",
                    Description = ""
                }
            };
            var client = _factory.CreateClient();

            // Act
            var response = await client.PostAsync(request.Url, GetStringContent(request.Body));
            var value = await response.Content.ReadAsStringAsync();
            var jvalue = JsonConvert.DeserializeObject<User>(value);            

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.NotNull(value);
            Assert.Null(jvalue.Description);
            Assert.Null(jvalue.Username);
            Assert.Null(jvalue.Password);
        }

        private void DeleteRowFromDB(string username)
        {
            using (SqlConnection con = new SqlConnection("Server=DESKTOP-GJP01T4;Database=CryptoDashboard;Trusted_Connection=True;"))
            {
                string query = $"Delete FROM Users WHERE Username ='{username}'";
                using SqlCommand cmd = new SqlCommand(query, con);
                cmd.Connection.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
    }
}

