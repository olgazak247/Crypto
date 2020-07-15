using CryptoDashboardApi.Data;
using Microsoft.AspNetCore.Mvc;

namespace CryptoDashboardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private IMessagesRepo _messageRepo;
        
        public MessagesController(IMessagesRepo messageRepo)
        {
            _messageRepo = messageRepo;
        }

        [HttpGet]
        public ActionResult Get()
        {
            _messageRepo.GetMessages();
            return Ok();
        }
    }
}
