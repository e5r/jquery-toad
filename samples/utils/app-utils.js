E5R.namespace('app/utils', function (exports) {
    /**
     * Imprime informações da aplicação
     */
    exports.printAppInfo = function () {
        var info = E5R.require('app').info;

        console.log(info.name, 'v' + info.version);
        console.log(info.copyright);
        console.log('by', info.author);
    }
})
