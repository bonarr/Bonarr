using Sonarr.Http.REST;

namespace Sonarr.Api.V3.Tags
{
    public class TagResource : RestResource
    {
        public string Label { get; set; }
    }
}
