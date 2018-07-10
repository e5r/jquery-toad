
var _NAMESPACES_ = [];
var _APP_NAMESPACE_KEY_ = '_app_namespace_';

// Inicializa namespace exclusivo para aplicação do usuário
var _APP_ = $toad[_APP_NAMESPACE_KEY_] = {};

var $require = function (namespace) {
    return $toad[namespace] = $toad[namespace] || {};
};

var $namespace = function (order, namespace, factory) {
    _NAMESPACES_.push({
        idx: order,
        cb: function () {
            factory(($toad[namespace] = $toad[namespace] || {}));
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
$toad.namespace = function (namespace, factory) {
    if (typeof namespace !== 'string') {
        throw 'Invalid namespace.';
    }

    // TODO: Mudar para abordagem semelhante a  $namespace
    factory((_APP_[namespace] = _APP_[namespace] || {}));
}

/**
 * @code
var utils = {__TOAD__}.require('utils')

utils.func(utils.data)
 */
$toad.require = function (namespace) {
    if (typeof namespace !== 'string' || $.trim(namespace).length < 1) {
        throw 'Invalid namespace to import.';
    }

    var required = {},
        exportGlobals = [
            'core',
            'utils'
        ],
        atIgnore = [
            '__internals__'
        ];

    if (namespace.charAt(0) === '@') {
        var parts = namespace.split('@');

        if (parts.length !== 2 || atIgnore.indexOf(parts[1]) >= 0)
            return;

        return $toad['@'][parts[1]];
    }

    // Objetos globais exceto o namespace da aplicação
    if (exportGlobals.indexOf(namespace) > -1) {
        for (var k in $toad[namespace]) {
            required[k] = $toad[namespace][k];
        }
    }

    // Objetos da aplicação. Esses sobrescrevem os globais se existirem
    for (var k in _APP_[namespace]) {
        required[k] = _APP_[namespace][k];
    }

    return required;
}

/**
 * @code
var MY_CONST = {__TOAD__}.constant('MY_CONST', VALUE_FOR_MY_CONST)
 */
$toad.constant = function (constName, constValue) {
    var internals = $require('@').__internals__;

    internals.setConstant(constName, constValue);
}
