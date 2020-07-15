using Newtonsoft.Json.Linq;
using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace WebSocket.Services
{
    public class CoinbaseService : ICoinbaseService
    {        
        public async Task ConnectAsync(IConnectToQueue connect)
        {
            ClientWebSocket socket = new ClientWebSocket();
            var task = socket.ConnectAsync(new Uri("wss://ws-feed.gdax.com"), CancellationToken.None);
            task.Wait();
            Thread readThread = new Thread(
                delegate (object obj)
                {
                    var recBytes = new byte[1024];
                    while (true)
                    {
                        var t = new ArraySegment<byte>(recBytes);
                        var receiveAsync = socket.ReceiveAsync(t, CancellationToken.None);
                        receiveAsync.Wait();
                        var jsonString = Encoding.UTF8.GetString(recBytes);

                        //Console.WriteLine("jsonString = {0}", jsonString);
                        var jProduct = JObject.Parse(jsonString);
                        if (!string.IsNullOrEmpty((string)jProduct["product_id"]))
                        {                            
                            connect.ConnectAsync((string)jProduct["product_id"], jsonString);
                        }
                        //recBytes = new byte[512000];
                        recBytes = new byte[1024];
                    }
                });

            readThread.Start();
            //var json = "{\"type\": \"subscribe\",\"product_ids\":" + GetProducts() + ",\"channels\": [\"ticker\", \"level2\"] }";
            var json = "{\"type\": \"subscribe\",\"product_ids\":" + GetProducts() + ",\"channels\": [\"ticker\"] }";

            var bytes = Encoding.UTF8.GetBytes(json);
            var subscriptionMessageBuffer = new ArraySegment<byte>(bytes);            
            await socket.SendAsync(subscriptionMessageBuffer, WebSocketMessageType.Text, true, CancellationToken.None);
        }

        private string GetProducts()
        {
            return " [\"BTC-GBP\",\"BTC-EUR\", \"BTC-USD\", \"ETH-GBP\", \"ETH-EUR\", \"ETH-USD\", \"LTC-GBP\", \"LTC-EUR\", \"LTC-USD\"] ";
        }
    }
}
