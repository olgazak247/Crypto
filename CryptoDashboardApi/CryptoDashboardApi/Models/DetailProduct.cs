using System.Collections.Generic;

namespace CryptoDashboardApi.Models
{
    public class DetailProduct
    {
        public string id { get; set; }
        public int trade_id { get; set; }
        public string price { get; set; }
        public string size { get; set; }
        public string bid { get; set; }
        public string ask { get; set; }        
        public string time { get; set; }
        public string open { get; set; }
        public string volume { get; set; }
        public IEnumerable<Ask> Asks{ get; set; }
        public IEnumerable<Bid> Bids{ get; set; }
    }
}
