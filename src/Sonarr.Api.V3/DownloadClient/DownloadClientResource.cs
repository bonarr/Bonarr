using NzbDrone.Core.Indexers;

namespace Sonarr.Api.V3.DownloadClient
{
    public class DownloadClientResource : ProviderResource
    {
        public bool Enable { get; set; }
        public DownloadProtocol Protocol { get; set; }
    }
}