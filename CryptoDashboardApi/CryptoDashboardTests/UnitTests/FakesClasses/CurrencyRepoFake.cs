using CryptoDashboardApi.Data;
using CryptoDashboardApi.Models;
using System.Collections.Generic;

namespace CryptoDashboardTests
{
    public class CurrencyRepoFake : ICurrencyRepo
    {
        private readonly List<CurrencyObject> _currencyLst;

        public CurrencyRepoFake()
        {
            _currencyLst = new List<CurrencyObject>{
                new CurrencyObject
                {
                    Title = "BTC-USD",
                    Description = "Bitcoin",
                    Currency = "$",
                    Price = "7,713.05",
                    Difference = "+0.71%",
                    BID = 8000,
                    ASK = 7500,
                    Active = true
                },
                new CurrencyObject
                {
                    Title = "BTC-EUR",
                    Description = "Bitcoin",
                    Currency = "£",
                    Price = "7,144.05",
                    Difference = "+0.71%",
                    BID = 8200,
                    ASK = 7800,
                    Active = false
                },
                new CurrencyObject
                {
                    Title = "ETC-USD",
                    Description = "Ethereum",
                    Currency = "$",
                    Price = "212",
                    Difference = "+0.18%",
                    BID = 220,
                    ASK = 210,
                    Active = false
                },
                new CurrencyObject
                {
                    Title = "ETC-EUR",
                    Description = "Ethereum",
                    Currency = "£",
                    Price = "220",
                    Difference = "+0.18%",
                    BID = 240,
                    ASK = 220,
                    Active = false
                }
            };
    }
        
        public IEnumerable<CurrencyObject> GetCurrencyObjects()
        {
            return _currencyLst;   
        }
    }
}
