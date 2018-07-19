/*!
 * jquery-toad v1.0.31
 * jQuery TOAD - O velho e querido jQuery (https://e5r.github.io/jquery-toad)
 * Copyright (c) Erlimar Silva Campos. All rights reserved.
 * Licensed under the Apache-2.0 License. More license information in LICENSE.
 */

/* jQuery 1.12.4 é pré-requisito */
if (typeof jQuery !== 'function') {
    throw new Error('jQuery TOAD\'s requires jQuery!');
}

/* DOM - Document Object Model é pré-requisito */
if (typeof window !== 'object' || typeof window.document !== 'object') {
    throw new Error("jQuery TOAD\'s requires a DOM (Document Object Model)!");
}

(function ($) {
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

(function ($, $elm, $toad) { "use strict";

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
$toad.namespace = function (name, factory) {
    if (typeof name !== 'string') {
        throw 'Invalid namespace.';
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

// ========================================================================
// app.js
// ========================================================================
$namespace(9, 'core', function (exports) {
    var utils = $require('utils'),
        internals = $require('@').__internals__;

    var CONTROLLER_IDENTIFIER = 'controller',
        CONTROLLER_DATA_IDENTIFIER = 'data-' + CONTROLLER_IDENTIFIER,
        CONTROLLER_SELECTOR = '[' + CONTROLLER_DATA_IDENTIFIER + ']',
        CONTROLLER_ELEMENT_DATA = '$ctrl',
        CONTROLLER_VIEW_FIELD = '__view__',
        CONTROLLER_OPTIONS_FIELD = '$options',

        COMPONENT_SELECTOR_KEY = '$jqSelector',
        COMPONENT_NAME_KEY = '$name',

        BIND_DATA_IDENTIFIER = 'data-events',
        BIND_SELECTOR = '[' + BIND_DATA_IDENTIFIER + ']',
        BIND_EVENT_COLLECTION_SPLITER = ',',
        BIND_EVENT_SPLITER = '=>';

    function _installControllers() {
        $(CONTROLLER_SELECTOR, $elm).each(function () {
            var el = $(this),
                name = el.attr(CONTROLLER_DATA_IDENTIFIER),
                ctor = internals.getController(name),
                options = {},
                dataset = el.data();

            // Lê opções dos elementos [data-*] exceto [data-controller]
            for (var opt in dataset) {
                if (opt === CONTROLLER_IDENTIFIER)
                    continue;
                options[opt] = dataset[opt];
            }

            var ctrl = new ctor(el, options);

            el.data(CONTROLLER_ELEMENT_DATA, ctrl);

            ctrl[CONTROLLER_VIEW_FIELD] = el;
            ctrl[CONTROLLER_OPTIONS_FIELD] = options;

            _setupEvents(el, ctrl)
            _setupComponents(el, ctrl);
            _setupModel(el, ctrl);
        });
    }

    function _setupEvents(ctrlElm, ctrl) {
        $(BIND_SELECTOR, ctrlElm).each(function () {
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

                el.data(CONTROLLER_ELEMENT_DATA, ctrl);
            }
        });
    }

    function _setupComponents(ctrlElm, ctrl) {
        var cmpList = internals.listComponents();

        for (var c in cmpList) {
            var cmp = cmpList[c];

            if (!utils.isString(cmp.id)) return;
            if (!utils.isFunction(cmp.component)) return;
            if (!utils.isString(cmp.component[COMPONENT_SELECTOR_KEY])) return;
            if (!utils.isString(cmp.component[COMPONENT_NAME_KEY])) return;

            var jqSelector = cmp.component[COMPONENT_SELECTOR_KEY];
            var jqFn = cmp.component[COMPONENT_NAME_KEY];

            $(jqSelector, ctrlElm)[jqFn](ctrl);
        };
    }

    function _setupModel(el, ctrl) {
        console.info('TODO: Implementar _setupModel', ctrl);
    }

    function _installToad() {
        _installControllers();
    }

    $($elm).ready(_installToad);
})


// ========================================================================
// config.js
// ========================================================================
$namespace(1, '@', function (exports) {
    var CONFIG = {},
        utils = $require('utils');

    function _getConfig(key, defaultValue) {
        if (!utils.isString(key))
            return;

        var value = CONFIG,
            keys = key.split('.'),
            k = 0;

        while (value && k < keys.length) {
            value = value[keys[k]];
            k++;
        }

        return value || defaultValue;
    }

    function _setConfig(key, newValue) {
        if (!utils.isString(key))
            return;

        var value = CONFIG,
            keys = key.split('.'),
            k = 0;

        while (value && k < keys.length) {
            if (typeof value[keys[k]] !== 'object')
                value[keys[k]] = {};

            if (k + 1 !== keys.length)
                value = value[keys[k]];

            k++;
        }

        return value[keys[--k]] = newValue;
    }

    exports.config = {
        get: _getConfig,
        set: _setConfig
    };
})


// ========================================================================
// constants.js
// ========================================================================
$namespace(1, '@', function (exports) {
    var constants = {},
        internals = exports.__internals__ = exports.__internals__ || {};

    internals.setConstant = _setConstant;

    /**
     * Constantes
     */
    exports.constants = constants;

    /**
     * Define uma constante global no sistema
     * 
     * @param {string} constName - Nome da constante
     * @param {any} constValue - Valor da constante
     */
    function _setConstant(constName, constValue) {
        if (typeof constName !== 'string')
            throw 'Invalid constName "' + constName + '"';

        if (!constValue)
            throw 'constValue is required!';

        if (typeof constants[constName] !== 'undefined')
            throw 'Constant "' + constName + '" already exists!';

        // Quando [Object.defineProperty] não está disponível (ex: IE8 <) simplesmente
        // guardamos um valor para uso, porém sem nenhuma proteção de imutabilidade
        //
        // OBS: Apesar de usarmos [Object.defineProperty] para definir a constante,
        //      testamos [Object.defineProperties] porque o IE8 implementa [Object.defineProperty]
        //      mas somente para objetos DOM. Com suporte completo no IE9 junto com a
        //      implementação de [Object.defineProperties]
        if (typeof Object.defineProperties !== 'function') {
            console.warn('WARNING!', 'Object.defineProperty is not supported!');
            return constants[constName] = constValue;
        }

        return Object.defineProperty(constants, constName, {
            // TODO: Mudar para [false], isso irá impedir o uso de [for(var c in constants)]
            //       porém será necessário fornecer algum meio para listar as constantes
            enumerable: true,

            configurable: false,
            writable: false,

            value: constValue
        })[constName];
    }
})


// ========================================================================
// controller-component.js
// ========================================================================
$namespace(2, 'core', function (exports) {
    var CONTROLLER_ELEMENT_DATA = '$ctrl';

    exports.ControllerComponent = $.fn['controller'] = function ControllerComponent() {
        return $(this).data(CONTROLLER_ELEMENT_DATA);
    }
})


// ========================================================================
// register-component.js
// ========================================================================
$namespace(3, '@', function (exports) {
    var NAME_FIELD = 'name',
        COMPONENT_IDENTIFIER = 'gui',
        CONSTRUCTOR_FIELD = 'ctor',
        EXPORT_NAME_FIELD = '$name',
        EXPORT_SELECTOR_FIELD = '$jqSelector';

    var components = [];
    var internals = exports.__internals__ = exports.__internals__ || {};

    internals.getComponent = _getComponent;
    internals.listComponents = _listComponents;

    /**
     * Registra um componente
     *
     * @param {string} name - Nome do componente
     * @param {function} ctor - Função construtora do componente
     */
    exports.registerComponent = function (name, ctor) {
        var options = ensureOptions({ name: name, ctor: ctor });

        var componentName = options[NAME_FIELD],
            componentJqName = 'gui-{name}'.replace('{name}', componentName),
            selector = '[data-gui="{name}"]'.replace('{name}', componentName);

        if (components[componentName]) {
            throw 'Component ' + componentName + ' already registered!';
        }

        var fnCmp = function (ctrl) {
            return this.each(function (_, htmlEl) {
                var dataOptions = {},
                    el = $(htmlEl),
                    dataset = el.data();

                // Lê opções dos elementos [data-*] exceto [data-gui]
                for (var opt in dataset) {
                    if (opt === COMPONENT_IDENTIFIER)
                        continue;
                    dataOptions[opt] = dataset[opt];
                }

                // [apply] ao invés de [bind] por compatibilidade ao IE8
                return options[CONSTRUCTOR_FIELD].apply(this, [ctrl, dataOptions])
            });
        };

        fnCmp[EXPORT_NAME_FIELD] = componentJqName;
        fnCmp[EXPORT_SELECTOR_FIELD] = selector;

        components[componentName] = fnCmp;

        $.fn[componentJqName] = fnCmp;

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
        return 'Invalid @component.{name}. Must be a {type}.'
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

    function _listComponents() {
        var list = []

        for (var c in components)
            list.push({
                id: c,
                component: components[c]
            })

        return list
    }
})


// ========================================================================
// register-controller.js
// ========================================================================
$namespace(3, '@', function (exports) {
    var NAME_FIELD = 'name',
        CONSTRUCTOR_FIELD = 'ctor',
        EXPORT_NAME_FIELD = '$name',
        CONTROLLER_VIEW_FIELD_PRIVATE = '__view__',
        CONTROLLER_VIEW_FIELD = '$view';

    var controllers = [];
    var internals = exports.__internals__ = exports.__internals__ || {};

    internals.getController = _getController;

    // Registra constantes públicas
    internals.setConstant('VIEW_BY_ID', 1);

    /**
     * Registra um controlador
     *
     * @param {string} name - Nome do controlador
     * @param {function} ctor - Função construtora do controlador
     */
    exports.registerController = function (name, ctor) {
        var options = ensureOptions({ name: name, ctor: ctor });

        var controllerName = options[NAME_FIELD];

        if (controllers[controllerName]) {
            throw 'Controller ' + controllerName + ' already registered!';
        }

        var fnCtrl = options[CONSTRUCTOR_FIELD];

        fnCtrl[EXPORT_NAME_FIELD] = options[NAME_FIELD];
        fnCtrl.prototype[CONTROLLER_VIEW_FIELD] = _getViewElement;

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
        return 'Invalid @controller.{name}. Must be a {type}.'
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

    function _getViewElement(elType, selector) {
        var view = this[CONTROLLER_VIEW_FIELD_PRIVATE],
            VIEW_BY_ID = $require('@').constants.VIEW_BY_ID;

        if (!(view instanceof $))
            return;

        if (typeof elType === 'string' && arguments.length === 1)
            selector = elType;

        else if (typeof selector !== 'string')
            throw 'Invalid view selector.';

        else switch (elType) {
            case VIEW_BY_ID:
                selector = '[data-id="{id}"]'.replace('{id}', selector);
                break;

            default:
                throw 'Invalid view type "' + elType + '".';
        }

        return $(selector, view);
    }
})


// ========================================================================
// utils.js
// ========================================================================
$namespace(0, 'utils', function (exports) {

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
        return value instanceof Array
            || Object.prototype.toString.call(value) === "[object Array]";
    }

    /**
     * Recupera o titulo do elemento principal (document)
     */
    exports.getPageTitle = function (newTitle) {
        return $($elm).attr('title');
    }

    /**
     * Altera o titulo do elemento principal (document)
     * 
     * @param {string} newTitle - Novo título
     */
    exports.setPageTitle = function (title) {
        $($elm).attr('title', title);
    }
})

// Inicializa os namespaces na ordem especificada
_NAMESPACES_.sort(function (a, b) {
    return a.idx > b.idx;
});

// Não usamos (map) para compatibilidade com IE8
for (var n in _NAMESPACES_) {
    _NAMESPACES_[n].cb();
}

}) (
    /* $ */
    jQuery,

    /* $elm */
    window.document,

    /* $toad */
    window[__TOAD__]
);
