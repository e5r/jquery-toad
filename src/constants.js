$namespace(1, '@', function (exports) {
    var constants = {},
        internals = exports.__internals__ = exports.__internals__ || {};

    internals.setConstant = _setConstant;

    /**
     * Constantes
     */
    exports.constants = constants;

    /**
     * Define uma constante global no sistema
     * 
     * @param {string} constName - Nome da constante
     * @param {any} constValue - Valor da constante
     */
    function _setConstant(constName, constValue) {
        if (typeof constName !== 'string')
            throw new Error('Invalid constName "' + constName + '"');

        if (!constValue)
            throw new Error('constValue is required!');

        if (typeof constants[constName] !== 'undefined')
            throw new Error('Constant "' + constName + '" already exists!');

        // Quando [Object.defineProperty] não está disponível (ex: IE8 <) simplesmente
        // guardamos um valor para uso, porém sem nenhuma proteção de imutabilidade
        //
        // OBS: Apesar de usarmos [Object.defineProperty] para definir a constante,
        //      testamos [Object.defineProperties] porque o IE8 implementa [Object.defineProperty]
        //      mas somente para objetos DOM. Com suporte completo no IE9 junto com a
        //      implementação de [Object.defineProperties]
        if (typeof Object.defineProperties !== 'function') {
            console.warn('WARNING!', 'Object.defineProperty is not supported!');
            return constants[constName] = constValue;
        }

        return Object.defineProperty(constants, constName, {
            // TODO: Mudar para [false], isso irá impedir o uso de [for(var c in constants)]
            //       porém será necessário fornecer algum meio para listar as constantes
            enumerable: true,

            configurable: false,
            writable: false,

            value: constValue
        })[constName];
    }
})
