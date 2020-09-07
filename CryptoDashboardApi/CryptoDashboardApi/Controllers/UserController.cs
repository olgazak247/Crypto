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
        public ActionResult<User> GetUser([FromBody] User user)
        {
            var userOutput = _userRepo.GetUser(user);
            if(userOutput == null)
            {
                userOutput = new User();
            }
            return Ok(userOutput);
        }
        
        [HttpPost]
        public ActionResult<User> AddUser([FromBody] User user)
        {
            var userOutput = _userRepo.AddUser(user);            
            return Ok(userOutput);
        }
    }
}