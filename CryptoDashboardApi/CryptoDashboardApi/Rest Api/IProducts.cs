using CryptoDashboardApi.Models;
using System.Threading.Tasks;

namespace CryptoDashboardApi.Rest_Api
{
    public interface IProducts
    {        
        Task<DetailProduct> GetDetailProduct(string productId);                      
        Task<Stats> GetStats(string productId);
    }
}
