using CryptoDashboardApi.Controllers;
using CryptoDashboardApi.Data;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace CryptoDashboardTests.UnitTests.Controllers
{
    public class MessagesControllerTests
    {
        MessagesController _controller;
        Mock<IMessagesRepo> _repo;

        public MessagesControllerTests()
        {
            _repo = new Mock<IMessagesRepo>();
            _controller = new MessagesController(_repo.Object);
        }

        [Fact]
        public void GetDetailProductReturnsOkResult()
        {
            // Act
            var result = _controller.Get() as OkResult;

            // Assert
            Assert.NotNull(result);
            Assert.IsType<OkResult>(result);
            Assert.Equal("200", result.StatusCode.ToString());
        }        
    }
}
