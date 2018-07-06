$namespace(4, '@', function (exports) {
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
     * @param {object} options - Opções do componente
     */
    exports.registerComponent = function (options) {
        options = ensureOptions(options);

        var componentName = options[NAME_FIELD],
            componentJqName = 'gui-{name}'.replace('{name}', componentName);

        if (components[componentName]) {
            throw 'Component ' + componentName + ' already registered!';
        }

        var fnCmp = function (ctrl) {
            return this.each(function (_, htmlEl) {
                var dataOptions = {},
                    el = $(htmlEl);

                // Lê opções dos elementos [data-*] exceto [data-gui]
                for (var opt in el.context.dataset) {
                    if (opt === COMPONENT_IDENTIFIER)
                        continue;
                    dataOptions[opt] = el.context.dataset[opt];
                }

                return options[CONSTRUCTOR_FIELD].bind(this)(ctrl, dataOptions);
            });
        },
            selector = '[data-gui="{name}"]'.replace('{name}', componentName);

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
