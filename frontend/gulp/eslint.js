var gulp = require('gulp');
var eslint = require('gulp-eslint');
var paths = require('./paths.js');

gulp.task('eslint', function() {
  return gulp.src([
    paths.src.scripts,
    paths.src.exclude.libs,
  ])
    .pipe(eslint())
    .pipe(eslint.format());
});
