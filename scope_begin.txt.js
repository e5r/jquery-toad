
(function ($, $elm, $app, $require, $namespace) {

    var _APP_NAMESPACE_KEY_ = '_app_namespace_';

    // Inicializa namespace exclusivo para aplicação do usuário
    var _APP_ = window[__TOAD__][_APP_NAMESPACE_KEY_] = {};

    $app.$jq = $;

    /**
     * @code
    $app.namespace('utils', function(exports) {
        var myData = {}
        var myFunction = function(){}
    
        exports.data = myData
        exports.func = myFunction
    })
     */
    $app.namespace = function (_, __) {
        __((_APP_[_] = _APP_[_] || {}));
    }

    /**
     * @code
    var utils = app.require('utils')
    
    utils.func(utils.data)
     */
    $app.require = function (_) {
        var require = {};

        // Objetos globais exceto o namespace da aplicação
        for (var k in window[__TOAD__][_]) {
            // TODO: Ignorar $jq, namespace, require também
            if (k === _APP_NAMESPACE_KEY_)
                continue;
            require[k] = window[__TOAD__][_][k];
        }

        // Objetos da aplicação
        for (var k in _APP_[_]) {
            require[k] = _APP_[_][k];
        }

        return require;
    }
