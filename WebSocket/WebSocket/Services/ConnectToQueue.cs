
using RabbitMQ.Client;
using System.Text;
using System.Threading.Tasks;

namespace WebSocket.Services
{
    public class ConnectToQueue : IConnectToQueue
    {
        public async Task ConnectAsync(string id, string jsonProduct)
        {            
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using var connection = factory.CreateConnection();
            using IModel channel = connection.CreateModel();
            var properties = channel.CreateBasicProperties();
            properties.Persistent = true;
            channel.QueueDeclare(id, false, false, false, null);
            var body = Encoding.UTF8.GetBytes(jsonProduct);
            channel.BasicPublish("", id, properties, body);
            //Console.WriteLine(" [x] Sent {0}", jsonProduct);
        }
    }
}
