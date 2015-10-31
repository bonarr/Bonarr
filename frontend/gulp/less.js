var gulp = require('gulp');

var less = require('gulp-less');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer-core');
var livereload = require('gulp-livereload');

var print = require('gulp-print');
var paths = require('./paths');
var errorHandler = require('./errorHandler');

gulp.task('less', function() {
  var src = [
    paths.src.content + 'Bootstrap/bootstrap.less',
    paths.src.content + 'Vendor/vendor.less',
    paths.src.content + 'sonarr.less'
  ];

  return gulp.src(src)
    .pipe(print())
    .pipe(sourcemaps.init())
    .pipe(less({
      dumpLineNumbers: 'false',
      compress: true,
      yuicompress: true,
      ieCompat: true,
      strictImports: true
    }))
    .pipe(postcss([autoprefixer({
      browsers: ['last 2 versions']
    })]))
    .on('error', errorHandler.onError)
    // not providing a path will cause the source map
    // to be embeded. which makes livereload much happier
    // since it doesn't reload the whole page to load the map.
    // this should be switched to sourcemaps.write('./') for production builds
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest.content))
    .pipe(livereload());
});
