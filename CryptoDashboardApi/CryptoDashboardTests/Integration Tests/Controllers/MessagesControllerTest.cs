using CryptoDashboardApi;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace CryptoDashboardTests.Integration_Tests.Controllers
{
    public class MessagesControllerTest
    {
        private readonly HttpClient _httpClient;

        public MessagesControllerTest()
        {
            var server = new TestServer(new WebHostBuilder()
                .UseEnvironment("Development")
                .UseStartup<Startup>());
            _httpClient = server.CreateClient();
        }

        [Fact]
        public async Task GetTest()
        {
            // Act
            var response = await _httpClient.GetAsync("/api/messages/");

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
