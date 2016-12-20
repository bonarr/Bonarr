using System.Collections.Generic;
using Nancy;
using NzbDrone.Core.Tv;
using Sonarr.Http.Extensions;

namespace Sonarr.Api.V3.Series
{
    public class SeriesEditorModule : SonarrV3Module
    {
        private readonly ISeriesService _seriesService;

        public SeriesEditorModule(ISeriesService seriesService)
            : base("/series/editor")
        {
            _seriesService = seriesService;
            Put["/"] = series => SaveAll();
        }

        private Response SaveAll()
        {
            //Read from request
            var series = Request.Body.FromJson<List<SeriesResource>>().ToModel();

            return _seriesService.UpdateSeries(series)
                                 .ToResource()
                                 .AsResponse(HttpStatusCode.Accepted);
        }
    }
}
