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
$namespace(2, 'core', function (exports) {
    console.log('#core:', exports);

    var controllers = $require('controllers')
    var components = $require('components')
    var utils = $require('utils')
    var config = $require('config')

    // function _registerAndGetController(ctrlName, ctrlConstructor) {
    //     if (utils.isString(ctrlName) && utils.isFunction(ctrlConstructor)) {
    //         return controllers[ctrlName + CONTROLLER_SUFFIX] = ctrlConstructor
    //     }

    //     if (utils.isString(ctrlName)) {
    //         var ctrl = controllers[ctrlName + CONTROLLER_SUFFIX]

    //         return utils.isFunction(ctrl)
    //             ? ctrl
    //             : function () { }
    //     }

    //     return function () { };
    // }

    // function _listComponents() {
    //     var list = []

    //     for (var c in components)
    //         list.push({
    //             id: c,
    //             component: components[c]
    //         })

    //     return list
    // }

    // function _getComponent(cmpName) {
    //     if (utils.isString(cmpName)) {
    //         var cmp = components[cmpName + COMPONENT_SUFFIX]

    //         return utils.isFunction(cmp)
    //             ? cmp
    //             : function () { }
    //     }

    //     return function () { };
    // }

    // function _getConfig(key, defaultValue) {
    //     if (!utils.isString(key)) return

    //     var value = config,
    //         keys = key.split('.'),
    //         k = 0

    //     while (value && k < keys.length) {
    //         value = value[keys[k]];
    //         k++
    //     }

    //     return value || defaultValue
    // }

    // function _setConfig(key, newValue) {
    //     if (!utils.isString(key)) return

    //     var value = config,
    //         keys = key.split('.'),
    //         k = 0

    //     while (value && k < keys.length) {
    //         if (typeof value[keys[k]] !== 'object')
    //             value[keys[k]] = {}

    //         if (k + 1 !== keys.length)
    //             value = value[keys[k]]

    //         k++
    //     }

    //     return value[keys[--k]] = newValue
    // }

    // exports.controller = _registerAndGetController
    // exports.component = _getComponent
    // exports.listComponents = _listComponents
    // exports.getConfig = _getConfig
    // exports.setConfig = _setConfig
})
