using RabbitMQ.Client;
using System.Text;
using System.Threading.Tasks;

namespace WebSocket.Services
{
    public class ConnectToQueue : IConnectToQueue
    {
        private const string host = "localhost";
        public async Task ConnectAsync(string id, string jsonProduct)
        {
            await Task.Run(() =>
            {
                var factory = new ConnectionFactory() { HostName = host };
                using var connection = factory.CreateConnection();
                using (IModel channel = connection.CreateModel())
                {
                    var properties = channel.CreateBasicProperties();
                    properties.Persistent = true;
                    channel.QueueDeclare(id, false, false, false, null);
                    var body = Encoding.UTF8.GetBytes(jsonProduct);

                    channel.BasicPublish("", id, properties, body);
                }
            });
        }
    }
}
