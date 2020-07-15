using System;
using System.Collections.Generic;

namespace CryptoDashboardApi.Models
{
    public class CurrencyObject
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string  Currency{ get; set; }
        public string Price { get; set; }
        public string Difference { get; set; }
        public double BID { get; set; }
        public double ASK { get; set; }
        public bool Active { get; set; }
        public List<Ask> Asks { get; set; }
        public List<Bid> Bids { get; set; }
        public string Volume { get; set; }
        public string  Open { get; set; }
        public DateTime Date{ get; set; }
    }
}
