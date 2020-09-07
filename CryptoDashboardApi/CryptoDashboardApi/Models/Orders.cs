using System.Collections.Generic;

namespace CryptoDashboardApi.Models
{
    public class Orders
    {
        public IEnumerable<Ask> Asks { get; set; }
        public IEnumerable<Bid> Bids { get; set; }
    }
}
