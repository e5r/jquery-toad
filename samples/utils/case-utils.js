E5R.namespace('app/utils', function (exports) {
    /**
     * Converte os caracteres de uma string para maiúsculas
     *
     * @param {string} str - String a converter
     */
    exports.toUpper = function (str) {
        return (str || '').toLocaleUpperCase();
    }

    /**
     * Converte os caracteres de uma string para minúsculas
     *
     * @param {string} str - String a converter
     */
    exports.toLower = function (str) {
        return (str || '').toLocaleLowerCase();
    }
})
