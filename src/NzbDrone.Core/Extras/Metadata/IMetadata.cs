using System.Collections.Generic;
using NzbDrone.Core.Extras.Metadata.Files;
using NzbDrone.Core.MediaFiles;
using NzbDrone.Core.ThingiProvider;
using NzbDrone.Core.Tv;

namespace NzbDrone.Core.Extras.Metadata
{
    public interface IMetadata : IProvider
    {
        string GetFilenameAfterMove(Series series, EpisodeFile episodeFile, MetadataFile metadataFile);
        MetadataFile FindMetadataFile(Series series, string path);
        MetadataFileResult SeriesMetadata(Series series);
        MetadataFileResult EpisodeMetadata(Series series, EpisodeFile episodeFile);
        List<ImageFileResult> SeriesImages(Series series);
        List<ImageFileResult> SeasonImages(Series series, Season season);
        List<ImageFileResult> EpisodeImages(Series series, EpisodeFile episodeFile);
        List<ImageFileResult> MovieImages(Movie movie);
        List<ImageFileResult> MovieImages(Movie movie, MovieFile movieFile);
        MetadataFile FindMetadataFile(Movie movie, string path);
        MetadataFileResult MovieMetadata(Movie movie);
        MetadataFileResult MovieMetadata(Movie movie, MovieFile movieFile);
        string GetFilenameAfterMove(Movie movie, MovieFile movieFile, MetadataFile metadataFile);
    }
}
