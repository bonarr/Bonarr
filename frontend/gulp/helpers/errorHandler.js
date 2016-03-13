var gulpUtil = require('gulp-util');

module.exports = function onError(error) {
  gulpUtil.log(gulpUtil.colors.red(`Error (${error.plugin}): ${error.message}`));
  this.emit('end');
};
