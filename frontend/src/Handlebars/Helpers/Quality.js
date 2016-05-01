const Handlebars = require('handlebars');
const profileName = require('./Series/profileName');

Handlebars.registerHelper('profile', profileName);
