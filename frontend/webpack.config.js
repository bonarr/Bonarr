var path = require('path');
var webpack = require('webpack');

var uiFolder = 'UI.Phantom';
var root = path.join(__dirname, 'src');

console.log('ROOT:', root);

module.exports = {
  devtool: '#source-map',
  watchOptions: {
    poll: true
  },
  entry: {
    vendor: 'vendor.js',
    main: 'main.js'
  },
  resolve: {
    root: root,
    alias: {
      backbone: 'Shims/backbone',
      'backbone-pageable': 'JsLibraries/backbone.pageable',
      'backbone.collectionview': 'Shims/backbone.collectionview',
      'backbone.deepmodel': 'Shims/backbone.deep.model',
      'backbone.modelbinder': 'JsLibraries/backbone.modelbinder',
      'backbone.pageable': 'JsLibraries/backbone.pageable',
      'backbone.paginator': 'JsLibraries/backbone.paginator',
      'backbone.validation': 'Shims/backbone.validation',
      backgrid: 'Shims/backgrid',
      'backgrid.paginator': 'Shims/backgrid.paginator',
      'backgrid.selectall': 'Shims/backbone.backgrid.selectall',
      bootstrap: 'JsLibraries/bootstrap',
      'bootstrap.tagsinput': 'JsLibraries/bootstrap.tagsinput',
      filesize: 'JsLibraries/filesize',
      handlebars: 'Shims/handlebars',
      'handlebars.helpers': 'JsLibraries/handlebars.helpers',
      jquery: 'Shims/jquery',
      'jquery-ui': 'JsLibraries/jquery-ui',
      'jquery.dotdotdot': 'JsLibraries/jquery.dotdotdot',
      'jquery.easypiechart': 'JsLibraries/jquery.easypiechart',
      'jquery.knob': 'JsLibraries/jquery.knob',
      'jquery.lazyload': 'JsLibraries/jquery.lazyload',
      marionette: 'Shims/backbone.marionette',
      messenger: 'Shims/messenger',
      moment: 'JsLibraries/moment',
      momentRange: 'JsLibraries/moment-range',
      signalR: 'Shims/jquery.signalR',
      typeahead: 'JsLibraries/typeahead',
      underscore: 'Shims/underscore',
      vent: 'vent',
      'zero.clipboard': 'JsLibraries/zero.clipboard'
    }
  },
  output: {
    filename: '_output/' + uiFolder + '/[name].js',
    sourceMapFilename: '_output/' + uiFolder + '/[name].map'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],
  resolveLoader: {
    modulesDirectories: [
      'node_modules',
      'gulp/webpack/'
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.hbs$/,
        loader: 'html-annotate-loader'
      }],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|JsLibraries)/,
        loader: 'babel'
      },
      {
        test: /\.hbs?$/,
        loader: 'handlebars-loader',
        query: {
          runtime: 'handlebars',
          helperDirs: [
            root + '/Handlebars/Helpers/Series'
          ],
          knownHelpers: ['if_eq']
        }
      }
    ]
  }
};
