using Nancy;

namespace Sonarr.Api.V3
{
    public abstract class SonarrApiModule : NancyModule
    {
        protected SonarrApiModule(string resource)
            : base("/api/v3/" + resource.Trim('/'))
        {
        }
    }
}