const handlebars = require('handlebars');
const eachReverse = require('./Enumerable/eachReverse');
const times = require('./Enumerable/times');
const forHelper = require('./Enumerable/for');

handlebars.registerHelper('eachReverse', eachReverse);
handlebars.registerHelper('times', times);
handlebars.registerHelper('for', forHelper);

handlebars.registerHelper('for', function(from, to, incr, block) {
  var accum = '';

  for (var i = from; i < to; i += incr) {
    accum += block.fn(i);
  }

  return accum;
});
