(function Controller() {
    var model = new Model();
    var view = new View('nome', 'avatar');

    view.onChange = function (value) {
        model.changeName(value);
    }

    model.onUpdate = function (model) {
        view.update(model);
    }

    model.changeName('erlimar');
})();
