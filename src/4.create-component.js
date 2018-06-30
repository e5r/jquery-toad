$namespace(4, '@', function(exports) {
    var NAME_FIELD = 'name',
        CONSTRUCTOR_FIELD = 'ctor',
        SELECTOR_FIELD = 'selector',
        EXPORT_NAME_FIELD = '$name',
        EXPORT_SELECTOR_FIELD = '$selector';

    var components = [];
    var private = exports.__internals__ = exports.__internals__ || {};

    private.getComponent = _getComponent;
    private.listComponents = _listComponents;

    /**
     * Cria um componente
     *
     * @param {object} options - Opções do componente
     */
    exports.Component = function(options) {
        options = ensureOptions(options);

        var componentName = options[NAME_FIELD];

        if (components[componentName]) {
            throw 'Component ' + componentName + ' already registered!';
        }

        var fnCmp = options[CONSTRUCTOR_FIELD];

        fnCmp[EXPORT_NAME_FIELD] = options[NAME_FIELD];
        fnCmp[EXPORT_SELECTOR_FIELD] = options[SELECTOR_FIELD];

        components[componentName] = fnCmp;

        return fnCmp;
    }

    function ensureOptions(options) {
        options = options || {};

        if (typeof options[NAME_FIELD] != 'string')
            throw invalidOptionMessage(NAME_FIELD, 'string');

        if (typeof options[CONSTRUCTOR_FIELD] != 'function')
            throw invalidOptionMessage(CONSTRUCTOR_FIELD, 'function');

        if (typeof options[SELECTOR_FIELD] != 'string')
            throw invalidOptionMessage(SELECTOR_FIELD, 'string');

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
