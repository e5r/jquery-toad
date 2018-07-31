function Model() {
    var self = this;
    var name = '';
    var url = '';

    self.changeName = function (textName) {
        name = textName;
        url = 'https://avatars.githubusercontent.com/' + name;

        _doUpdate({
            name: name,
            avatarUrl: url
        });
    }

    function _doUpdate(model) {
        self.onUpdate && self.onUpdate(model);
    }
}
