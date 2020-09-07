using CryptoDashboardApi.Data;
using CryptoDashboardApi.Queue;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace CryptoDashboardTests.UnitTests.Data
{
    public class MessagesRepoTests
    {
        private readonly Mock<IConnectToRabbitMQ> _connectToRabbit;
        private readonly IMessagesRepo _messagesRepo;

        public MessagesRepoTests()
        {
            _connectToRabbit = new Mock<IConnectToRabbitMQ>();
            _messagesRepo = new MessagesRepo(_connectToRabbit.Object);
        }

        [Fact]
        public async Task GetDetailProductFromQueue()
        {
            // Act
            var result = _messagesRepo.GetMessages();
            await Task.CompletedTask;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(TaskStatus.RanToCompletion.ToString(), result.Status.ToString());            
        }
    }
}
