
/* jQuery 1.12.4 é pré-requisito */
(function () {
    'use strict';
    
    if (typeof $ !== 'function') {
        throw new Error('jQuery TOAD\'s requires jQuery!');
    }
    
    var versionAll = $.fn.jquery.split(' ')[0].split('.'),
        vMajor = versionAll[0],
        vMinor = versionAll[1],
        vPath = versionAll[2];

    if (vMajor > 1) return;
    if (vMajor == 1 && vMinor > 12) return;
    if (vMajor == 1 && vMinor == 12 && vPath >= 4) return;

    throw new Error('jQuery TOAD\'s requires jQuery version 1.12.4 or higher!');
})();

var $toad = {
    '$jq': $
};

var document = window.document;
var _NAMESPACES_ = [];
var _APP_NAMESPACE_KEY_ = '_app_namespace_';

// Inicializa namespace exclusivo para aplicação do usuário
var _APP_ = $toad[_APP_NAMESPACE_KEY_] = {};

var $require = function (name) {
    return $toad[name] = $toad[name] || {};
};

var $namespace = function (order, name, factory) {
    _NAMESPACES_.push({
        idx: order,
        cb: function () {
            factory(($toad[name] = $toad[name] || {}));
        }
    });
};

/**
 * @code
{__TOAD__}.namespace('utils', function(exports) {
    var myData = {}
    var myFunction = function(){}

    exports.data = myData
    exports.func = myFunction
})
 */
$toad.namespace = function (name, factory) {
    if (typeof name !== 'string') {
        throw new Error('Invalid namespace.');
    }

    // TODO: Mudar para abordagem semelhante a  $namespace
    factory((_APP_[name] = _APP_[name] || {}));
}

/**
 * @code
var utils = {__TOAD__}.require('utils')

utils.func(utils.data)
 */
$toad.require = function (name) {
    if (typeof name !== 'string' || $.trim(name).length < 1) {
        throw new Error('Invalid namespace to import.');
    }

    var required = {},
        exportGlobals = [
            'core',
            'utils'
        ],
        atIgnore = [
            '__internals__'
        ];

    if (name.charAt(0) === '@') {
        var parts = name.split('@');

        if (parts.length !== 2 || $.inArray(parts[1], atIgnore) >= 0)
            return;

        return $toad['@'][parts[1]];
    }

    // Objetos globais exceto o namespace da aplicação
    if ($.inArray(name, exportGlobals) > -1) {
        for (var k in $toad[name]) {
            required[k] = $toad[name][k];
        }
    }

    // Objetos da aplicação. Esses sobrescrevem os globais se existirem
    for (var k in _APP_[name]) {
        required[k] = _APP_[name][k];
    }

    return required;
}

/**
 * @code
var MY_CONST = {__TOAD__}.constant('MY_CONST', VALUE_FOR_MY_CONST)
 */
$toad.constant = function (constName, constValue) {
    var internals = $require('@').__internals__;

    return internals.setConstant(constName, constValue);
}
