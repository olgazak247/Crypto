using CryptoDashboardApi.Data;
using CryptoDashboardApi.Models;
using CryptoDashboardApi.Rest_Api;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace CryptoDashboardTests.UnitTests.Data
{
    public class CurrencyRepoTests
    {
        private readonly Mock<IProducts> _products;
        private readonly IDictionary<string, string> _lstCurrency;
        private readonly ICurrencyRepo _currencyRepo;

        public CurrencyRepoTests()
        {
            _products = new Mock<IProducts>();
            _lstCurrency = new Dictionary<string, string>
            {
                { "BTC-GBP", "Bitcoin" },
                { "BTC-EUR", "Bitcoin" },
                { "BTC-USD", "Bitcoin" },
                { "ETH-GBP", "Ethereum" },
                { "ETH-EUR", "Ethereum" },
                { "ETH-USD", "Ethereum" },
                { "LTC-GBP", "Litecoin" },
                { "LTC-EUR", "Litecoin" },
                { "LTC-USD", "Litecoin" }
            };
            _currencyRepo = new CurrencyRepo(_products.Object);
        }

        [Fact]
        public void GetCurrencyObjects()
        {
            // Arrange
            foreach (var curr in _lstCurrency)
            {
                _products.Setup(s => s.GetDetailProduct(curr.Key)).Returns(Task.FromResult( new DetailProduct{ ask = "584", bid = "5856", price = "4534", id = curr.Key }));
                _products.Setup(s => s.GetStats(curr.Key)).Returns(Task.FromResult(new Stats { High = "541", Low = "111", Open = "9574", Volume = "123506" }));
            }
            
            // Act
            var result = _currencyRepo.GetCurrencyObjects();

            // Assert
            Assert.NotNull(result);
            Assert.IsType<List<Currency>>(result);
            Assert.Equal(_lstCurrency.Count.ToString(), result.Count().ToString());
        }
    }
}
