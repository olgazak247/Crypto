using CryptoDashboardApi.Controllers;
using CryptoDashboardApi.Data;
using CryptoDashboardApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace CryptoDashboardTests
{    
    public class CurrencyControllerTests
    {
        private readonly CurrencyController _controller;
        private readonly ICurrencyRepo _service;

        public CurrencyControllerTests()
        {
            _service = new CurrencyRepoFake();
            _controller = new CurrencyController(_service);
        }
        
        [Fact]
        public void Get_WhenCalled_ReturnsOkResult()
        {
            // Act
            var okResult = _controller.GetAll();

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public void Get_WhenCalled_ReturnsAllItems()
        {
            // Act
            var okResult = _controller.GetAll().Result as OkObjectResult;

            // Assert
            var items = Assert.IsType<List<Currency>>(okResult.Value);
            Assert.NotNull(okResult);
            Assert.Equal(4, items.Count());
            Assert.IsType<List<Currency>>(okResult.Value);
        }
    }
}
