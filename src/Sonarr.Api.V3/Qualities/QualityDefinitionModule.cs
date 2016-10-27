using System.Collections.Generic;
using Nancy;
using NzbDrone.Core.Qualities;
using Sonarr.Http;
using Sonarr.Http.Extensions;
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
            Put["/update"] = d => UpdateMany();
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
            return _qualityDefinitionService.All().ToResource();
        }

        private Response UpdateMany()
        {
            //Read from request
            var qualityDefinitions = Request.Body.FromJson<List<QualityDefinitionResource>>().InjectTo<List<QualityDefinition>>();

            _qualityDefinitionService.UpdateMany(qualityDefinitions);

            return _qualityDefinitionService.All()
                                            .InjectTo<List<QualityDefinitionResource>>()
                                            .AsResponse(HttpStatusCode.Accepted);
        }
    }
}