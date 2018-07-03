$namespace(6, 'core', function () {
    var BIND_ELEMENT_DATA_CTRL = '$ctrl';

    $.fn['byDataId'] = function ByDataIdComponent(dataId) {
        var selector = '[data-id="{id}"]';

        return $(selector.replace('{id}', dataId), $(this));
    }
})
