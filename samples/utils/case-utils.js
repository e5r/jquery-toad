MyApp.namespace('app/utils', function(exports) {
    var $app = MyApp;

    /**
     * Converte os caracteres de uma string para maiúsculas
     *
     * @param {string} str - String a converter
     */
    exports.toUpper = function(str) {
        return (str || '').toLocaleUpperCase();
    }

    /**
     * Converte os caracteres de uma string para minúsculas
     *
     * @param {string} str - String a converter
     */
    exports.toLower = function(str) {
        return (str || '').toLocaleLowerCase();
    }

    /**
     * Imprime informações da aplicação
     */
    exports.printAppInfo = function() {
        var appInfo = $app.require('app');

        console.log(appInfo.name, 'v' + appInfo.version);
        console.log(appInfo.copyright);
        console.log('by', appInfo.author);
    }
})
