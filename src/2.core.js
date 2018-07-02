$namespace(2, 'core', function (exports) {
    var controllers = $require('controllers')
    var components = $require('components')
    var utils = $require('utils')
    var config = $require('config')

    function _getController(ctrlName) {
        var private = $require('@').__internals__;
    }

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
