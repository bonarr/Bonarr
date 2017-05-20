using System.Collections.Generic;
using NzbDrone.Core.Tv;

namespace NzbDrone.Core.MetadataSource
{
    public interface IMapCleanTitles
    {
        Dictionary<string, Movie> MapCleanTitles(List<string> cleanTitles);
    }
}