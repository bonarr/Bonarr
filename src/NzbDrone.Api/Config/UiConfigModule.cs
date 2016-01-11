using System;
using System.Linq;
using System.Reflection;
using NzbDrone.Core.Configuration;
using Sonarr.Http;

namespace NzbDrone.Api.Config
{
    public class UiConfigModule : SonarrRestModule<UiConfigResource>
    public class UiConfigModule : NzbDroneConfigModule<UiConfigResource>
    {
        public UiConfigModule(IConfigService configService)
            : base(configService)
        {

        }

        protected override UiConfigResource ToResource(IConfigService model)
        {
            return UiConfigResourceMapper.ToResource(model);
        }
    }
}