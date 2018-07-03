E5R.namespace('app', function (exports) {
    var utils = E5R.require('app/utils'),
        Config = E5R.require('@').Config;

    Config.set('info', {
        name: 'jQuery TOAD Sample Application',
        version: '1.0.0',
        copyright: utils.toUpper('Copyright (c) 2018 - E5R Development Team'),
        author: 'Erlimar Silva Campos ' + utils.toLower('(ERLIMAR@GMAIL.COM)')
    });

    utils.printAppInfo();
});
