using Sonarr.Http.REST;

namespace Sonarr.Api.V3.RemotePathMappings
{
    public class RemotePathMappingResource : RestResource
    {
        public string Host { get; set; }
        public string RemotePath { get; set; }
        public string LocalPath { get; set; }
    }
}
