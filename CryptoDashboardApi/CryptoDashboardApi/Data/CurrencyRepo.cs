using CryptoDashboardApi.Extensions;
using CryptoDashboardApi.Models;
using CryptoDashboardApi.Rest_Api;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CryptoDashboardApi.Data
{
    public class CurrencyRepo : ICurrencyRepo
    {
        private IProducts _products;        

        IDictionary<string, string> _dictSymbols = new Dictionary<string, string>
        {
            { "GBP", "£" },
            { "USD", "$" },
            { "EUR", "€" }
        };

        public CurrencyRepo(IProducts products)
        {
            _products = products;
        }
                
        private IEnumerable<DetailProduct> CallProducts()
        {
            var result = new List<DetailProduct>();            
            foreach (var currency in Constants.DictCurrencies)
            {
                var res = _products.GetDetailProduct(currency.Key).Result;                
                var stats = _products.GetStats(currency.Key).Result;
                res.open = stats.Open;
                res.id = currency.Key;
                result.Add(res);                
            }
            
            return result;
        }

        public IEnumerable<Currency> GetCurrencyObjects()
        {
            var products = CallProducts();            
            var result = products.ToCurrencies(Constants.DictCurrencies, _dictSymbols);

            if (result.Count() > 0)
            {
                result.FirstOrDefault().Active = true;
            }

            return result;
        }
    }
}
