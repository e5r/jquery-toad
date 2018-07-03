$namespace(5, 'core', function() {
    var CONTROLLER_ELEMENT_DATA = '$ctrl';

    $.fn['controller'] = function ControllerComponent() {
        return $(this).data(CONTROLLER_ELEMENT_DATA);
    }
})
