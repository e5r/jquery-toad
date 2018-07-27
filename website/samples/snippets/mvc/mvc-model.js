function Model(onUpdateModel) {
    var name = '',
        url = '';

    this.changeName = function (name) {
        name = name;
        url = 'https://avatars.githubusercontent.com/' + name;

        onUpdateModel({ name: namE, avatarUrl: url });
    }
}
