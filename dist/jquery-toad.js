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
// 1.utils.js
// ========================================================================
//
// @parametters: 
// - $
// - $elm
// - $app
//
// @variables:
// - _NAMESPACES_
// - _APP_NAMESPACE_KEY_
// - _APP_
//
// @methods:
// - $require
// - $namespace
//
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


// ========================================================================
// 2.core.js
// ========================================================================
//
// @parametters: 
// - $
// - $elm
// - $app
//
// @variables:
// - _NAMESPACES_
// - _APP_NAMESPACE_KEY_
// - _APP_
//
// @methods:
// - $require
// - $namespace
//
$namespace(2, 'core', function (exports) {
    var controllers = $require('controllers')
    var components = $require('components')
    var utils = $require('utils')
    var config = $require('config')

    function _getController(ctrlName) {
        var private = $require('@').__internals__;
    }

    // function _listComponents() {
    //     var list = []

    //     for (var c in components)
    //         list.push({
    //             id: c,
    //             component: components[c]
    //         })

    //     return list
    // }

    // function _getComponent(cmpName) {
    //     if (utils.isString(cmpName)) {
    //         var cmp = components[cmpName + COMPONENT_SUFFIX]

    //         return utils.isFunction(cmp)
    //             ? cmp
    //             : function () { }
    //     }

    //     return function () { };
    // }

    // function _getConfig(key, defaultValue) {
    //     if (!utils.isString(key)) return

    //     var value = config,
    //         keys = key.split('.'),
    //         k = 0

    //     while (value && k < keys.length) {
    //         value = value[keys[k]];
    //         k++
    //     }

    //     return value || defaultValue
    // }

    // function _setConfig(key, newValue) {
    //     if (!utils.isString(key)) return

    //     var value = config,
    //         keys = key.split('.'),
    //         k = 0

    //     while (value && k < keys.length) {
    //         if (typeof value[keys[k]] !== 'object')
    //             value[keys[k]] = {}

    //         if (k + 1 !== keys.length)
    //             value = value[keys[k]]

    //         k++
    //     }

    //     return value[keys[--k]] = newValue
    // }

    // exports.controller = _registerAndGetController
    // exports.component = _getComponent
    // exports.listComponents = _listComponents
    // exports.getConfig = _getConfig
    // exports.setConfig = _setConfig
})


// ========================================================================
// 3.create-controller.js
// ========================================================================
//
// @parametters:
// - $
// - $elm
// - $app
//
// @variables:
// - _NAMESPACES_
// - _APP_NAMESPACE_KEY_
// - _APP_
//
// @methods:
// - $require
// - $namespace
//
$namespace(3, '@', function (exports) {
    var NAME_FIELD = 'name',
        CONSTRUCTOR_FIELD = 'ctor',
        EXPORT_NAME_FIELD = '$name';

    var controllers = [];
    var private = exports.__internals__ = exports.__internals__ || {};

    private.getController = _getController;

    /**
     * Cria uma controller
     *
     * @param {object} options - Opções da controller
     */
    exports.Controller = function (options) {
        options = ensureOptions(options);

        var controllerName = options[NAME_FIELD];

        if (controllers[controllerName]) {
            throw 'Controller ' + controllerName + ' already registered!';
        }

        var fnCtrl = options[CONSTRUCTOR_FIELD];

        fnCtrl[EXPORT_NAME_FIELD] = options[NAME_FIELD];

        controllers[controllerName] = fnCtrl;

        return fnCtrl;
    }

    function ensureOptions(options) {
        options = options || {};

        if (typeof options[NAME_FIELD] != 'string')
            throw invalidOptionMessage(NAME_FIELD, 'string');

        if (typeof options[CONSTRUCTOR_FIELD] != 'function')
            throw invalidOptionMessage(CONSTRUCTOR_FIELD, 'function');

        return options;
    }

    function invalidOptionMessage(fieldName, fieldType) {
        return 'Invalid @controller option#{name}. Must be a {type}.'
            .replace('{name}', fieldName)
            .replace('{type}', fieldType);
    }

    function _getController(controllerName) {
        if (typeof controllerName !== 'string' || controllerName == '') {
            throw 'Parameter controllerName is required.';
        }

        if (!controllers[controllerName]) {
            throw 'Controller ' + controllerName + ' not registered!';
        }

        return controllers[controllerName];
    }
})


