$namespace(6, 'app', function(exports) {
    var utils = $require('utils'),
        atPrivate = $require('@').__internals__;

    var CONTROLLER_IDENTIFIER = 'controller',
        CONTROLLER_DATA_IDENTIFIER = 'data-' + CONTROLLER_IDENTIFIER,
        CONTROLLER_SELECTOR = '[' + CONTROLLER_DATA_IDENTIFIER + ']',
        COMPONENT_SELECTOR_KEY = '$selector',
        COMPONENT_NAME_KEY = '$name',
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

            _setupEvents(el, ctrl)
            _setupComponents(el, ctrl);
            _setupModel(el, ctrl);
        });
    }

    function _setupEvents(ctrlElm, ctrl) {
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

                el.data(BIND_ELEMENT_DATA_CTRL, ctrl);
            }
        });
    }

    function _setupComponents(ctrlElm, ctrl) {
        console.group('_setupComponents');
        console.log('ctrlElm:', ctrlElm);
        console.log('ctrl:', ctrl);

        atPrivate.listComponents().map(function(cmp) {
            console.log('#cmp:', cmp);
            if (!utils.isString(cmp.id)) return;
            if (!utils.isFunction(cmp.component)) return;
            if (!utils.isString(cmp.component[COMPONENT_SELECTOR_KEY])) return;
            if (!utils.isString(cmp.component[COMPONENT_NAME_KEY])) return;

            var jqSelector = cmp.component[COMPONENT_SELECTOR_KEY];
            var jqFn = cmp.component[COMPONENT_NAME_KEY];

            $(jqSelector, ctrlElm)[jqFn](ctrl);
        })
        console.groupEnd();
    }

    function _setupModel(el, ctrl) {
        console.group('_setupModel');
        console.log('TODO: Implementar _setupModel');
        console.groupEnd();
    }

    function _installToad() {
        //setTitle() // TODO: Mover para algum utilitário
        _installControllers();
    }

    $($elm).ready(_installToad);
})
