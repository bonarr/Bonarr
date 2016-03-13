function times(n, block) {
  let accum = '';

  for (var i = 0; i < n; ++i) {
    accum += block.fn(i);
  }

  return accum;
}

module.exports = times;
