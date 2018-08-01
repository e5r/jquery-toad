function Model() {
    var self = this;
    var name = '';
    var url = '';

    self.changeName = function (textName) {
        name = textName;
        url = 'https://avatars.githubusercontent.com/' + name;

        doUpdate();
    }

    function doUpdate(model) {
        self.onUpdate && self.onUpdate({
            name: name,
            avatarUrl: url
        });
    }
}
