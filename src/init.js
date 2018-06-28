
/* jQuery 1.12.4 é pré-requisito */
if (typeof jQuery !== 'function') {
    throw new Error('jQuery TOAD\'s requires jQuery!')
}

(function($) {
    'use strict';
    var versionAll = $.fn.jquery.split(' ')[0].split('.'),
        vMajor = versionAll[0],
        vMinor = versionAll[1],
        vPath = versionAll[2]

    if (vMajor > 1) return
    if (vMajor == 1 && vMinor > 12) return
    if (vMajor == 1 && vMinor == 12 && vPath >= 4) return

    throw new Error('jQuery TOAD\'s requires jQuery version 1.12.4 or higher!')
})(jQuery);

/* É necessário definir um valor para __TOAD__ explicitamente.
   Esse será o nome do objeto de aplicação disponível em window. */
if (typeof __TOAD__ !== 'string') {
    throw new Error('You have not set a value for __TOAD__!')
}

window[__TOAD__] = window[__TOAD__] || {};
