
(function($, $elm, $app, $require, $namespace) {

var _APP_NAMESPACE_KEY_ = '_app_namespace_'

// Inicializa namespace exclusivo para aplicação do usuário
var _APP_ = window[__TOAD__][_APP_NAMESPACE_KEY_] = {}

/**
 * @code
$app.namespace('utils', function(exports) {
    var myData = {}
    var myFunction = function(){}

    exports.data = myData
    exports.func = myFunction
})
 */
$app.namespace = function _namespace(_, __) {
    __((_APP_[_] = _APP_[_] || {}))
}

/**
 * @code
var utils = app.require('utils')

utils.func(utils.data)
 */
$app.require = function _require(_) {
    var require = {}

    // Objetos globais exceto o namespace da aplicação
    for (var k in window[__TOAD__][_]) {
        if (k === _APP_NAMESPACE_KEY_) continue
        require[k] = window[__TOAD__][_][k]
    }

    // Objetos da aplicação
    for (var k in _APP_) {
        require[k] = _APP_[k]
    }
}
