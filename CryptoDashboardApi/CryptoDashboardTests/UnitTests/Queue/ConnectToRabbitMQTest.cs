using CryptoDashboardApi.Queue;
using CryptoDashboardApi.SignalR;
using Microsoft.AspNetCore.SignalR;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace CryptoDashboardTests.UnitTests.Queue
{
    public class ConnectToRabbitMQTest
    {
        IConnectToRabbitMQ _connectToRabbitMQ;
        Mock<MessageHub> _hub;
        Mock<IHubClients> _mockClients;
        Mock<IClientProxy> _mockClientProxy;        

        public ConnectToRabbitMQTest()
        {
            _hub = new Mock<MessageHub>();            
            _connectToRabbitMQ = new ConnectToRabbitMQ(_hub.Object);              
            _mockClients = new Mock<IHubClients>();
            _mockClientProxy = new Mock<IClientProxy>();
            
        }

        [Fact]
        public async Task ConnectToQueueTest()
        {            
            // Arrange
            _mockClients.Setup(clients => clients.All).Returns(_mockClientProxy.Object); 
            
            // Act
            var result = _connectToRabbitMQ.ConnectToQueue();
            await Task.CompletedTask;

            // Assert
            Assert.NotNull(result);
            Assert.Null(result.Exception);
            Assert.Equal(TaskStatus.RanToCompletion, result.Status);
        }
    }
}
