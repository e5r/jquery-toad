$namespace(7, '@', function (exports) {
    var consts = {},
        internals = exports.__internals__ = exports.__internals__ || {};

    internals.setConstant = _setConstant;

    /**
     * Constantes
     */
    exports.consts = consts;

    /**
     * Define uma constante global no sistema
     * 
     * @param {string} constName - Nome da constante
     * @param {any} constValue - Valor da constante
     */
    function _setConstant(constName, constValue) {
        if (typeof constName !== 'string')
            throw 'Invalid constName "' + constName + '"';

        if (!constValue)
            throw 'constValue is required!';

        if (typeof consts[constName] !== 'undefined')
            throw 'Constant "' + constName + '" already exists!';

        // Quando [Object.defineProperty] não está disponível (ex: IE8 <) simplesmente
        // guardamos um valor para uso, porém sem nenhuma proteção de imutabilidade
        if (typeof Object.defineProperty !== 'function') {
            console.warn('WARNING!', 'Object.defineProperty is not supported!');
            consts[constName] = constValue;
            return;
        }

        var newConsts = Object.defineProperty(consts, constName, {
            // TODO: Mudar para [false], isso irá impedir o uso de [for(var c in consts)]
            //       porém será necessário fornecer algum meio para listar a constantes
            enumerable: true,

            configurable: false,
            writable: false,

            value: constValue
        });
    }
})
