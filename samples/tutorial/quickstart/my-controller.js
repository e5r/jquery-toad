MYAPP.namespace('controllers', function () {
    var register = MYAPP.import('@');

    function MyController() {
        var message = 'Olá mundo jQuery TOAD!';

        this.onClickMessage = function () {
            alert(message);
        }

        this.onClickH1 = function () {
            $('[data-id="message"]').text(message);
        }
    }

    register.Controller({
        name: 'my',
        ctor: MyController
    });
})
