$namespace(2, 'core', function (exports) {
    var CONTROLLER_ELEMENT_DATA = '$ctrl';

    exports.ControllerComponent = $.fn['controller'] = function ControllerComponent() {
        return $(this).data(CONTROLLER_ELEMENT_DATA);
    }
})
