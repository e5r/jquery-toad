MYAPP.namespace('myapp', function () {
    var $ = MYAPP.$jq,
        Controller = MYAPP.require('@').Controller;

    function MyController() {
        this.message = 'Olá mundo jQuery TOAD!'
    };

    MyController.prototype.onClickMessage = function () {
        var ctrl = $(this).controller();

        alert(ctrl.message);
    }

    MyController.prototype.onClickH1 = function () {
        var ctrl = $(this).controller();

        $('h1').text(ctrl.message);
    }

    Controller({
        name: 'my',
        ctor: MyController
    });
});
