E5R.namespace('app/ui', function (exports) {
    "use strict";

    var utils = E5R.require('app/utils'),
        message = utils.DEFAULT_MESSAGE.replace('{name}', 'world');

    utils.showAlert(message);
    utils.showConsole(message);
});
