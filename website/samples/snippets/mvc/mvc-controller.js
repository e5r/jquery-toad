function Controller(idImg, idName) {
    var model = new Model(this.onUpdateModel);
    var view = new View(idImg, idName);

    this.idImg = idImg;

    $('#' + idName).on('change', function () {
        model.changeName($(this).val());
    });
}

Controller.prototype.onUpdateModel = function (model) {
    $('#' + this.idImg).attr('src', model.avatarUrl);
}

new Controller('avatar', 'nome');
