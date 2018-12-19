function View(idName, idImg) {
    var self = this;
    var nameSelector = '#' + idName;
    var avatarSelector = '#' + idImg;

    self.update = function (model) {
        $(nameSelector).val(model.name);
        $(avatarSelector).attr('src', model.avatarUrl);
    }

    $(nameSelector).on('keyup', function () {
        var value = $(nameSelector).val();

        doChange(value);
    });

    function doChange(value) {
        self.onChange && self.onChange(value);
    }
}
