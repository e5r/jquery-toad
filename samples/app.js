+ function($, App) {;

    function require(_) {
        return App[_] = App[_] || {}
    }

    var core = require('core')

    core.setConfig('app.title', 'Minha aplicação jQuery!')

}(jQuery, window.ClientApp = window.ClientApp || {});
