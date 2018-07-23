$namespace(3, '@', function (exports) {
    var utils = $require('utils');

    var NAME_FIELD = 'name',
        CONSTRUCTOR_FIELD = 'ctor',
        EXPORT_NAME_FIELD = '$name',
        CONTROLLER_VIEW_FIELD_PRIVATE = '__view__',
        CONTROLLER_VIEW_FIELD = '$view',
        CONTROLLER_MODEL_FIELD_PRIVATE = '__model__',
        CONTROLLER_MODEL_FIELD = '$model',
        CONTROLLER_TRIGGER_FIELD_PRIVATE = '__triggers__',
        CONTROLLER_TRIGGER_FIELD = '$onUpdateModel';

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
            throw new Error('Controller ' + controllerName + ' already registered!');
        }

        var fnCtrl = options[CONSTRUCTOR_FIELD];

        fnCtrl[EXPORT_NAME_FIELD] = options[NAME_FIELD];
        controllers[controllerName] = fnCtrl;

        fnCtrl.prototype[CONTROLLER_VIEW_FIELD] = _getViewElement;
        fnCtrl.prototype[CONTROLLER_MODEL_FIELD] = _manageModel;
        fnCtrl.prototype[CONTROLLER_TRIGGER_FIELD] = _manageTriggers;

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
            throw new Error('Parameter controllerName is required.');
        }

        if (!controllers[controllerName]) {
            throw new Error('Controller ' + controllerName + ' not registered!');
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
            throw new Error('Invalid view selector.');

        else switch (elType) {
            case VIEW_BY_ID:
                selector = '[data-id="{id}"]'.replace('{id}', selector);
                break;

            default:
                throw new Error('Invalid view type "' + elType + '".');
        }

        return $(selector, view);
    }

    /**
     * Gerencia o modelo
     */
    function _manageModel() {
        var clonerCurrent = new internals.PlainObjectCloner(this[CONTROLLER_MODEL_FIELD_PRIVATE]);

        // this.$model(): Get a full model
        if (!arguments.length) {
            return clonerCurrent.cloneObject();
        }

        // this.$model({ object }): Set a full model
        // this.$model({ jQueryEl }, { object }): Set a full model from @constructor
        if ((arguments.length === 1 && utils.isObject(arguments[0])) ||
            (arguments.length === 2 && arguments[0] instanceof $
                && utils.isObject(arguments[1]))) {

            var _modelArg = arguments[0];

            if (_modelArg instanceof $) {
                _modelArg = arguments[1];
                this[CONTROLLER_VIEW_FIELD_PRIVATE] = arguments[0];
            }

            var clonerNew = new internals.PlainObjectCloner(_modelArg),
                newState = clonerNew.cloneObject();

            this[CONTROLLER_MODEL_FIELD_PRIVATE] = newState;

            _callTriggers(clonerCurrent.cloneObject(), newState, null, this);

            return;
        }

        // this.$model('string'): Get path of model
        if (arguments.length === 1
            && utils.isString(arguments[0])) {

            var path = $.trim(arguments[0]),
                stateFull = clonerCurrent.cloneObject();

            if (path.length === 0)
                return stateFull;

            return utils.getObjectItemByPath(stateFull, path)
        }

        // this.$model('string', { object }): Get path of model
        if (arguments.length === 2
            && utils.isString(arguments[0])
            && utils.isObject(arguments[1])) {

            var path = arguments[0],
                stateFull = clonerCurrent.cloneObject(),
                clonerNew = new internals.PlainObjectCloner(arguments[1]),
                newState = clonerNew.cloneObject();

            utils.setObjectItemByPath(stateFull, path, newState);

            this[CONTROLLER_MODEL_FIELD_PRIVATE] = stateFull;

            _callTriggers(clonerCurrent.cloneObject(), stateFull, path, this);

            return;
        }

        throw new Error('Call with invalid parameters for ' + CONTROLLER_MODEL_FIELD + '!');
    }

    function _attachTrigger(ctrl, path, trigger) {
        if (!utils.isArray(ctrl[CONTROLLER_TRIGGER_FIELD_PRIVATE]))
            ctrl[CONTROLLER_TRIGGER_FIELD_PRIVATE] = [];

        var triggers = ctrl[CONTROLLER_TRIGGER_FIELD_PRIVATE];

        for (var t in triggers) {
            var trg = triggers[t];

            if (trg.path === path && trg.trigger === trigger)
                return;
        }

        triggers.push({ path: path, trigger: trigger });
    }

    function _manageTriggers() {
        if (arguments.length === 1
            && utils.isFunction(arguments[0])) {

            return _attachTrigger(this, null, arguments[0]);
        }

        if (arguments.length === 2
            && utils.isString(arguments[0])
            && utils.isFunction(arguments[1])) {

            return _attachTrigger(this, arguments[0], arguments[1]);
        }

        throw new Error('Call with invalid parameters for ' + CONTROLLER_TRIGGER_FIELD + '!');
    }

    function _callTriggers(oldState, newState, modelPath, controller) {
        var eligibleTriggers = [],
            path = (modelPath || ''),
            pathParts = path === '' ? [] : path.split('.');

        for (var idx = pathParts.length - 1; idx >= 0; idx--) {
            var pathPartsBegin = pathParts.splice(0, idx + 1);
            pathParts = pathPartsBegin.concat(pathParts);

            eligibleTriggers.push(pathPartsBegin.join('.'));
        }

        eligibleTriggers.push('');

        var triggers = controller[CONTROLLER_TRIGGER_FIELD_PRIVATE] || [],
            triggerFilter = function (prefix) {
                return $.grep(triggers, function (item) {
                    return (item.path || '') === prefix;
                });
            };


        $.each(eligibleTriggers, function (_, itemPath) {
            $.each(triggerFilter(itemPath), function (_, tgr) {
                if (!utils.isFunction(tgr.trigger))
                    return;

                var _oldState = oldState,
                    _newState = newState;

                if (tgr.path) {
                    _oldState = utils.getObjectItemByPath(_oldState, tgr.path);
                    _newState = utils.getObjectItemByPath(_newState, tgr.path);
                }

                // function(oldState, newState, modelPath, controller) { }
                tgr.trigger.call(
                    null, /* this -> null */
                    _oldState,
                    _newState,
                    modelPath,
                    controller);
            });
        });
    }
})
