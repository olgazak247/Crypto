using CryptoDashboardApi.Models;

namespace CryptoDashboardApi.Data
{
    public interface IUserRepo
    {
        User GetUser(User userCredentials);

        User AddUser(User userCredentials);
    }
}
