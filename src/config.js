$namespace(1, '@', function (exports) {
    var CONFIG = {},
        utils = $require('utils'),
        internals = exports.__internals__ = exports.__internals__ || {};

    internals.getObjectItemByPath = _getObjectItemByPath;
    internals.setObjectItemByPath = _setObjectItemByPath;

    function _getObjectItemByPath(obj, path) {
        var value = obj,
            keys = path.split('.'),
            k = 0;

        while (value && k < keys.length) {
            value = value[keys[k]];
            k++;
        }

        return value;
    }

    function _setObjectItemByPath(obj, path, newValue) {
        var value = obj,
            keys = path.split('.'),
            k = 0;

        while (value && k < keys.length) {
            if (typeof value[keys[k]] !== 'object')
                value[keys[k]] = {};

            if (k + 1 !== keys.length)
                value = value[keys[k]];

            k++;
        }

        return value[keys[--k]] = newValue;
    }

    function _getConfig(key, defaultValue) {
        if (!utils.isString(key))
            return;

        return internals.getObjectItemByPath(CONFIG, key) || defaultValue;
    }

    function _setConfig(key, newValue) {
        if (!utils.isString(key))
            return;

        return internals.setObjectItemByPath(CONFIG, key, newValue);
    }

    exports.config = {
        get: _getConfig,
        set: _setConfig
    };
})
