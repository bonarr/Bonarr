using System.Collections.Generic;
using NzbDrone.Core.RootFolders;
using Sonarr.Http.REST;

namespace Sonarr.Api.V3.RootFolders
{
    public class RootFolderResource : RestResource
    {
        public string Path { get; set; }
        public long? FreeSpace { get; set; }

        public List<UnmappedFolder> UnmappedFolders { get; set; }
    }
}