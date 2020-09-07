using System;
using System.Threading.Tasks;
using WebSocket.Services;

namespace WebSocket
{
    class Program
    {
        static async Task Main(string[] args)
        {
            IConnectToQueue rabbit = new ConnectToQueue();
            ICoinbaseService service = new CoinbaseService();
            Console.WriteLine("Bus was started");
            await service.ConnectAsync(rabbit);
            Console.WriteLine("Bus was published");
            Console.ReadKey();
        }        
    }
}
