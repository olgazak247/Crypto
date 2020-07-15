using CryptoDashboardApi.Queue;
using System.Threading.Tasks;

namespace CryptoDashboardApi.Data
{
    public class MessagesRepo : IMessagesRepo
    {        
        private readonly IConnectToRabbitMQ _connectToRabbit;

        public MessagesRepo(IConnectToRabbitMQ connectToRabbit)
        {            
            _connectToRabbit = connectToRabbit;
        }

        public async Task GetMessages()
        {            
            await _connectToRabbit.ConnectToQueue();            
        }

    }
}
