using System.Collections.Generic;
using Nancy.Bootstrapper;
using NzbDrone.Api;
using NzbDrone.Common.Composition;
using NzbDrone.Common.EnvironmentInfo;
using NzbDrone.Common.Http.Dispatchers;
using NzbDrone.SignalR;
using Sonarr.Http;

namespace NzbDrone.Host
{
    public class MainAppContainerBuilder : ContainerBuilderBase
    {
        public static IContainer BuildContainer(StartupContext args)
        {
            var assemblies = new List<string>
                             {
                                 "NzbDrone.Host",
                                 "NzbDrone.Common",
                                 "NzbDrone.Core",
                                 "NzbDrone.Api",
                                 "NzbDrone.SignalR",
                                 "Sonarr.Api.V3"
                             };

            assemblies.Add(OsInfo.IsWindows ? "NzbDrone.Windows" : "NzbDrone.Mono");

            return new MainAppContainerBuilder(args, assemblies.ToArray()).Container;
        }

        private MainAppContainerBuilder(IStartupContext args, string[] assemblies)
            : base(args, assemblies)
        {
            AutoRegisterImplementations<NzbDronePersistentConnection>();

            Container.Register<INancyBootstrapper, SonarrBootstrapper>();
            Container.Register<IHttpDispatcher, FallbackHttpDispatcher>();
        }
    }
}