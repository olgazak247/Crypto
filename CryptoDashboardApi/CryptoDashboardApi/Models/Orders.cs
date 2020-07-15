using System.Collections.Generic;

namespace CryptoDashboardApi.Models
{
    public class Orders
    {
        public List<Ask> Asks { get; set; }
        public List<Bid> Bids { get; set; }
    }
}
