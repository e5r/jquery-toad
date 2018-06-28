/*!
 * jquery-toad v1.0.0
 * jQuery TOAD (The Old And Dear) - O velho e querido jQuery (https://github.com/e5r/jquery-toad#readme)
 * Copyright (c) E5R Development Team. All rights reserved.
 * Licensed under the Apache-2.0 License. More license information in LICENSE.
 */

/* jQuery 1.12.4 é pré-requisito */
if (typeof jQuery !== 'function') {
    throw new Error('jQuery TOAD\'s requires jQuery!');
}

(function($) {
    'use strict';
    var versionAll = $.fn.jquery.split(' ')[0].split('.'),
        vMajor = versionAll[0],
        vMinor = versionAll[1],
        vPath = versionAll[2];

    if (vMajor > 1) return;
    if (vMajor == 1 && vMinor > 12) return;
    if (vMajor == 1 && vMinor == 12 && vPath >= 4) return;

    throw new Error('jQuery TOAD\'s requires jQuery version 1.12.4 or higher!');
})(jQuery);

/* É necessário definir um valor para __TOAD__ explicitamente.
   Esse será o nome do objeto de aplicação disponível em window. */
if (typeof __TOAD__ !== 'string') {
    throw new Error('You have not set a value for __TOAD__!');
}

window[__TOAD__] = window[__TOAD__] || {};

(function ($, $elm, $app) {

var _NAMESPACES_ = [];
var _APP_NAMESPACE_KEY_ = '_app_namespace_';

// Inicializa namespace exclusivo para aplicação do usuário
var _APP_ = $app[_APP_NAMESPACE_KEY_] = {};

var $require = function (_) {
    return $app[_] = $app[_] || {};
};

var $namespace = function (_, __, ___) {
    _NAMESPACES_.push({
        idx: _,
        cb: function() {
            ___(($app[__] = $app[__] || {}));
        }
    });
};

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
    for (var k in $app[_]) {
        // TODO: Ignorar $jq, namespace, require também
        if (k === _APP_NAMESPACE_KEY_)
            continue;
        require[k] = $app[_][k];
    }

    // Objetos da aplicação
    for (var k in _APP_[_]) {
        require[k] = _APP_[_][k];
    }

    return require;
}

// ========================================================================
// bbb.js
// ========================================================================
$namespace(2, 'bbb', function (exports) {
    exports.B = 'b';
})


// ========================================================================
// utils.js
// ========================================================================
$namespace(1, 'utils', function (exports) {

    /**
     * Verifica se referencia uma string
     * 
     * @param {any} value - Instância a verificar
     */
    exports.isString = function (value) {
        return typeof value === 'string';
    }

    /**
     * Verifica se referencia uma função
     * 
     * @param {any} value - Instância a verificar
     */
    exports.isFunction = function (value) {
        return typeof value === 'function';
    }

    /**
     * Verifica se referencia uma indefinição
     * 
     * @param {any} value - Instância a verificar
     */
    exports.isUndefined = function (value) {
        return typeof value === 'undefined';
    }

    /**
     * Verifica se referencia um objeto
     * 
     * @param {any} value - Instância a verificar
     */
    exports.isObject = function (value) {
        // http://jsperf.com/isobject4
        return value !== null && typeof value === 'object';
    }

    /**
     * Verifica se referencia um número
     * 
     * @param {any} value - Instância a verificar
     */
    exports.isNumber = function (value) {
        return typeof value === 'number';
    }

    /**
     * Verifica se referencia um array
     * 
     * @param {any} value - Instância a verificar
     */
    exports.isArray = function (value) {
        return Array.isArray(value) || value instanceof Array;
    }
})

// Inicializa os namespaces na ordem especificada
_NAMESPACES_
    .sort(function (a, b) { 
        return a.idx - b.idx; 
    })
    .map(function (n) { 
        n.cb(); 
    });

}) (
    /* $ */
    jQuery,

    /* $elm */
    document,

    /* $app */
    window[__TOAD__]
);
