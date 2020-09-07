using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace CryptoDashboardApi.SignalR
{
    public class MessageHub: Hub
    {
        public async Task SendTickerMessages(string message)
        {
            if (Clients != null)
            {
                await Clients.All.SendAsync("ReceiveTickerMessage", message);
            }
        }
    }
}
