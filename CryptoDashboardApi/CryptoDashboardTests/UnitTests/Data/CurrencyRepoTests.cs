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
        Mock<IProducts> _products;
        IDictionary<string, string> _lstCurrency;
        ICurrencyRepo _currencyRepo;

        public CurrencyRepoTests()
        {
            _products = new Mock<IProducts>();
            _lstCurrency = new Dictionary<string, string>
            {
                {"BTC-GBP", "Bitcoin" },
                {"BTC-EUR", "Bitcoin" },
                {"BTC-USD", "Bitcoin" },
                {"ETH-GBP", "Ethereum" },
                {"ETH-EUR", "Ethereum" },
                {"ETH-USD", "Ethereum" },
                {"LTC-GBP", "Litecoin" },
                {"LTC-EUR", "Litecoin" },
                {"LTC-USD", "Litecoin" }
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
                _products.Setup(s => s.GetStats(curr.Key)).Returns(Task.FromResult(new Stats { high = "541", low = "111", open = "9574", volume = "123506" }));
            }
            
            // Act
            var result = _currencyRepo.GetCurrencyObjects();

            // Assert
            Assert.NotNull(result);
            Assert.IsType<List<CurrencyObject>>(result);
            Assert.Equal(_lstCurrency.Count.ToString(), result.Count().ToString());
        }
    }
}
