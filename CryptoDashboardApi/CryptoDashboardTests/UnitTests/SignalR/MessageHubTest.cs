using CryptoDashboardApi.SignalR;
using Microsoft.AspNetCore.SignalR;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace CryptoDashboardTests.UnitTests.SignalR
{
    public class MessageHubTest
    {        
        Mock<IHubClients> _mockClients;
        Mock<IClientProxy> _mockClientProxy;
        MessageHub _messageHub;

        public MessageHubTest()
        {
            _mockClients = new Mock<IHubClients>();
            _mockClientProxy = new Mock<IClientProxy>();
            _messageHub = new MessageHub();
        }

        [Fact]
        public async Task SendMessagesTestAsync()
        {
            // Arrange
            _mockClients.Setup(clients => clients.All).Returns(_mockClientProxy.Object);
            
            // Act
            var result = _messageHub.SendTickerMessages("Ciao!!!");
            await Task.CompletedTask;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(TaskStatus.RanToCompletion, result.Status);
        }
    }
}
