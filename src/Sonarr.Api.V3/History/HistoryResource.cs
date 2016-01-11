using System;
using System.Collections.Generic;
using NzbDrone.Core.History;
using NzbDrone.Core.Qualities;
using Sonarr.Api.V3.Episodes;
using Sonarr.Api.V3.Series;
using Sonarr.Http.REST;

namespace Sonarr.Api.V3.History
{
    public class HistoryResource : RestResource
    {
        public int EpisodeId { get; set; }
        public int SeriesId { get; set; }
        public string SourceTitle { get; set; }
        public QualityModel Quality { get; set; }
        public bool QualityCutoffNotMet { get; set; }
        public DateTime Date { get; set; }
        public string Indexer { get; set; }
        public string ReleaseGroup { get; set; }
        public string DownloadId { get; set; }

        public HistoryEventType EventType { get; set; }

        public Dictionary<string, string> Data { get; set; }

        public EpisodeResource Episode { get; set; }
        public SeriesResource Series { get; set; }
    }
}
