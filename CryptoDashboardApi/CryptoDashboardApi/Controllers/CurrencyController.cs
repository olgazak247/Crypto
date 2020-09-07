using System.Collections.Generic;
using CryptoDashboardApi.Data;
using CryptoDashboardApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CryptoDashboardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        private readonly ICurrencyRepo _repository;        

       public CurrencyController(ICurrencyRepo repo)
        {
            _repository = repo;            
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<CurrencyObject>> GetAll()        
        {
            var currencyItems = _repository.GetCurrencyObjects();            
            return Ok(currencyItems);
        }        
    }
}