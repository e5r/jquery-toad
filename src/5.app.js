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
$namespace(5, 'app', function (exports) {
    var at = $require('@').__internals__;

    var CONTROLLER_IDENTIFIER = 'data-controller',
        CONTROLLER_SELECTOR = '[' + CONTROLLER_IDENTIFIER + ']';

    function _installControllers() {
        console.group('_installControllers');
        $(CONTROLLER_SELECTOR, $elm).each(function () {
            var el = $(this);

            console.log('$elm:', $elm, $(this));

            var name = el.attr(CONTROLLER_IDENTIFIER);
            var ctor = at.getController(name);
            var ctrl = new ctor(el);

            console.log('name:', name);
            console.log('ctor', ctor);
            console.log('ctrl', ctrl);

            _bind(el, ctrl)
            //initComponents(el, ctrl)
        });
        console.groupEnd();
    }

    function _bind(ctrlElm, ctrl) {
        console.group('_bind');
        var r = $('[data-event]', ctrlElm);
        console.log('r:', r);

        //data-event:click="showMessage"

        r.each(function () {
            console.log('ctrlElm:', ctrlElm, $(this));
            // var el = $(this)
            // var binder = el.data(BIND_IDENTIFIER)

            // if (!utils.isString(binder) || 0 > binder.indexOf(':')) return

            // binder = binder.split(':')

            // if (!utils.isArray(binder) || binder.length < 2) retun

            // var event = binder[0]
            // var handler = ctrl[binder[1]]

            // if (!utils.isString(event) || !utils.isFunction(handler)) return

            // el.on(event, handler)
            // el.ctrl(ctrl)
        });
        console.groupEnd();
    }

    // var initComponents = function (el, ctrl) {
    //     core.listComponents().map(function (cmp) {
    //         if (!utils.isString(cmp.id)) return
    //         if (!utils.isFunction(cmp.component)) return
    //         if (!utils.isString(cmp.component[COMPONENT_SELECTOR_KEY])) return
    //         if (!utils.isString(cmp.component[COMPONENT_NAME_KEY])) return
    //         if (cmp.id.lastIndexOf(COMPONENT_SUFFIX) !== cmp.id.length - COMPONENT_SUFFIX.length) return

    //         var jqSelector = cmp.component[COMPONENT_SELECTOR_KEY]
    //         var jqFn = cmp.component[COMPONENT_NAME_KEY]

    //         $(jqSelector, el)[jqFn](el)
    //     })
    // }

    function _installToad() {
        //setTitle()
        _installControllers();
    }

    $($elm).ready(_installToad);
})
