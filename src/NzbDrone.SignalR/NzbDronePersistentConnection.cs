using System.Collections.Generic;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Infrastructure;
using NzbDrone.Common.Serializer;

namespace NzbDrone.SignalR
{
    public interface IBroadcastSignalRMessage
    {
        void BroadcastMessage(SignalRMessage message);
    }

    public sealed class NzbDronePersistentConnection : PersistentConnection, IBroadcastSignalRMessage
    {

        private readonly Dictionary<string, string> _messageHistory; 

        public NzbDronePersistentConnection()
        {
            _messageHistory = new Dictionary<string, string>();
        }

        private IPersistentConnectionContext Context
        {
            get
            {
                return ((ConnectionManager)GlobalHost.ConnectionManager).GetConnection(GetType());
            }
        }

        public void BroadcastMessage(SignalRMessage message)
        {
            string lastMessage;
            if (_messageHistory.TryGetValue(message.Name, out lastMessage))
            {
                if (message.Body.ToJson() == lastMessage)
                {
                    return;
                }
            }

            _messageHistory[message.Name] = message.Body.ToJson();

            Context.Connection.Broadcast(message);
        }
    }
}