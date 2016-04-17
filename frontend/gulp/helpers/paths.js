const root = './frontend/src/';

const paths = {
  src: {
    root,
    templates: root + '**/*.hbs',
    html: root + '*.html',
    partials: root + '**/*Partial.hbs',
    scripts: root + '**/*.js',
    less: [root + '**/*.less'],
    content: root + 'Content/',
    images: root + 'Content/Images/**/*',
    exclude: {
      libs: `!${root}JsLibraries/**`
    }
  },
  dest: {
    root: './_output/UI.Phantom/',
    content: './_output/UI.Phantom/Content/'
  }
};

module.exports = paths;
