var path = require('path');
var gulp = require('gulp');
var print = require('gulp-print');
var cache = require('gulp-cached');
var livereload = require('gulp-livereload');

var paths = require('./helpers/paths.js');

gulp.task('copyJs', () => {
  return gulp.src(
    [
      path.join(paths.src.root, 'polyfills.js'),
      path.join(paths.src.root, 'JsLibraries/handlebars.runtime.js')
    ])
    .pipe(cache('copyJs'))
    .pipe(print())
    .pipe(gulp.dest(paths.dest.root))
    .pipe(livereload());
});

gulp.task('copyHtml', () => {
  return gulp.src(paths.src.html)
    .pipe(cache('copyHtml'))
    .pipe(print())
    .pipe(gulp.dest(paths.dest.root))
    .pipe(livereload());
});

gulp.task('copyContent', () => {
  return gulp.src([
    path.join(paths.src.content, '**', '*.*'),
    '!**/*.less',
    '!**/*.css'
  ])
    .pipe(cache('copyContent'))
    .pipe(print())
    .pipe(gulp.dest(paths.dest.content))
    .pipe(livereload());
});
