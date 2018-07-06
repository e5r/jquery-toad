E5R.namespace('app/controllers', function (exports) {
    var $ = E5R.$jq,
        utils = E5R.import('utils'),
        register = E5R.import('@registerController'),

        BY_ID = E5R.import('@consts').VIEW_BY_ID;

    function HomeController(el, options) {
        var optionsJson = JSON.stringify(options, null, 2);

        $('pre#options', el).text(optionsJson);
    };

    HomeController.prototype.showMessage = function () {
        var self = $(this).controller();

        self.$view(BY_ID, 'message').text(self.$options.message);
    }

    HomeController.prototype.setTitle = function () {
        var self = $(this).controller();

        utils.setPageTitle(self.$options.pageTitle || utils.getPageTitle);
    }

    exports[HomeController.name] = register({
        name: 'home',
        ctor: HomeController
    });
});
