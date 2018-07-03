$namespace(6, 'core', function (exports) {
    var BIND_ELEMENT_DATA_CTRL = '$ctrl';

    exports.ByDataIdComponent = $.fn['byDataId'] = function ByDataIdComponent(dataId) {
        var selector = '[data-id="{id}"]';

        return $(selector.replace('{id}', dataId), $(this));
    }
})
