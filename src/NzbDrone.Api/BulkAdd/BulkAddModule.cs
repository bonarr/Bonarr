using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NzbDrone.Api.BulkAdd
{
    public class BulkAddModule : NzbDroneRestModule<BulkAddResource>
    {
        private readonly IBulkAddService _bulkAddService;

        public BulkAddModule(IBulkAddService bulkAddService) : base ("/bulkadd")
        {
            _bulkAddService = bulkAddService;

            GetResourceAll = GetMediaFiles;
        }

        private List<BulkAddResource> GetMediaFiles()
        {
            var folderQuery = Request.Query.folder;
            var folder = (string)folderQuery.Value;

            return _bulkAddService.GetMediaFiles(folder).ToResource().ToList();

        }
    }
}
