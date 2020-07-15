using CryptoDashboardApi.Models;

namespace CryptoDashboardApi.Data
{
    public interface IUserRepo
    {
        User GetUser(User user);

        User AddUser(User user);
    }
}
