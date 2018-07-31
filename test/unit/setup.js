var _TOP = '../../',
    pkg = require(_TOP + 'package.json'),
    JSDOM = require("jsdom").JSDOM;

module.exports = function (doc) {
    var DOM = new JSDOM(doc),
        jQuery = require('jquery')(DOM.window);

    return {
        window: DOM.window,
        jQuery: jQuery,
        pkg: pkg,
        toad: require(_TOP + 'dist/jquery-toad')(DOM.window)
    }
}
