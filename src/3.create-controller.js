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
