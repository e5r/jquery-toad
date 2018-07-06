E5R.namespace('app/controllers', function (exports) {
    var $ = E5R.$jq,
        register = E5R.import('@registerController');

    function HomeController() { };

    HomeController.prototype.showMessage = function () {
        var ctrl = $(this).controller();

        ctrl.$view.byDataId('message').text(ctrl.$options.message);
    }

    exports[HomeController.name] = register({
        name: 'home',
        ctor: HomeController
    });
});
