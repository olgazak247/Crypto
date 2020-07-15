using CryptoDashboardApi.Models;
using CryptoDashboardApi.Rest_Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace CryptoDashboardApi.Data
{
    public class CurrencyRepo : ICurrencyRepo
    {
        IProducts _products;
        IDictionary<string, string> _lstCurrency;

        public CurrencyRepo(IProducts products)
        {
            _products = products;
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
        }

        private IEnumerable<CurrencyObject> ConvertToCurrencyObject(IEnumerable<DetailProduct> products)
        {
            var result = new List<CurrencyObject>();
            foreach (var prod in products)
            {
                if (prod != null)
                {
                    var cur = _lstCurrency.FirstOrDefault(k => k.Key == prod.id);
                    double.TryParse(prod.bid, out double bid);
                    double.TryParse(prod.ask, out double ask);
                    double.TryParse(prod.volume, out double volume);
                    double.TryParse(prod.open, out double open);
                    double.TryParse(prod.price, out double price);
                    DateTime.TryParse(prod.time, out DateTime date);
                    var difference = ((price - open) / open) * 100;
                    var differenceResult = difference >= 0 ? $"+{difference.ToString("0.00")}%" : $"{difference.ToString("0.00")}%";
                    result.Add(new CurrencyObject
                    {
                        Active = false,
                        Title = cur.Key,
                        Price = prod.price,
                        BID = bid,
                        ASK = ask,
                        Description = cur.Value,
                        Currency = cur.Key.Substring(4, 3) == "GBP" ? "£" : cur.Key.Substring(4, 3) == "USD" ? "$" : cur.Key.Substring(4, 3) == "EUR" ? "€" : cur.Key.Substring(4, 3),
                        Volume = volume.ToString("0.000"),
                        Difference = differenceResult,
                        Open = prod.open,
                        Date = date
                    });
                }                
            }
            if (result.Count > 0)
            {
                result[0].Active = true;
            }
            
            return result;
        }

        private IEnumerable<DetailProduct> CallProducts()
        {
            var result = new List<DetailProduct>();            
            foreach (var currency in _lstCurrency)
            {
                var res = _products.GetDetailProduct(currency.Key).Result;                
                var stats = _products.GetStats(currency.Key).Result;
                res.open = stats.open;
                res.id = currency.Key;
                result.Add(res);                
            }
            
            return result;
        }

        public IEnumerable<CurrencyObject> GetCurrencyObjects()
        {
            var products = CallProducts();            
            var result = ConvertToCurrencyObject(products);

            return result;
        }
    }
}
