using NzbDrone.Core.Qualities;
using Sonarr.Http.REST;

namespace Sonarr.Api.V3.Qualities
{
    public class QualityDefinitionResource : RestResource
    {
        public Quality Quality { get; set; }

        public string Title { get; set; }

        public int Weight { get; set; }

        public double? MinSize { get; set; }
        public double? MaxSize { get; set; }
    }
}