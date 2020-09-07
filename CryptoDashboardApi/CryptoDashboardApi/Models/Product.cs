namespace CryptoDashboardApi.Models
{
    public class Product
    {
        public string Id { get; set; }
        public string Base_currency { get; set; }
        public string Quote_currency { get; set; }
        public string Base_min_size { get; set; }
        public string Base_max_size { get; set; }
        public string Quote_increment { get; set; }
        public string Base_increment { get; set; }
        public string Display_name { get; set; }
        public string Min_market_funds { get; set; }
        public string Max_market_funds { get; set; }
        public bool Margin_enabled { get; set; }
        public bool Post_only { get; set; }
        public bool Limit_only { get; set; }
        public bool Cancel_only { get; set; }
        public string Status { get; set; }
        public string Status_message { get; set; }
    }
}
