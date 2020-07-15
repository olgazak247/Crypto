using Microsoft.AspNetCore.TestHost;
using System.Collections.Generic;
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using CryptoDashboardApi;
using Xunit;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;
using CryptoDashboardApi.Models;

namespace CryptoDashboardTests.Integration_Tests.Controllers
{
    public class CurrencyControllerTest
    {
        private readonly HttpClient _httpClient;

        public CurrencyControllerTest()
        {
            var server = new TestServer(new WebHostBuilder()
                .UseEnvironment("Development")
                .UseStartup<Startup>());
            _httpClient = server.CreateClient();
        }

        [Fact]
        public async Task GetAllCurrencyObjects()
        {            
            // Act
            var response = await _httpClient.GetAsync("/api/currency/");
            var result = JsonConvert.DeserializeObject<List<CurrencyObject>>(await response.Content.ReadAsStringAsync());

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);               
            Assert.NotNull(result);
            Assert.Equal(9, result.Count);           
        }
    }
}
