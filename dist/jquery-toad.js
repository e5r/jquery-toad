/*!
 * jquery-toad v1.0.0
 * jQuery TOAD (The Old And Dear) - O velho e querido jQuery (https://github.com/e5r/jquery-toad#readme)
 * Copyright (c) E5R Development Team. All rights reserved.
 * Licensed under the Apache-2.0 License. More license information in LICENSE.
 */

/* jQuery 1.12.4 é pré-requisito */
if (typeof jQuery !== 'function') {
    throw new Error('jQuery TOAD\'s requires jQuery!')
}

(function($) {
    'use strict';
    var versionAll = $.fn.jquery.split(' ')[0].split('.'),
        vMajor = versionAll[0],
        vMinor = versionAll[1],
        vPath = versionAll[2]

    if (vMajor > 1) return
    if (vMajor == 1 && vMinor > 12) return
    if (vMajor == 1 && vMinor == 12 && vPath >= 4) return

    throw new Error('jQuery TOAD\'s requires jQuery version 1.12.4 or higher!')
})(jQuery);

/* É necessário definir um valor para __TOAD__ explicitamente.
   Esse será o nome do objeto de aplicação disponível em window. */
if (typeof __TOAD__ !== 'string') {
    throw new Error('You have not set a value for __TOAD__!')
}

window[__TOAD__] = window[__TOAD__] || {};

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

// ========================================================================
// aaa.js
// ========================================================================
$namespace('aaa', function(exports) {
    exports.A = 'a';
})


// ========================================================================
// bbb.js
// ========================================================================
$namespace('bbb', function(exports) {
    exports.B = 'b';
})

})(
    /* $ */
    jQuery,

    /* $elm */
    document,

    /* $app */
    window[__TOAD__],

    /* $require */
    function require(_) {
        return window[__TOAD__][_] = window[__TOAD__][_] || {};
    },

    /* $namespace */
    function namespace(_, __) {
        __((window[__TOAD__][_] = window[__TOAD__][_] || {}));
    }
);
