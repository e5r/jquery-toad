MYAPP.namespace('myapp', function () {
    var register = MYAPP.require('@').Controller;

    function MyController() {
        var message = 'Olá mundo jQuery TOAD!';

        this.onClickMessage = function () {
            alert(message);
        }

        this.onClickH1 = function () {
            $('h1').text(message);
        }
    }
    
    register({
        name: 'my',
        ctor: MyController
    });
});
