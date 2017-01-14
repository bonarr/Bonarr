using NzbDrone.Core.DecisionEngine;
using NzbDrone.Core.Qualities;
using NzbDrone.Core.Tv;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NzbDrone.Core.MediaFiles.BulkAdd
{
    public class BulkAddItem
    {
        public string Path { get; set; }
        public string RelativePath { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
        public QualityModel Quality { get; set; }
        public string DownloadId { get; set; }
        public IEnumerable<Rejection> Rejections { get; set; }
        public Movie Movie { get; set; }
    }
}
