var Handlebars = require('handlebars');
var profileName = require('./Series/profileName');

Handlebars.registerHelper('profile', profileName);
