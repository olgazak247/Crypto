using CryptoDashboardApi.Data;
using CryptoDashboardApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CryptoDashboardApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        protected readonly IUserRepo _userRepo;        

        public UserController(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        
        [HttpPost]
        public ActionResult<User> GetUser([FromBody] User userCredentials)
        {
            var userData = _userRepo.GetUser(userCredentials);
            if(userData == null)
            {
                userData = new User();
            }

            return Ok(userData);
        }
        
        [HttpPost]
        public ActionResult<User> AddUser([FromBody] User userCredentials)
        {
            var userOutput = _userRepo.AddUser(userCredentials);            
            return Ok(userOutput);
        }
    }
}