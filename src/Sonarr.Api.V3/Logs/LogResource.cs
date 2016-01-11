using System;
using Sonarr.Http.REST;

namespace Sonarr.Api.V3.Logs
{
    public class LogResource : RestResource
    {
        public DateTime Time { get; set; }
        public string Exception { get; set; }
        public string ExceptionType { get; set; }
        public string Level { get; set; }
        public string Logger { get; set; }
        public string Message { get; set; }
        public string Method { get; set; }
    }
}
