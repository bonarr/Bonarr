using System;
using System.Collections.Generic;
using NLog;
using NzbDrone.Common.Extensions;
using NzbDrone.Common.Http;
using NzbDrone.Core.Configuration;
using NzbDrone.Core.Exceptions;
using NzbDrone.Core.IndexerSearch.Definitions;
using NzbDrone.Core.ThingiProvider;
using NzbDrone.Core.Http.CloudFlare;
using NzbDrone.Core.Parser;
using NzbDrone.Core.Validation;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;
using System.IO;

namespace NzbDrone.Core.Indexers.CardigannDefinitions
{
    public class CardigannDefinitions : HttpIndexerBase<CardigannDefinitionsSettings>
    {
        public override string Name => "CardigannDefinitions";

        public override DownloadProtocol Protocol => DownloadProtocol.Torrent;
        public override TimeSpan RateLimit => TimeSpan.FromSeconds(2);

        public Deserializer deserializer;

        public CardigannDefinitions(IHttpClient httpClient, IIndexerStatusService indexerStatusService, IConfigService configService, IParsingService parsingService, Logger logger)
            : base(httpClient, indexerStatusService, configService, parsingService, logger)
        {
            deserializer = new DeserializerBuilder()
                    .WithNamingConvention(new CamelCaseNamingConvention())
                    .IgnoreUnmatchedProperties()
                    .Build();
        }

        public override IEnumerable<ProviderDefinition> DefaultDefinitions
        {
            get
            {
                var dir = new DirectoryInfo("Indexers/CardigannDefinitions/Definitions/");
                foreach (FileInfo f in dir.GetFiles("*.yml"))
                {

                    var definition = deserializer.Deserialize<CardigannIndexerDefinition>(File.ReadAllText(f.FullName));
                    yield return GetDefinition(definition.Name, new CardigannDefinitionsSettings { DefinitionLocation = f.FullName });
                }
                //yield return GetDefinition("Nyaa", new CardigannDefinitionsSettings { DefinitionLocation = "Indexers/CardigannDefinitions/Definitions/nyaa-pantsu"});
            }
        }

        private IndexerDefinition GetDefinition(string name, CardigannDefinitionsSettings settings)
        {
            return new IndexerDefinition
            {
                EnableRss = false,
                EnableSearch = false,
                Name = name,
                Implementation = GetType().Name,
                Settings = settings,
                Protocol = DownloadProtocol.Torrent,
                SupportsRss = SupportsRss,
                SupportsSearch = SupportsSearch
            };
        }

        public override IIndexerRequestGenerator GetRequestGenerator()
        {
            return null;
        }

        public override IParseIndexerResponse GetParser()
        {
            return null;//new TorrentPotatoParser();
        }

      
    }
}