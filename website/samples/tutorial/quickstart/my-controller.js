MYAPP.namespace('controllers', function () {
    "use strict";

    var register = MYAPP.require('@registerController');

    function MyController() {
        var message = 'Olá mundo jQuery TOAD!';

        this.onClickMessage = function () {
            alert(message);
        }

        this.onClickH1 = function () {
            $('[data-id="message"]').text(message);
        }
    }

    register('my', MyController);
})
