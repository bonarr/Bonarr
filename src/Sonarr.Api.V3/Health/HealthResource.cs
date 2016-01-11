using System;
using NzbDrone.Core.HealthCheck;
using Sonarr.Http.REST;

namespace Sonarr.Api.V3.Health
{
    public class HealthResource : RestResource
    {
        public HealthCheckResult Type { get; set; }
        public string Message { get; set; }
        public Uri WikiUrl { get; set; }
    }
}
