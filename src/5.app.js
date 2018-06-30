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
