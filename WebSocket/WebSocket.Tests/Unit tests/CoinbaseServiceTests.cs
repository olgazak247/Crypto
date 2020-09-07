using Moq;
using System.Threading.Tasks;
using WebSocket.Services;
using Xunit;

namespace WebSocket.Tests
{
    public class CoinbaseServiceTests
    {
        private readonly Mock<IConnectToQueue> _serviceQueue;
        private readonly ICoinbaseService _coinbaseService;

        public CoinbaseServiceTests()
        {
            _serviceQueue = new Mock<IConnectToQueue>();
            _coinbaseService = new CoinbaseService();            
        }

        [Fact]
        public async Task ConnectAsyncTest()
        {
            var result =  _coinbaseService.ConnectAsync(_serviceQueue.Object);
            await Task.CompletedTask;

            Assert.NotNull(result);
            Assert.Equal(TaskStatus.RanToCompletion, result.Status);
        }
    }
}
