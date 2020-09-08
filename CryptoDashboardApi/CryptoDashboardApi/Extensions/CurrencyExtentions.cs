using CryptoDashboardApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;


namespace CryptoDashboardApi.Extensions
{
    public static class CurrencyExtentions
    {
        public static IEnumerable<Currency> ToCurrencies(this IEnumerable<DetailProduct> products, IDictionary<string, string> dictCurrencies, IDictionary<string, string> dictSymbols)
        {
            var result = new List<Currency>();
            foreach (var prod in products)
            {
                if (prod != null)
                {
                    result.Add(prod.ToCurrency(dictCurrencies, dictSymbols));
                }
            }
                        
            return result;
        }

        public static Currency ToCurrency(this DetailProduct product, IDictionary<string, string> dictCurrencies, IDictionary<string, string> dictSymbols)
        {
            var ccy = dictCurrencies.FirstOrDefault(k => k.Key == product.id);
            double.TryParse(product.bid, out double bid);
            double.TryParse(product.ask, out double ask);
            double.TryParse(product.volume, out double volume);
            double.TryParse(product.open, out double open);
            double.TryParse(product.price, out double price);
            DateTime.TryParse(product.time, out DateTime date);
            var difference = (((price - open) / open) * 100).ToSignString();            
            var ccySymbol = ccy.Key[4..7];

            return new Currency
            {
                Active = false,
                Title = ccy.Key,
                Price = product.price,
                Bid = bid,
                Ask = ask,
                Description = ccy.Value,
                Symbol = dictSymbols.ContainsKey(ccySymbol)
                    ? dictSymbols[ccySymbol]
                    : ccySymbol,
                Volume = volume.ToString("0.000"),
                Difference = difference,
                Open = product.open,
                Date = date
            };
        }
    }        
}
