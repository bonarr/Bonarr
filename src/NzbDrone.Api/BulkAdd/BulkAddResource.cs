using NzbDrone.Api.REST;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NzbDrone.Core.MediaFiles.BulkAdd;
using NzbDrone.Api.Movie;
using NzbDrone.Core.Qualities;
using NzbDrone.Core.DecisionEngine;
using NzbDrone.Common.Crypto;

namespace NzbDrone.Api.BulkAdd
{
    public class BulkAddResource : RestResource
    {
        public string Path { get; set; }
        public string RelativePath { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
        public MovieResource Movie { get; set; }
        public QualityModel Quality { get; set; }
        public int QualityWeight { get; set; }
        public string DownloadId { get; set; }
        public IEnumerable<Rejection> Rejections { get; set; }
    }

    public static class BulkAddResourceMapper
    {
        public static BulkAddResource ToResource(this BulkAddItem model)
        {
            if (model == null) return null;

            return new BulkAddResource
            {
                Id = HashConverter.GetHashInt31(model.Path),

                Path = model.Path,
                RelativePath = model.RelativePath,
                Name = model.Name,
                Size = model.Size,
                Movie = model.Movie.ToResource(),
                Quality = model.Quality,
                DownloadId = model.DownloadId,
                Rejections = model.Rejections
            };
        }

        public static List<BulkAddResource> ToResource(this IEnumerable<BulkAddItem> models)
        {
            return models.Select(ToResource).ToList();
        }
    }

    
}
