using Newtonsoft.Json;
using System.Threading.Tasks;
using WebSocket.Services;
using Xunit;

namespace WebSocket.Tests
{
    public class ConnectToQueueTests
    {
        private readonly IConnectToQueue _connectToQueue;        

        public ConnectToQueueTests()
        {
            _connectToQueue = new ConnectToQueue();            
        }


        [Fact]
        public async void ConnectAsyncTest()
        {
            var result = _connectToQueue.ConnectAsync("test", JsonConvert.SerializeObject("testMessage").ToString());
            await Task.CompletedTask;

            Assert.NotNull(result);
            Assert.Equal(TaskStatus.RanToCompletion, result.Status);
        }
    }
}
