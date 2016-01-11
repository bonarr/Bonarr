using Sonarr.Http.REST;

namespace Sonarr.Api.V3.Config
{
    public class DownloadClientConfigResource : RestResource
    {
        public string DownloadedEpisodesFolder { get; set; }
        public string DownloadClientWorkingFolders { get; set; }
        public int DownloadedEpisodesScanInterval { get; set; }

        public bool EnableCompletedDownloadHandling { get; set; }
        public bool RemoveCompletedDownloads { get; set; }

        public bool AutoRedownloadFailed { get; set; }
        public bool RemoveFailedDownloads { get; set; }
    }
}
