//
// @parametters: 
// - $
// - $elm
// - $app
//
// @variables:
// - _NAMESPACES_
// - _APP_NAMESPACE_KEY_
// - _APP_
//
// @methods:
// - $require
// - $namespace
//
$namespace(3, '@', function (exports) {
    console.log('#@/Controller:', exports);

    var NAME_FIELD = 'name',
        CONSTRUCTOR_FIELD = 'ctor',
        EXPORT_NAME_FIELD = '$name';

    /**
     * Cria uma controller
     * 
     * @param {object} options - Opções da controller
     */
    exports.Contrroller = function (options) {
        options = ensureOptions(options);

        var fnCtrl = function () {
            console.log('fnCtrl#constructor');
        };

        // $("#parent").on('DOMNodeInserted', function(e) {
        //     console.log(e.target, ' was inserted');
        // });
        
        // $("#parent").on('DOMNodeRemoved', function(e) {
        //     console.log(e.target, ' was removed');
        // });

        // $("#parent").bind("DOMSubtreeModified",function(){
        //     console.log('changed');
        // });

        fnCtrl.prototype = options[CONSTRUCTOR_FIELD];
        fnCtrl[EXPORT_NAME_FIELD] = options[NAME_FIELD];
    }

    function ensureOptions(options) {
        if (!options || typeof options[NAME_FIELD] != 'string')
            throw 'Invalid @controller option#' + NAME_FIELD + '. Must be a string.';

        if (!options || typeof options[CONSTRUCTOR_FIELD] != 'function')
            throw 'Invalid @controller option#' + CONSTRUCTOR_FIELD + '. Must be a function.';
    }
})
