var gulp = require('gulp');
var jsbeautifier = require('gulp-jsbeautifier');
var paths = require('./helpers/paths.js');

// gulp.task('pretty', function () {
//   return gulp.src([
//       paths.src.scripts,
//       paths.src.exclude.libs
//     ])
//     .pipe(cache('jshint'))
//     .pipe(jshint())
//     .pipe(jshint.reporter(stylish));
// });

gulp.task('pretty-hbs', function() {
  gulp.src([
    paths.src.scripts
  ])
    .pipe(jsbeautifier({
      config: './frontend/.jsbeautifyrc'
    }))
    .pipe(gulp.dest(paths.root));
});
