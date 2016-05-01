const Handlebars = require('handlebars');
const episodeStatus = require('./Episode/episodeStatus');
const episodeNumber = require('./Episode/episodeNumber');
const statusLevel = require('./Episode/statusLevel');

Handlebars.registerHelper('episodeStatus', episodeStatus);
Handlebars.registerHelper('episodeNumber', episodeNumber);
Handlebars.registerHelper('statusLevel', statusLevel);
