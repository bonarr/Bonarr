var gulp = require('gulp');
var del = require('del');

var paths = require('./helpers/paths');

gulp.task('clean', function() {
  return del([paths.dest.root]);
});
