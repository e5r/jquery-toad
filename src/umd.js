
if(typeof module === 'object' && typeof module.exports === 'object' && typeof require === 'function') {
    module.exports = function(w) {
        /* DOM - Document Object Model é pré-requisito */
        if (typeof w !== 'object' || typeof w.document !== 'object') {
            throw new Error("jQuery TOAD\'s requires a DOM (Document Object Model)!");
        }

        var jQuery = require('jquery')(w);

        return factory(w, jQuery, 'CommonJS');
    }
}

else if(typeof define === 'function' && typeof define.amd === 'object') {
    define('${ pkg.name }', ['jquery'], function(jQuery) {
        return factory(global, jQuery, 'AMD');
    });
}

else {
    /* É necessário definir um valor para __TOAD__ explicitamente.
       Esse será o nome do objeto de aplicação disponível em window. */
    if (typeof global.__TOAD__ !== 'string') {
        throw new Error('You have not set a value for __TOAD__!');
    }

    global[global.__TOAD__] = factory(global, global.jQuery, 'Browser');
}
