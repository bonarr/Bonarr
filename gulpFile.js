var phantom = require('./frontend/gulp/phantom');

if (phantom) {
    require('./frontend/gulp/gulpFile.js');
} else {
    require('./gulp/gulpFile.js');
}