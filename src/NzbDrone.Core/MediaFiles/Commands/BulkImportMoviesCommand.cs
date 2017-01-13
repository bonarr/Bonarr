using NzbDrone.Core.Messaging.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NzbDrone.Core.MediaFiles.Commands
{
    public class BulkImportMoviesCommand : Command
    {
        public List<int> MovieIds { get; set; }
        public List<int> Files { get; set; }

        public override bool SendUpdatesToClient => true;

        public BulkImportMoviesCommand()
        {

        }

        public BulkImportMoviesCommand(List<int> movieIds, List<int> files)
        {
            MovieIds = movieIds;
            Files = files;
        }
    }
}
