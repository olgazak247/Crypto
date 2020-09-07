using CryptoDashboardApi.Data;
using CryptoDashboardApi.Models;
using System.Collections.Generic;

namespace CryptoDashboardTests
{
    public class CurrencyRepoFake : ICurrencyRepo
    {
        private readonly List<Currency> _currencyLst;

        public CurrencyRepoFake()
        {
            _currencyLst = new List<Currency>
            {
                new Currency
                {
                    Title = "BTC-USD",
                    Description = "Bitcoin",
                    Symbol = "$",
                    Price = "7,713.05",
                    Difference = "+0.71%",
                    Bid = 8000,
                    Ask = 7500,
                    Active = true
                },
                new Currency
                {
                    Title = "BTC-EUR",
                    Description = "Bitcoin",
                    Symbol = "£",
                    Price = "7,144.05",
                    Difference = "+0.71%",
                    Bid = 8200,
                    Ask = 7800,
                    Active = false
                },
                new Currency
                {
                    Title = "ETC-USD",
                    Description = "Ethereum",
                    Symbol = "$",
                    Price = "212",
                    Difference = "+0.18%",
                    Bid = 220,
                    Ask = 210,
                    Active = false
                },
                new Currency
                {
                    Title = "ETC-EUR",
                    Description = "Ethereum",
                    Symbol = "£",
                    Price = "220",
                    Difference = "+0.18%",
                    Bid = 240,
                    Ask = 220,
                    Active = false
                }
            };
        }
        
        public IEnumerable<Currency> GetCurrencyObjects()
        {
            return _currencyLst;   
        }
    }
}
