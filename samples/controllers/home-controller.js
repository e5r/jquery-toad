E5R.namespace('app/controllers', function (exports) {
    var $ = E5R.$jq,
        Controller = E5R.require('@').Controller,
        utils = E5R.require('app/utils');

    function HomeController(view) {
        console.log('HomeController#constructor!', view);
    };

    var ctrl = exports['home'] = Controller({
        name: 'home',
        ctor: HomeController
    });

    // var result = ctrl();
    // var instance = new ctrl();

    // console.log('ctrl.$name:', ctrl.$name);
    // console.log('ctrl:', ctrl);
    // console.log('result:', result);
    // console.log('instance:', instance);
});
