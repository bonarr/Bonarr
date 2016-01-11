using System;
using System.Collections.Generic;
using System.Linq;
using NzbDrone.Core.Datastore;
using Sonarr.Http.Mapping;
using Sonarr.Http.REST;
using Sonarr.Http.Validation;

namespace Sonarr.Http
{
    public abstract class SonarrRestModule<TResource> : RestModule<TResource> where TResource : RestResource, new()
    {
        protected string Resource { get; private set; }

        protected SonarrRestModule()
            : this(new TResource().ResourceName)
        {
        }

        protected SonarrRestModule(string resource)
            : base("/api/v3/" + resource.Trim('/'))
        {
            Resource = resource;
            PostValidator.RuleFor(r => r.Id).IsZero();
            PutValidator.RuleFor(r => r.Id).ValidId();
        }

        protected PagingResource<TResource> ApplyToPage<TModel>(Func<PagingSpec<TModel>, PagingSpec<TModel>> function, PagingSpec<TModel> pagingSpec, Converter<TModel, TResource> mapper)
        {
            pagingSpec = function(pagingSpec);

            return new PagingResource<TResource>
            {
                Page = pagingSpec.Page,
                PageSize = pagingSpec.PageSize,
                SortDirection = pagingSpec.SortDirection,
                SortKey = pagingSpec.SortKey,
                TotalRecords = pagingSpec.TotalRecords,
                Records = pagingSpec.Records.ConvertAll(mapper)
            };
        }
    }
}