using Sonarr.Http.REST;

namespace Sonarr.Api.V3.Config
{
    public class IndexerConfigResource : RestResource
    {
        public int MinimumAge { get; set; }
        public int Retention { get; set; }
        public int RssSyncInterval { get; set; }
    }
}
