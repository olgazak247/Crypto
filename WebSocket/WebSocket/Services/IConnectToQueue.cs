using System.Threading.Tasks;

namespace WebSocket.Services
{
    public interface IConnectToQueue
    {
        Task ConnectAsync(string id, string product);
    }
}