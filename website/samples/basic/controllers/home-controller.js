E5R.namespace('app/controllers', function (exports) {
    "use strict";

    var $ = E5R.$jq,
        utils = E5R.require('utils'),
        register = E5R.require('@registerController'),

        BY_ID = E5R.require('@constants').VIEW_BY_ID;

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

    exports['HomeController'] = register('home', HomeController);
});
