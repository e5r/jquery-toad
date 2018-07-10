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
     * @param {object} options - Opções do controlador
     */
    exports.registerController = function (options) {
        options = ensureOptions(options);

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

    function _getViewElement(elType, selector) {
        var view = this[CONTROLLER_VIEW_FIELD_PRIVATE],
            VIEW_BY_ID = $require('@').consts.VIEW_BY_ID;

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
