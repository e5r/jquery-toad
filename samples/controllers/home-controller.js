E5R.namespace('app/controllers', function (exports) {
    var $ = E5R.$jq,
        Controller = function () { }, //E5R.require('@').Controller
        utils = E5R.require('app/utils');

    function HomeController(view) {
        console.log('HomeController#constructor!', view);
    };

    exports['home'] = Controller({
        name: 'home',
        ctor: HomeController
    });
});
