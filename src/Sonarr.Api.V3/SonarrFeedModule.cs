using Nancy;

namespace Sonarr.Api.V3
{
    public abstract class SonarrFeedModule : SonarrApiModule
    {
        protected SonarrFeedModule(string resource)
            : base("/feed/" + resource.Trim('/'))
        {
        }
    }
}