using System.Collections.Generic;
using NzbDrone.Core.Qualities;
using Sonarr.Http;
using Sonarr.Http.Mapping;

namespace Sonarr.Api.V3.Qualities
{
    public class QualityDefinitionModule : SonarrRestModule<QualityDefinitionResource>
    {
        private readonly IQualityDefinitionService _qualityDefinitionService;

        public QualityDefinitionModule(IQualityDefinitionService qualityDefinitionService)
        {
            _qualityDefinitionService = qualityDefinitionService;

            GetResourceAll = GetAll;

            GetResourceById = GetById;

            UpdateResource = Update;
        }

        private void Update(QualityDefinitionResource resource)
        {
            var model = resource.InjectTo<QualityDefinition>();
            _qualityDefinitionService.Update(model);
        }

        private QualityDefinitionResource GetById(int id)
        {
            return _qualityDefinitionService.GetById(id).InjectTo<QualityDefinitionResource>();
        }

        private List<QualityDefinitionResource> GetAll()
        {
            return ToListResource(_qualityDefinitionService.All);
        }
    }
}