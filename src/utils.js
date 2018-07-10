$namespace(0, 'utils', function (exports) {

    /**
     * Verifica se referencia uma string
     *
     * @param {any} value - Instância a verificar
     */
    exports.isString = function (value) {
        return typeof value === 'string';
    }

    /**
     * Verifica se referencia uma função
     *
     * @param {any} value - Instância a verificar
     */
    exports.isFunction = function (value) {
        return typeof value === 'function';
    }

    /**
     * Verifica se referencia uma indefinição
     *
     * @param {any} value - Instância a verificar
     */
    exports.isUndefined = function (value) {
        return typeof value === 'undefined';
    }

    /**
     * Verifica se referencia um objeto
     *
     * @param {any} value - Instância a verificar
     */
    exports.isObject = function (value) {
        // http://jsperf.com/isobject4
        return value !== null && typeof value === 'object';
    }

    /**
     * Verifica se referencia um número
     *
     * @param {any} value - Instância a verificar
     */
    exports.isNumber = function (value) {
        return typeof value === 'number';
    }

    /**
     * Verifica se referencia um array
     *
     * @param {any} value - Instância a verificar
     */
    exports.isArray = function (value) {
        return value instanceof Array
            || Object.prototype.toString.call(value) === "[object Array]";
    }

    /**
     * Recupera o titulo do elemento principal (document)
     */
    exports.getPageTitle = function (newTitle) {
        return $($elm).attr('title');
    }

    /**
     * Altera o titulo do elemento principal (document)
     * 
     * @param {string} newTitle - Novo título
     */
    exports.setPageTitle = function (title) {
        $($elm).attr('title', title);
    }
})
