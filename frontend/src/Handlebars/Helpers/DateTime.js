const Handlebars = require('handlebars');
const relativeDate = require('./DateTime/relativeDate');
const startTime = require('./DateTime/startTime');
const shortDate = require('./DateTime/shortDate');
const day = require('./DateTime/day');
const month = require('./DateTime/month');
const lts = require('./DateTime/lts');
const formatDate = require('./DateTime/formatDate');

Handlebars.registerHelper('shortDate', shortDate);
Handlebars.registerHelper('relativeDate', relativeDate);
Handlebars.registerHelper('day', day);
Handlebars.registerHelper('month', month);
Handlebars.registerHelper('startTime', startTime);
Handlebars.registerHelper('lts', lts);
Handlebars.registerHelper('formatDate', formatDate);
