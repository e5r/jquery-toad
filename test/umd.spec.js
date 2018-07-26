var JSDOM = require("jsdom").JSDOM;
var DOM = new JSDOM();
var window = DOM.window;
var jQuery = require('jquery')(window);
var toad = require('../dist/jquery-toad')(window);

console.log('External jQuery version:', jQuery.fn.jquery);
console.log('Internal jQuery version:', toad.$jq.fn.jquery);
console.log('TOAD info:', toad.$toad);
