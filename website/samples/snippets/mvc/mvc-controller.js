function Controller(model, view) {
    view.onChange = function (value) {
        model.changeName(value);
    }

    model.onUpdate = function (model) {
        view.update(model);
    }

    model.changeName('erlimar');
}

var model = new Model();
var view = new View('name', 'avatar');
var controller = new Controller(model, view);
