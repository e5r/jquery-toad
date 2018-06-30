E5R.namespace('app/controllers', function(exports) {
    var $ = E5R.$jq,
        Controller = E5R.require('@').Controller,
        utils = E5R.require('app/utils');

    function HomeController(view, options) {
        this.options = options;
    };

    HomeController.prototype.showMessage = function() {
        var ctrl = $(this).controller();
        alert('Exibindo mensagem: ' + ctrl.options.message);
    }

    var ctrl = exports['home'] = Controller({
        name: 'home',
        ctor: HomeController
    });
});
