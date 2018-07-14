TOAD.namespace('app/controllers', function (exports) {
    "use strict";

    var $ = TOAD.$jq,
        register = TOAD.require('@registerController')

    /**
     * @constructor
     * @param {DOM} el - Elemento DOM da controller
     * @param {object} options - Opções
     */
    function MotivacaoController(el, options) {
        alert('Motivação!')
    }

    exports.MotivacaoController = register({
        name: 'motivacao',
        ctor: HomeController
    })
})
