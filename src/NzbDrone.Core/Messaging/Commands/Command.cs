using System;

namespace NzbDrone.Core.Messaging.Commands
{
    public abstract class Command
    {
        private bool _sendUpdatesToClient = false;

        public virtual bool SendUpdatesToClient
        {
            get
            {
                return _sendUpdatesToClient;
            }

            set
            {
                _sendUpdatesToClient = value;
            }
        }

        public virtual bool UpdateScheduledTask
        {
            get
            {
                return true;
            }
        }

        public virtual string CompletionMessage
        {
            get
            {
                return "Completed";
            }
        }

        public string Name { get; private set; }
        public DateTime? LastExecutionTime { get; set; }
        public CommandTrigger Trigger { get; set; }

        public Command()
        {
            Name = GetType().Name.Replace("Command", "");
        }
    }
}
