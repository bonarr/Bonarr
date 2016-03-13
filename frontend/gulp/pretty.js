var gulp = require('gulp');
var jsbeautifier = require('gulp-jsbeautifier');
var paths = require('./helpers/paths.js');

gulp.task('pretty-hbs', () => {
  gulp.src([
    paths.src.scripts
  ])
    .pipe(jsbeautifier({
      config: './frontend/.jsbeautifyrc'
    }))
    .pipe(gulp.dest(paths.root));
});
