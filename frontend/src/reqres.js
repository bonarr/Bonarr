const Backbone = require('backbone');

const reqres = new Backbone.Wreqr.RequestResponse();

reqres.Requests = {
  GetEpisodeFileById: 'GetEpisodeFileById',
  GetAlternateNameBySeasonNumber: 'GetAlternateNameBySeasonNumber',

  SelectPath: 'SelectPath'
};

module.exports = reqres;
