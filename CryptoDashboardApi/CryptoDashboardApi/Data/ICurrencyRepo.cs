using CryptoDashboardApi.Models;
using System.Collections.Generic;

namespace CryptoDashboardApi.Data
{
    public interface ICurrencyRepo
    {
        IEnumerable<Currency> GetCurrencyObjects();
    }
}
