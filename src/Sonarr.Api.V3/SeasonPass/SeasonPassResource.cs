using System.Collections.Generic;
using NzbDrone.Core.Tv;

namespace Sonarr.Api.V3.SeasonPass
{
    public class SeasonPassResource
    {
        public List<NzbDrone.Core.Tv.Series> Series { get; set; }
        public MonitoringOptions MonitoringOptions { get; set; }
    }
}
