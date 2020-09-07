using System;
using System.Collections.Generic;

namespace CryptoDashboardApi.Models
{
    public class Currency
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string  Symbol{ get; set; }
        public string Price { get; set; }
        public string Difference { get; set; }
        public double Bid { get; set; }
        public double Ask { get; set; }
        public bool Active { get; set; }
        public IEnumerable<Ask> Asks { get; set; }
        public IEnumerable<Bid> Bids { get; set; }
        public string Volume { get; set; }
        public string  Open { get; set; }
        public DateTime Date{ get; set; }
    }
}
