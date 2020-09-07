using CryptoDashboardApi.Controllers;
using CryptoDashboardApi.Data;
using CryptoDashboardApi.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace CryptoDashboardTests.UnitTests.Controllers
{
    public class UserControllerTests
    {
        private readonly UserController _controller;
        private readonly Mock<IUserRepo> _service;

        public UserControllerTests()
        {
            _service = new Mock<IUserRepo>();
            _controller = new UserController(_service.Object);
        }

        [Fact]
        public void GetUserReturnsOkResult()
        {
            // Act
            var result = _controller.GetUser(new CryptoDashboardApi.Models.User { Username="Test1", Password="Password1"});

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);            
        }

        [Fact]
        public void GetUserWhenUserNotExist()
        {
            // Act
            var result = _controller.GetUser(new User { Username = "Test1", Password = "Password1" }).Result as OkObjectResult;
            var user = result.Value as User;
            
            // Assert
            Assert.NotNull(result.Value);
            Assert.IsType<User>(result.Value);
            Assert.Null(user.Username);
            Assert.Null(user.Password);
        }

        [Fact]
        public void GetUserWhenUserExist()
        {
            // Arrange
            var input = new User
            {
                Username = "Test1",
                Password = "Password1"
            };
            _service.Setup(s => s.GetUser(input)).Returns(input);
            
            // Act
            var result = _controller.GetUser(input).Result as OkObjectResult;
            var user = result.Value as User;
            
            // Assert
            Assert.NotNull(result.Value);
            Assert.IsType<User>(result.Value);
            Assert.Equal(input, result.Value);            
        }

        [Fact]
        public void AddUserReturnsOkResult()
        {
            // Act
            var result = _controller.AddUser(new CryptoDashboardApi.Models.User { Username = "Test1", Password = "Password1" });

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public void AddUserWhenUserNotExist()
        {
            // Arrange
            var input = new User
            {
                Username = "Test1",
                Password = "Password1"
            };
            _service.Setup(s => s.AddUser(input)).Returns(input);

            // Act
            var result = _controller.AddUser(input).Result as OkObjectResult;
            var user = result.Value as User;
            
            // Assert
            Assert.NotNull(result.Value);
            Assert.IsType<User>(result.Value);
            Assert.Equal(input, result.Value);            
        }

        [Fact]
        public void AddUserWhenUserExist()
        {
            // Arrange
            var input = new User
            {
                Username = "Test1",
                Password = "Password1"
            };
            _service.Setup(s => s.AddUser(input)).Returns(new User());

            // Act
            var result = _controller.AddUser(input).Result as OkObjectResult;
            var user = result.Value as User;
            
            // Assert
            Assert.NotNull(result.Value);
            Assert.IsType<User>(result.Value);
            Assert.Null(user.Username);
            Assert.Null(user.Password);
        }
    }
}
