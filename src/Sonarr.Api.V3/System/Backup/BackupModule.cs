using System.Collections.Generic;
using System.IO;
using System.Linq;
using NzbDrone.Core.Backup;
using Sonarr.Http;

namespace Sonarr.Api.V3.System.Backup
{
    public class BackupModule : SonarrRestModule<BackupResource>
    {
        private readonly IBackupService _backupService;

        public BackupModule(IBackupService backupService) : base("system/backup")
        {
            _backupService = backupService;
            GetResourceAll = GetBackupFiles;
        }

        public List<BackupResource> GetBackupFiles()
        {
            var backups = _backupService.GetBackups();

            return backups.Select(b => new BackupResource
                                       {
                                           Id = b.Path.GetHashCode(),
                                           Name = Path.GetFileName(b.Path),
                                           Path = b.Path,
                                           Type = b.Type,
                                           Time = b.Time
                                       })
                                       .OrderByDescending(b => b.Time)
                                       .ToList();
        }
    }
}
