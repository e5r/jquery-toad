
var _NAMESPACES_ = [];
var _APP_NAMESPACE_KEY_ = '_app_namespace_';

// Inicializa namespace exclusivo para aplicação do usuário
var _APP_ = $toad[_APP_NAMESPACE_KEY_] = {};

var $require = function (_) {
    return $toad[_] = $toad[_] || {};
};

var $namespace = function (_, __, ___) {
    _NAMESPACES_.push({
        idx: _,
        cb: function () {
            ___(($toad[__] = $toad[__] || {}));
        }
    });
};

$toad.$jq = $;

/**
 * @code
{__TOAD__}.namespace('utils', function(exports) {
    var myData = {}
    var myFunction = function(){}

    exports.data = myData
    exports.func = myFunction
})
 */
$toad.namespace = function (_, __) {
    __((_APP_[_] = _APP_[_] || {}));
}

/**
 * @code
var utils = {__TOAD__}.require('utils')

utils.func(utils.data)
 */
$toad.require = function (_) {
    var require = {};

    var exportGlobals = [
        '@',
        'core',
        'utils'
    ];

    // Objetos globais exceto o namespace da aplicação
    if (exportGlobals.indexOf(_) > -1) {
        for (var k in $toad[_]) {
            require[k] = $toad[_][k];
        }
    }

    // Objetos da aplicação
    for (var k in _APP_[_]) {
        require[k] = _APP_[_][k];
    }

    return require;
}
