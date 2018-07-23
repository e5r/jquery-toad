$namespace(1, '@', function (exports) {
    var CONFIG = {},
        utils = $require('utils');

    function _getConfig(key, defaultValue) {
        if (!utils.isString(key))
            return;

        return utils.getObjectItemByPath(CONFIG, key) || defaultValue;
    }

    function _setConfig(key, newValue) {
        if (!utils.isString(key))
            return;

        return utils.setObjectItemByPath(CONFIG, key, newValue);
    }

    exports.config = {
        get: _getConfig,
        set: _setConfig
    };
})
