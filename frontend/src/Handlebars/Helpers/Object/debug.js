function debug() {
  console.group('Handlebar context');
  console.debug(this);
  console.groupEnd();
}

module.exports = debug;
