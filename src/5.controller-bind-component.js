$namespace(5, 'core', function() {
    var BIND_ELEMENT_DATA_CTRL = '$ctrl';

    $.fn['controller'] = function CtrlComponent() {
        return $(this).data(BIND_ELEMENT_DATA_CTRL);
    }
})
