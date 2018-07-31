function View(idName, idImg) {
    var self = this;
    var nameSelector = '#' + idName;
    var avatarSelector = '#' + idImg;

    self.update = function (model) {
        $(nameSelector).val(model.name);
        $(avatarSelector).attr('src', model.avatarUrl);
    }

    $('#nome').on('keyup', function () {
        _doChange($(this).val());
    });

    function _doChange(value) {
        self.onChange && self.onChange(value);
    }
}
