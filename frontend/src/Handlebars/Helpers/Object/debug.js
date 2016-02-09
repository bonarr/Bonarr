const debug = function () {
  console.group('Handlebar context');
  console.debug(this);
  console.groupEnd();
};

module.exports = debug;
