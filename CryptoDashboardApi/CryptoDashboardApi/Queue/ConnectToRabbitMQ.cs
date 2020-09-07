using CryptoDashboardApi.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CryptoDashboardApi.Queue
{
    public class ConnectToRabbitMQ : IConnectToRabbitMQ
    {
        private readonly MessageHub _hub;        
        private ConnectionFactory _factory { get; set; }

        public ConnectToRabbitMQ(MessageHub hub)
        {
            _hub = hub;           
        }

        public async Task ConnectToQueue()
        {
            string message;
            var tickerMessages = new List<string>();
            var snapshotMessages = new List<string>();
            var l2Messages = new List<string>();
            
            _factory = new ConnectionFactory() { HostName = "localhost" };

            using (var connection = _factory.CreateConnection())
            {
                foreach (var currency in Constants.DictCurrencies)
                {
                    using (var channel = connection.CreateModel())
                    {
                        channel.QueueDeclare(queue: currency.Key, durable: false, exclusive: false, autoDelete: false, arguments: null);

                        var consumer = new EventingBasicConsumer(channel);
                        async void ev(object sender, BasicDeliverEventArgs ea)
                        {
                            var body = ea.Body.ToArray();
                            message = Encoding.UTF8.GetString(body).Trim();
                            var jMessage = JObject.Parse(message);
                            await SendTickerMessage(JsonConvert.SerializeObject(jMessage));                            
                        }
                        consumer.Received += ev;
                        
                        channel.BasicConsume(queue: currency.Key, autoAck: true, consumer: consumer);
                        Thread.Sleep(3000);
                    }
                }                
            }            
        }

        private async Task SendTickerMessage(string messageTicker)
        {
            await _hub.SendTickerMessages(messageTicker);
        }          
    }
}
