MyApp.namespace('app', function(app) {
    var $ = MyApp.$jq,
        $app = MyApp,
        utils = $app.require('utils');

    app.name = 'jQuery TOAD Sample Application';
    app.version = '1.0.0';
    app.copyright = 'Copyright (c) 2018 - E5R Development TEam';
    app.author = 'Erlimar Silva Campos (erlimar@gmail.com)';

    utils.printAppInfo()
})
