using System.Collections.Generic;

namespace CryptoDashboardApi
{
    public static class Constants
    {
        public const string BITCOIN = "Bitcoin";
        public const string ETHEREUM = "Ethereum";
        public const string LITECOIN = "Litecoin";
        
        public const string GBP = "GBP";
        public const string USD = "USD";
        public const string EUR = "EUR";

        public const string NoConnection = "No connection to server";

        public static IDictionary<string, string> DictCurrencies = new Dictionary<string, string>
        {
                { "BTC-GBP", Constants.BITCOIN },
                { "BTC-EUR", Constants.BITCOIN },
                { "BTC-USD", Constants.BITCOIN },
                { "ETH-GBP", Constants.ETHEREUM },
                { "ETH-EUR", Constants.ETHEREUM },
                { "ETH-USD", Constants.ETHEREUM },
                { "LTC-GBP", Constants.LITECOIN },
                { "LTC-EUR", Constants.LITECOIN },
                { "LTC-USD", Constants.LITECOIN }
        };
    }
}
