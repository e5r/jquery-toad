E5R.namespace('app/utils', function (exports) {
    "use strict";

    /**
     * Imprime informações da aplicação
     */
    exports.printAppInfo = function () {
        var Config = E5R.require('@config');

        console.log(Config.get('info.name'), 'v' + Config.get('info.version'));
        console.log(Config.get('info.copyright'));
        console.log('by', Config.get('info.author'));
    }
})
