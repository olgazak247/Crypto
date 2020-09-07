namespace CryptoDashboardApi.Extensions
{
    public static class DoubleExtensions
    {
        public static string ToSignString(this double difference)
        {
            return difference >= 0
                ? $"+{difference:0.00}%"
                : $"{difference:0.00}%";
        }
    }
}
