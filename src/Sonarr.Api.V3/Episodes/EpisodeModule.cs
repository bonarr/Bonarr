using System.Collections.Generic;
using Nancy;
using NzbDrone.Core.DecisionEngine;
using NzbDrone.Core.Tv;
using NzbDrone.SignalR;
using Sonarr.Http.Extensions;
using Sonarr.Http.REST;

namespace Sonarr.Api.V3.Episodes
{
    public class EpisodeModule : EpisodeModuleWithSignalR
    {
        public EpisodeModule(ISeriesService seriesService,
                             IEpisodeService episodeService,
                             IQualityUpgradableSpecification qualityUpgradableSpecification,
                             IBroadcastSignalRMessage signalRBroadcaster)
            : base(episodeService, seriesService, qualityUpgradableSpecification, signalRBroadcaster)
        {
            GetResourceAll = GetEpisodes;
            Put[@"/(?<id>[\d]{1,10})"] = x => SetEpisodeMonitored(x.Id);
            Put["/monitor"] = x => SetEpisodesMonitored();
        }

        private List<EpisodeResource> GetEpisodes()
        {
            if (!Request.Query.SeriesId.HasValue)
            {
                throw new BadRequestException("seriesId is missing");
            }

            var seriesId = (int)Request.Query.SeriesId;
            var seasonNumber = Request.Query.SeasonNumber.HasValue ? (int)Request.Query.SeasonNumber : (int?)null;

            if (seasonNumber.HasValue)
            {
                return MapToResource(_episodeService.GetEpisodesBySeason(seriesId, seasonNumber.Value), false, false);
            }

            return MapToResource(_episodeService.GetEpisodeBySeries(seriesId), false, false);
        }

        private Response SetEpisodeMonitored(int id)
        {
            var resource = Request.Body.FromJson<EpisodeResource>();
            _episodeService.SetEpisodeMonitored(id, resource.Monitored);

            return MapToResource(_episodeService.GetEpisode(id), false, false).AsResponse(HttpStatusCode.Accepted);
        }

        private Response SetEpisodesMonitored()
        {
            var resource = Request.Body.FromJson<EpisodesMonitoredResource>();

            _episodeService.SetMonitored(resource.EpisodeIds, resource.Monitored);

            return MapToResource(_episodeService.GetEpisodes(resource.EpisodeIds), false, false).AsResponse(HttpStatusCode.Accepted);
        }

        protected override List<EpisodeResource> LoadSeries(List<EpisodeResource> resources)
        {
            return resources;
        }
    }
}
