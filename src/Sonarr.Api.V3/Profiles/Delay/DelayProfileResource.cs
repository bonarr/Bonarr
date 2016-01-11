using System.Collections.Generic;
using NzbDrone.Core.Indexers;
using Sonarr.Http.REST;

namespace Sonarr.Api.V3.Profiles.Delay
{
    public class DelayProfileResource : RestResource
    {
        public bool EnableUsenet { get; set; }
        public bool EnableTorrent { get; set; }
        public DownloadProtocol PreferredProtocol { get; set; }
        public int UsenetDelay { get; set; }
        public int TorrentDelay { get; set; }
        public int Order { get; set; }
        public HashSet<int> Tags { get; set; }
    }
}
