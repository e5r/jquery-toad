
var _NAMESPACES_ = [];
var _APP_NAMESPACE_KEY_ = '_app_namespace_';

// Inicializa namespace exclusivo para aplicação do usuário
var _APP_ = $toad[_APP_NAMESPACE_KEY_] = {};

var $import = function (_) {
    return $toad[_] = $toad[_] || {};
};

var $namespace = function (_, __, ___) {
    _NAMESPACES_.push({
        idx: _,
        cb: function () {
            ___(($toad[__] = $toad[__] || {}));
        }
    });
};

$toad.$jq = $;

/**
 * @code
{__TOAD__}.namespace('utils', function(exports) {
    var myData = {}
    var myFunction = function(){}

    exports.data = myData
    exports.func = myFunction
})
 */
$toad.namespace = function (_, __) {
    if (typeof _ !== 'string') {
        throw 'Invalid namespace.';
    }

    // TODO: Mudar para abordagem semelhante a  $namespace
    __((_APP_[_] = _APP_[_] || {}));
}

/**
 * @code
var utils = {__TOAD__}.import('utils')

utils.func(utils.data)
 */
$toad.import = function (_) {
    if (typeof _ !== 'string' || $.trim(_).length < 1) {
        throw 'Invalid namespace to import.';
    }

    var imported = {},
        exportGlobals = [
            'core',
            'utils'
        ],
        atIgnore = [
            '__internals__'
        ];

    if (_.charAt(0) === '@') {
        var parts = _.split('@');

        if (parts.length !== 2 || atIgnore.indexOf(parts[1]) >= 0)
            return;

        return $toad['@'][parts[1]];
    }

    // Objetos globais exceto o namespace da aplicação
    if (exportGlobals.indexOf(_) > -1) {
        for (var k in $toad[_]) {
            imported[k] = $toad[_][k];
        }
    }

    // Objetos da aplicação. Esses sobrescrevem os globais se existirem
    for (var k in _APP_[_]) {
        imported[k] = _APP_[_][k];
    }

    return imported;
}
