using System;
using System.Collections.Generic;

namespace CryptoDashboardApi.Models
{
    public class OrderBook
    {
        public List<List<object>> bids { get; set; }
        public List<List<object>> asks { get; set; }
    }
}
