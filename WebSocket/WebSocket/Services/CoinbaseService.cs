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
        private const int ByteSize = 1024;

        public async Task ConnectAsync(IConnectToQueue connection)
        {
            var socket = new ClientWebSocket();
            var task = socket.ConnectAsync(new Uri("wss://ws-feed.gdax.com"), CancellationToken.None);
            task.Wait();

            Thread readThread = new Thread(
                async delegate (object obj)
                {
                    var recBytes = new byte[ByteSize];
                    while (true)
                    {
                        var data = new ArraySegment<byte>(recBytes);
                        
                        // Wait data from CoinbasePro
                        var receiveAsync = await socket.ReceiveAsync(data, CancellationToken.None);                        
                        var jsonString = Encoding.UTF8.GetString(recBytes);

                        var jProduct = JObject.Parse(jsonString);
                        if (!string.IsNullOrEmpty((string)jProduct["product_id"]))
                        {
                            // Connect to RabbitMQ
                            await connection.ConnectAsync((string)jProduct["product_id"], jsonString);
                        }
                        recBytes = new byte[ByteSize];
                    }
                });

            readThread.Start();
            var json = "{\"type\": \"subscribe\",\"product_ids\":" + GetProducts() + ",\"channels\": [\"ticker\"] }";

            var bytes = Encoding.UTF8.GetBytes(json);
            var subscriptionMessageBuffer = new ArraySegment<byte>(bytes);            
            
            // Send data to RabbitMQ
            await socket.SendAsync(subscriptionMessageBuffer, WebSocketMessageType.Text, true, CancellationToken.None);
        }

        private string GetProducts()
        {
            return " [\"BTC-GBP\",\"BTC-EUR\", \"BTC-USD\", \"ETH-GBP\", \"ETH-EUR\", \"ETH-USD\", \"LTC-GBP\", \"LTC-EUR\", \"LTC-USD\"] ";
        }
    }
}
