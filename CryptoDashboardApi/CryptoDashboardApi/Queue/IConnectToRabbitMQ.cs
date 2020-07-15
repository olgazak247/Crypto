using System.Threading.Tasks;

namespace CryptoDashboardApi.Queue
{
    public interface IConnectToRabbitMQ
    {        
        Task ConnectToQueue();
    }
}
