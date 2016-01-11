using System.Collections.Generic;
using Sonarr.Http.REST;

namespace Sonarr.Api.V3.Episodes
{
    public class RenameEpisodeResource : RestResource
    {
        public int SeriesId { get; set; }
        public int SeasonNumber { get; set; }
        public List<int> EpisodeNumbers { get; set; }
        public int EpisodeFileId { get; set; }
        public string ExistingPath { get; set; }
        public string NewPath { get; set; }
    }
}