// ========================================================================
// 4.create-component.js
// ========================================================================
//
// @parametters: 
// - $
// - $elm
// - $app
//
// @variables:
// - _NAMESPACES_
// - _APP_NAMESPACE_KEY_
// - _APP_
//
// @methods:
// - $require
// - $namespace
//
$namespace(4, '@', function (exports) {
    var NAME_FIELD = 'name',
        CONSTRUCTOR_FIELD = 'ctor',
        EXPORT_NAME_FIELD = '$name';

    var components = [];
    var private = exports.__internals__ = exports.__internals__ || {};

    private.getComponent = _getComponent;

    /**
     * Cria um componente
     * 
     * @param {object} options - Opções do componente
     */
    exports.Component = function (options) {
        options = ensureOptions(options);

        var componentName = options[NAME_FIELD];

        if (components[componentName]) {
            throw 'Component ' + componentName + ' already registered!';
        }

        var fnCmp = options[CONSTRUCTOR_FIELD];

        fnCmp[EXPORT_NAME_FIELD] = options[NAME_FIELD];

        components[componentName] = fnCmp;

        return fnCmp;
    }

    function ensureOptions(options) {
        options = options || {};

        if (typeof options[NAME_FIELD] != 'string')
            throw invalidOptionMessage(NAME_FIELD, 'string');

        if (typeof options[CONSTRUCTOR_FIELD] != 'function')
            throw invalidOptionMessage(CONSTRUCTOR_FIELD, 'function');

        return options;
    }

    function invalidOptionMessage(fieldName, fieldType) {
        return 'Invalid @component option#{name}. Must be a {type}.'
            .replace('{name}', fieldName)
            .replace('{type}', fieldType);
    }

    function _getComponent(componentName) {
        if (typeof componentName !== 'string' || componentName == '') {
            throw 'Parameter componentName is required.';
        }

        if (!components[componentName]) {
            throw 'Controller ' + componentName + ' not registered!';
        }

        return components[componentName];
    }
})


// ========================================================================
// 5.app.js
// ========================================================================
//
// @parametters:
// - $
// - $elm
// - $app
//
// @variables:
// - _NAMESPACES_
// - _APP_NAMESPACE_KEY_
// - _APP_
//
// @methods:
// - $require
// - $namespace
//
$namespace(5, 'app', function(exports) {
    var utils = $require('utils'),
        atPrivate = $require('@').__internals__;

    var CONTROLLER_IDENTIFIER = 'controller',
        CONTROLLER_DATA_IDENTIFIER = 'data-' + CONTROLLER_IDENTIFIER,
        CONTROLLER_SELECTOR = '[' + CONTROLLER_DATA_IDENTIFIER + ']',
        BIND_DATA_IDENTIFIER = 'data-events',
        BIND_SELECTOR = '[' + BIND_DATA_IDENTIFIER + ']',
        BIND_EVENT_COLLECTION_SPLITER = ',',
        BIND_EVENT_SPLITER = '->',
        BIND_ELEMENT_DATA_CTRL = '$ctrl';

    function _installControllers() {
        $(CONTROLLER_SELECTOR, $elm).each(function() {
            var el = $(this),
                name = el.attr(CONTROLLER_DATA_IDENTIFIER),
                ctor = atPrivate.getController(name),
                options = {};

            // Lê opções dos elementos [data-*] exceto [data-controller]
            for (var opt in el.context.dataset) {
                if (opt === CONTROLLER_IDENTIFIER)
                    continue;
                options[opt] = el.context.dataset[opt];
            }

            var ctrl = new ctor(el, options);

            _bind(el, ctrl)
            _components(el, ctrl);
        });
    }

    function _bind(ctrlElm, ctrl) {
        $(BIND_SELECTOR, ctrlElm).each(function() {
            var el = $(this),
                binder = el.attr(BIND_DATA_IDENTIFIER);

            if (!utils.isString(binder) || 0 > binder.indexOf(BIND_EVENT_SPLITER))
                return;

            binder = binder.split(BIND_EVENT_COLLECTION_SPLITER);

            if (!utils.isArray(binder) || binder.length < 1)
                return;

            for (var b in binder) {
                var binderExpr = $.trim(binder[b]),
                    bind = binderExpr.split(BIND_EVENT_SPLITER);

                if (!utils.isArray(bind) || bind.length < 2)
                    continue;

                var bEvent = bind[0],
                    bHandler = ctrl[bind[1]];

                if (!utils.isString(bEvent) || !utils.isFunction(bHandler))
                    return;

                el.on(bEvent, bHandler);

                // TODO: Criar component [ctrl] pra
                //el.ctrl(ctrl);
                el.data(BIND_ELEMENT_DATA_CTRL, ctrl);
            }
        });
    }

    function _components(el, ctrl) {
        console.group('_components');
        console.log('el:', el);
        console.log('ctrl:', ctrl);
        // core.listComponents().map(function(cmp) {
        //     if (!utils.isString(cmp.id)) return
        //     if (!utils.isFunction(cmp.component)) return
        //     if (!utils.isString(cmp.component[COMPONENT_SELECTOR_KEY])) return
        //     if (!utils.isString(cmp.component[COMPONENT_NAME_KEY])) return
        //     if (cmp.id.lastIndexOf(COMPONENT_SUFFIX) !== cmp.id.length - COMPONENT_SUFFIX.length) return
        //
        //     var jqSelector = cmp.component[COMPONENT_SELECTOR_KEY]
        //     var jqFn = cmp.component[COMPONENT_NAME_KEY]
        //
        //     $(jqSelector, el)[jqFn](el)
        // })
        console.groupEnd();
    }

    function _installToad() {
        //setTitle()
        _installControllers();
    }

    $($elm).ready(_installToad);
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
