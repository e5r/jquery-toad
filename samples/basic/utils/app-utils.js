E5R.namespace('app/utils', function (exports) {
    /**
     * Imprime informações da aplicação
     */
    exports.printAppInfo = function () {
        var Config = E5R.import('@').Config;

        console.log(Config.get('info.name'), 'v' + Config.get('info.version'));
        console.log(Config.get('info.copyright'));
        console.log('by', Config.get('info.author'));
    }
})
