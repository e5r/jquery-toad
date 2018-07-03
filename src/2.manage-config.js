$namespace(2, '@', function (exports) {
    var CONFIG = {},
        utils = $require('utils');

    function _getConfig(key, defaultValue) {
        if (!utils.isString(key))
            return;

        var value = CONFIG,
            keys = key.split('.'),
            k = 0;

        while (value && k < keys.length) {
            value = value[keys[k]];
            k++;
        }

        return value || defaultValue;
    }

    function _setConfig(key, newValue) {
        if (!utils.isString(key))
            return;

        var value = CONFIG,
            keys = key.split('.'),
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

    exports.Config = {
        get: _getConfig,
        set: _setConfig
    };
})
