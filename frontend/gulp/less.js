var gulp = require('gulp');

var less = require('gulp-less');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var livereload = require('gulp-livereload');
var path = require('path');

var print = require('gulp-print');
var paths = require('./helpers/paths');
var errorHandler = require('./helpers/errorHandler');

gulp.task('less', () => {
  var src = [
    path.join(paths.src.content, 'Bootstrap', 'bootstrap.less'),
    path.join(paths.src.content, 'Vendor', 'vendor.less'),
    path.join(paths.src.content, 'sonarr.less')
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
    .on('error', errorHandler)
    .pipe(postcss([autoprefixer({
      browsers: ['last 2 versions']
    })]))

    // not providing a path will cause the source map
    // to be embeded. which makes livereload much happier
    // since it doesn't reload the whole page to load the map.
    // this should be switched to sourcemaps.write('./') for production builds
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest.content))
    .pipe(livereload());
});
