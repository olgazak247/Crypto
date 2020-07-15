
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebSocket.Models;

namespace WebSocket.Services
{
    public interface IConnectToQueue
    {
        Task ConnectAsync(string id, string product);
    }
}
