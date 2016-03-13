function eachReverse(context) {
  const options = arguments[arguments.length - 1];
  let accum = '';

  if (context && context.length > 0) {
    for (var i = context.length - 1; i >= 0; i--) {
      accum += options.fn(context[i]);
    }
  } else {
    accum = options.inverse(this);
  }

  return accum;
}

module.exports = eachReverse;
