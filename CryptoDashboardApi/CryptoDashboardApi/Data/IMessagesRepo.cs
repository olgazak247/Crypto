using System.Threading.Tasks;

namespace CryptoDashboardApi.Data
{
    public interface IMessagesRepo
    {
        Task GetMessages();
    }
}
