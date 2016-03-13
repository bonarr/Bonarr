function times(n, block) {
  let forFunc = '';

  for (var i = from; i < to; i += incr) {
    accum += block.fn(i);
  }

  return accum;
}

module.exports = times;
