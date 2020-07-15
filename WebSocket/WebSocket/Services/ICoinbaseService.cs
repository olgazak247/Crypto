
using System.Threading.Tasks;

namespace WebSocket.Services
{
    public interface ICoinbaseService
    {
        Task ConnectAsync(IConnectToQueue rabbit);
    }
}
