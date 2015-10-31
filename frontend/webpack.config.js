var path = require('path');
var stylish = require('jshint-stylish');
var webpack = require('webpack');

var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin();

var uiFolder = 'UI.Phantom';
var root = path.join(__dirname, 'src');

console.log('ROOT:', root);

module.exports = {
  devtool: '#source-map',
  watchOptions: {
    poll: true,
  },
  entry: {
    vendor: 'vendor.js',
    main: 'main.js',
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
      fullcalendar: 'JsLibraries/fullcalendar',
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
      signalR: 'Shims/jquery.signalR',
      typeahead: 'JsLibraries/typeahead',
      underscore: 'Shims/underscore',
      vent: 'vent',
      'zero.clipboard': 'JsLibraries/zero.clipboard',
    },
  },
  output: {
    filename: '_output/' + uiFolder + '/[name].js',
    sourceMapFilename: '_output/' + uiFolder + '/[name].map',
  },
  plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
        }),
    ],
  module: {
    loaders: [
    {
      test: /\.js?$/,
      exclude: /(node_modules|JsLibraries)/,
      loader: 'babel',
      query: {
        optional: ['runtime'],
        stage: 1,
      },
    },
  ]

    //this doesn't work yet. waiting for https://github.com/spenceralger/rcloader/issues/5
    /*preLoaders: [
        {
            test: /\.js$/, // include .js files
            loader: "jshint-loader",
            exclude: [/JsLibraries/,/node_modules/]
        }
    ]
    */
  },
};
