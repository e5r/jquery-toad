E5R.namespace('app/controllers', function (exports) {
    var $ = E5R.$jq,
        Controller = E5R.require('@').Controller;

    function HomeController() { };

    HomeController.prototype.showMessage = function () {
        var ctrl = $(this).controller();

        ctrl.$view.byDataId('message').text(ctrl.$options.message);
    }

    var ctrl = Controller({
        name: 'home',
        ctor: HomeController
    });

    exports[ctrl.$name] = ctrl;
});
