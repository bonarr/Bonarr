using System.Collections;
using System.Collections.Generic;
using Nancy;
using NzbDrone.Api.Extensions;
using NzbDrone.Core.MediaCover;
using NzbDrone.Core.MetadataSource;
using NzbDrone.Core.Parser;
using System.Linq;
using System;
using Marr.Data;
using NzbDrone.Common.Extensions;
using NzbDrone.Core.Datastore;
using NzbDrone.Core.MediaFiles;
using NzbDrone.Core.MediaFiles.EpisodeImport;
using NzbDrone.Core.RootFolders;
using NzbDrone.Common.Cache;
using NzbDrone.Core.Tv;
using NLog;
using NzbDrone.Common.Instrumentation.Extensions;

namespace NzbDrone.Api.Movie
{

    public class UnmappedComparer : IComparer<UnmappedFolder>
    {
        public int Compare(UnmappedFolder a, UnmappedFolder b)
        {
            return a.Name.CompareTo(b.Name);
        }
    }

    public class MovieBulkImportModule : NzbDroneRestModule<MovieResource>
    {
        private readonly ISearchForNewMovie _searchProxy;
        private readonly IMapCleanTitles _cleanTitlesMapper;
        private readonly IRootFolderService _rootFolderService;
        private readonly IMakeImportDecision _importDecisionMaker;
        private readonly IDiskScanService _diskScanService;
		private readonly ICached<Core.Tv.Movie> _mappedMovies;
        private readonly IMovieService _movieService;
        private readonly Logger _logger;

        public MovieBulkImportModule(ISearchForNewMovie searchProxy, IRootFolderService rootFolderService, IMakeImportDecision importDecisionMaker,
		                             IDiskScanService diskScanService, ICacheManager cacheManager, IMovieService movieService, IMapCleanTitles cleanTitlesMapper,
                                    Logger logger)
            : base("/movies/bulkimport")
        {
            _searchProxy = searchProxy;
            _cleanTitlesMapper = cleanTitlesMapper;
            _rootFolderService = rootFolderService;
            _importDecisionMaker = importDecisionMaker;
            _diskScanService = diskScanService;
			_mappedMovies = cacheManager.GetCache<Core.Tv.Movie>(GetType(), "mappedMoviesCache");
            _movieService = movieService;
            _logger = logger;
            Get["/"] = x => Search();
        }


        private Response Search()
        {
            if (Request.Query.Id == 0)
            {
                //Todo error handling
            }

            RootFolder rootFolder = _rootFolderService.Get(Request.Query.Id);

            int page = Request.Query.page;
            int per_page = Request.Query.per_page;

            int min = (page - 1) * per_page;

            int max = page * per_page;

            var unmapped = rootFolder.UnmappedFolders.OrderBy(f => f.Name).ToList();

            int total_count = unmapped.Count;

            if (Request.Query.total_entries.HasValue)
            {
                total_count = Request.Query.total_entries;
            }

            max = total_count >= max ? max : total_count;

            var paged = unmapped.GetRange(min, max-min);

            var count = paged.Count();

            var cleanTitles = paged.Select((f, index) =>
            {
                _logger.ProgressInfo("Parsing dir {0} ({1}/{2})", f.Name, index, count);

                var parsedTitle = Parser.ParseMoviePath(f.Name);

                if (parsedTitle == null)
                {
                    return new
                    {
                        Title = Parser.CleanSeriesTitle(f.Name.Replace(".", " ").Replace("-", " ")),
                        Path = f.Path
                    };
                }
                else
                {
                    return new
                    {
                        Title = Parser.CleanSeriesTitle(parsedTitle.MovieTitle),
                        Path = f.Path
                    };
                }

               

            });

            /*var mapped = paged.Select(f =>
			{
				Core.Tv.Movie m = null;

				var mappedMovie = _mappedMovies.Find(f.Name);

				if (mappedMovie != null)
				{
					return mappedMovie;
				}

				var parsedTitle = Parser.ParseMoviePath(f.Name);

				if (parsedTitle == null)
				{
					m = new Core.Tv.Movie
					{
						Title = f.Name.Replace(".", " ").Replace("-", " "),
						Path = f.Path,
					};
				}
				else
				{
					m = new Core.Tv.Movie
					{
						Title = parsedTitle.MovieTitle,
						Year = parsedTitle.Year,
						ImdbId = parsedTitle.ImdbId,
						Path = f.Path
					};
				}

				var files = _diskScanService.GetVideoFiles(f.Path);

				var decisions = _importDecisionMaker.GetImportDecisions(files.ToList(), m, true);

				var decision = decisions.Where(d => d.Approved && !d.Rejections.Any()).FirstOrDefault();

				if (decision != null)
				{
					var local = decision.LocalMovie;

					m.MovieFile = new LazyLoaded<MovieFile>(new MovieFile
					{
						Path = local.Path,
						Edition = local.ParsedMovieInfo.Edition,
						Quality = local.Quality,
						MediaInfo = local.MediaInfo,
						ReleaseGroup = local.ParsedMovieInfo.ReleaseGroup,
						RelativePath = f.Path.GetRelativePath(local.Path)
					});
				}

				mappedMovie = _searchProxy.MapMovieToTmdbMovie(m);

				if (mappedMovie != null)
				{
					mappedMovie.Monitored = true;

					_mappedMovies.Set(f.Name, mappedMovie, TimeSpan.FromDays(2));

					return mappedMovie;
				}

				return null;
            });*/

            var mapped = _cleanTitlesMapper.MapCleanTitles(cleanTitles.Select(t => t.Title).ToList());

            var mappedMovies = mapped.Select(r =>
            {
                var cT = cleanTitles.Where(c => c.Title == r.Key).FirstOrDefault();
                if (cT != null)
                {
                    r.Value.Path = cT.Path;
                    return r.Value;
                }
                return null;
            }).OrderBy(m => m.SortTitle);
            
            return new PagingResource<MovieResource>
            {
                Page = page,
                PageSize = per_page,
                SortDirection = SortDirection.Ascending,
                SortKey = Request.Query.sort_by,
                TotalRecords = total_count - mappedMovies.Where(m => m == null).Count(),
                Records = MapToResource(mappedMovies.Where(m => m != null)).ToList()
            }.AsResponse();
        }


        private static IEnumerable<MovieResource> MapToResource(IEnumerable<Core.Tv.Movie> movies)
        {
            foreach (var currentMovie in movies)
            {
                var resource = currentMovie.ToResource();
                var poster = currentMovie.Images.FirstOrDefault(c => c.CoverType == MediaCoverTypes.Poster);
                if (poster != null)
                {
                    resource.RemotePoster = poster.Url;
                }

                yield return resource;
            }
        }
    }
}
