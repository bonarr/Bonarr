using System;
using System.Collections.Generic;
using System.Linq;
using NzbDrone.Core.DecisionEngine;
using NzbDrone.Core.Tv;
using NzbDrone.SignalR;
using Sonarr.Api.V3.Episodes;

namespace Sonarr.Api.V3.Calendar
{
    public class CalendarModule : EpisodeModuleWithSignalR
    {
        public CalendarModule(IEpisodeService episodeService,
                              ISeriesService seriesService,
                              IQualityUpgradableSpecification qualityUpgradableSpecification,
                              IBroadcastSignalRMessage signalRBroadcaster)
            : base(episodeService, seriesService, qualityUpgradableSpecification, signalRBroadcaster, "calendar")
        {
            GetResourceAll = GetCalendar;
        }

        private List<EpisodeResource> GetCalendar()
        {
            var start = DateTime.Today;
            var end = DateTime.Today.AddDays(2);
            var includeUnmonitored = false;

            var queryStart = Request.Query.Start;
            var queryEnd = Request.Query.End;
            var queryIncludeUnmonitored = Request.Query.Unmonitored;

            if (queryStart.HasValue) start = DateTime.Parse(queryStart.Value);
            if (queryEnd.HasValue) end = DateTime.Parse(queryEnd.Value);
            if (queryIncludeUnmonitored.HasValue) includeUnmonitored = Convert.ToBoolean(queryIncludeUnmonitored.Value);

            var resources = MapToResource(_episodeService.EpisodesBetweenDates(start, end, includeUnmonitored), true, true);

            return resources.OrderBy(e => e.AirDateUtc).ToList();
        }
    }
}
