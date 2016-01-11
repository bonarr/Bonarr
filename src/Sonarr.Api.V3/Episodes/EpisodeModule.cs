using System.Collections.Generic;
using NzbDrone.Core.DecisionEngine;
using NzbDrone.Core.Tv;
using NzbDrone.SignalR;
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
            UpdateResource = SetMonitored;
        }

        private List<EpisodeResource> GetEpisodes()
        {
            var seriesId = (int?)Request.Query.SeriesId;

            if (seriesId == null)
            {
                throw new BadRequestException("seriesId is missing");
            }

            var resources = ToListResource(_episodeService.GetEpisodeBySeries(seriesId.Value));

            return resources;
        }

        private void SetMonitored(EpisodeResource episodeResource)
        {
            _episodeService.SetEpisodeMonitored(episodeResource.Id, episodeResource.Monitored);
        }

        protected override List<EpisodeResource> LoadSeries(List<EpisodeResource> resources)
        {
            return resources;
        }
    }
}
