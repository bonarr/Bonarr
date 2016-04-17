const gulp = require('gulp');
const runSequence = require('run-sequence');

require('./clean');
require('./less');
require('./handlebars');
require('./copy');

gulp.task('build', () => {
  return runSequence('clean', [
    'webpack',
    'less',
    'handlebars',
    'copyHtml',
    'copyContent',
    'copyJs'
  ]);
});
