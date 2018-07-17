E5R.namespace('app/utils', function (exports) {
    "use strict";

    exports.DEFAULT_MESSAGE = 'Hello {name}!';

    exports.showAlert = function (message) {
        alert(message);
    }
});
