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

            internals.callLazyTriggers(ctrl);
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

    function _installToad() {
        _installControllers();
    }

    $($elm).ready(_installToad);
})
