var gulp = require('gulp');
var del = require('del');

var paths = require('./helpers/paths');

gulp.task('clean', () => {
  return del([paths.dest.root]);
});
