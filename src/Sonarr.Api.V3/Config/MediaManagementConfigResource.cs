using NzbDrone.Core.MediaFiles;
using Sonarr.Http.REST;

namespace Sonarr.Api.V3.Config
{
    public class MediaManagementConfigResource : RestResource
    {
        public bool AutoUnmonitorPreviouslyDownloadedEpisodes { get; set; }
        public string RecycleBin { get; set; }
        public bool AutoDownloadPropers { get; set; }
        public bool CreateEmptySeriesFolders { get; set; }
        public FileDateType FileDate { get; set; }

        public bool SetPermissionsLinux { get; set; }
        public string FileChmod { get; set; }
        public string FolderChmod { get; set; }
        public string ChownUser { get; set; }
        public string ChownGroup { get; set; }

        public bool SkipFreeSpaceCheckWhenImporting { get; set; }
        public bool CopyUsingHardlinks { get; set; }
        public bool EnableMediaInfo { get; set; }
    }
}
