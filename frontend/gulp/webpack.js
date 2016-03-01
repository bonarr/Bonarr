var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var webpackStream = require('webpack-stream');
var livereload = require('gulp-livereload');
var path = require('path');
var webpack = require('webpack');
var uiFolder = 'UI.Phantom';
var htmlAnnotate = path.join(__dirname, 'helpers', 'html-annotate-loader');
var root = path.join(__dirname, '..', 'src');

console.log('ROOT:', root);

var config = {
  devtool: '#source-map',
  watchOptions: {
    poll: true
  },
  entry: {
    vendor: 'vendor.js',
    main: 'main.js'
  },
  resolve: {
    root: [
      root,
      path.join(root, 'Shims'),
      path.join(root, 'JsLibraries')
    ],
    alias: {
      'backbone-pageable': 'JsLibraries/backbone.pageable',
      'backbone.deepmodel': 'Shims/backbone.deep.model',
      'backbone.sorted.collection': 'JsLibraries/backbone-sorted-collection',
      'radio': 'JsLibraries/backbone.radio',
      'backgrid.selectall': 'Shims/backbone.backgrid.selectall',
      'marionette': 'Shims/backbone.marionette',
      'momentRange': 'JsLibraries/moment-range',
      'signalR': 'Shims/jquery.signalR'
    }
  },
  output: {
    filename: '_output/' + uiFolder + '/[name].js',
    sourceMapFilename: '_output/' + uiFolder + '/[name].map'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ],
  resolveLoader: {
    modulesDirectories: [
      'node_modules',
      'gulp/webpack/'
    ]
  },
  module: {
    preLoaders: [{
      test: /\.hbs$/,
      loader: htmlAnnotate
    }],
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|JsLibraries)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.hbs?$/,
      loader: 'handlebars-loader',
      query: {
        runtime: 'handlebars',
        helperDirs: [
          root + '/Handlebars/Helpers/Episode',
          root + '/Handlebars/Helpers/Series',
          root + '/Handlebars/Helpers/Rating',
          root + '/Handlebars/Helpers/DateTime',
          root + '/Handlebars/Helpers/Object',
          root + '/Handlebars/Helpers/Number'
        ],
        knownHelpers: ['if_eq', 'unless_eq', 'if_gt']
      }
    }]
  }
};

gulp.task('webpack', function () {
  return gulp.src('main.js')
    .pipe(webpackStream(config))
    .pipe(gulp.dest(''));
});

gulp.task('webpackWatch', function () {
  config.watch = true;
  return gulp.src('')
    .pipe(webpackStream(config))
    .on('error', gulpUtil.log)
    .pipe(gulp.dest(''))
    .pipe(livereload());
});
