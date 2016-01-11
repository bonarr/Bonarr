using Nancy;
using NzbDrone.Core.Tv;
using Sonarr.Http.Extensions;

namespace Sonarr.Api.V3.SeasonPass
{
    public class SeasonPassModule : SonarrApiModule
    {
        private readonly IEpisodeMonitoredService _episodeMonitoredService;

        public SeasonPassModule(IEpisodeMonitoredService episodeMonitoredService)
            : base("/seasonpass")
        {
            _episodeMonitoredService = episodeMonitoredService;
            Post["/"] = series => UpdateAll();
        }

        private Response UpdateAll()
        {
            //Read from request
            var request = Request.Body.FromJson<SeasonPassResource>();

            foreach (var s in request.Series)
            {
                _episodeMonitoredService.SetEpisodeMonitoredStatus(s, request.MonitoringOptions);
            }

            return "ok".AsResponse(HttpStatusCode.Accepted);
        }
    }
}
