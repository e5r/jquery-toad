$namespace(3, '@', function (exports) {
    var utils = $require('utils');

    var NAME_FIELD = 'name',
        CONSTRUCTOR_FIELD = 'ctor',
        EXPORT_NAME_FIELD = '$name',
        CONTROLLER_VIEW_FIELD_PRIVATE = '__view__',
        CONTROLLER_VIEW_FIELD = '$view',
        CONTROLLER_MODEL_FIELD_PRIVATE = '__model__',
        CONTROLLER_MODEL_FIELD = '$model',
        CONTROLLER_ONUPDATEMODEL_FIELD_PRIVATE = '__triggers__',
        CONTROLLER_ONUPDATEMODEL_FIELD = '$onUpdateModel';

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
        controllers[controllerName] = fnCtrl;

        fnCtrl.prototype[CONTROLLER_VIEW_FIELD] = _getViewElement;
        fnCtrl.prototype[CONTROLLER_MODEL_FIELD] = _manageModel;
        fnCtrl.prototype[CONTROLLER_ONUPDATEMODEL_FIELD] = _onUpdateModel;

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

    /**
     * Retorna uma coleção de elementos dentro do escopo da controller
     * 
     * @param {DOM} elType - Elemento DOM
     * @param {string} selector - jQuery selector
     */
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

    /**
     * Gerencia o modelo
     */
    function _manageModel() {
        var model = this[CONTROLLER_MODEL_FIELD_PRIVATE];

        // this.$model();
        // get full model
        if (!arguments.length) {
            return $.extend({}, model);
        }

        // this.$model({ object });
        // set full model
        if (arguments.length === 1 && utils.isObject(arguments[0])) {
            var modelOld = $.extend({}, this[CONTROLLER_MODEL_FIELD_PRIVATE]),
                modelNew = arguments[0];

            // TODO: Call $onUpdateModel

            this[CONTROLLER_MODEL_FIELD_PRIVATE] = $.extend({}, arguments[0]);
        }
        
        /*
        this.$model('string');              // get path of model
        this.$model('string', { object });  // set path of model
        */
    }

    function _onUpdateModel() {
        var onUpdateList = this[CONTROLLER_ONUPDATEMODEL_FIELD_PRIVATE];
    }
})
