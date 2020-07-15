namespace CryptoDashboardApi.Models
{
    public class Product
    {
        public string id { get; set; }
        public string base_currency { get; set; }
        public string quote_currency { get; set; }
        public string base_min_size { get; set; }
        public string base_max_size { get; set; }
        public string quote_increment { get; set; }
        public string base_increment { get; set; }
        public string display_name { get; set; }
        public string min_market_funds { get; set; }
        public string max_market_funds { get; set; }
        public bool margin_enabled { get; set; }
        public bool post_only { get; set; }
        public bool limit_only { get; set; }
        public bool cancel_only { get; set; }
        public string status { get; set; }
        public string status_message { get; set; }
    }
}
