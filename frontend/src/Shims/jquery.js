var jquery = require('JsLibraries/jquery');
require('../Instrumentation/StringFormat');
var spin = require('jQuery/jquery.spin');
var ajax = require('jQuery/jquery.ajax');

spin.call(jquery);
ajax(jquery);

window.$ = jquery;
window.jQuery = jquery;
module.exports = jquery;
