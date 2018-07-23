E5R.namespace('app/controllers', function (exports) {
    "use strict";

    var $ = E5R.$jq,
        utils = E5R.require('utils'),
        register = E5R.require('@registerController'),

        BY_ID = E5R.require('@constants').VIEW_BY_ID;

    function HomeController(el, options) {
        var model = {
            title: 'E5R Development Team',
            description: 'O E5R Development Team, é um projeto de construção de um time de desenvolvimento de softwares',
            f1: function () { /* functions are discarded */ },
            imageUrl: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg',
            nativeList: [],
            websites: [
                'https://github.com/e5r',
                'https://erlimar.wordpress.com/category/e5r-development-team/',
                'https://www.youtube.com/channel/UC6zPtVBfcAdkzq7-dpSlhdw'
            ],
            f2: function () { /* functions are discarded */ }
        };

        this.$onUpdateModel(_onUpdateModel);
        this.$onUpdateModel('websites', _onUpdateItems);

        this.$model(el, model);
    };

    HomeController.prototype.onAddItemClick = function (event) {
        var self = $(this).controller();

        self.$view(BY_ID, 'button-show-form').addClass('d-none');
        self.$view(BY_ID, 'form').removeClass('d-none');
        self.$view('form input[type="text"]')
            .val('')
            .focus();
    }

    HomeController.prototype.onAddItemCancelClick = function (event) {
        event.preventDefault();

        var self = $(this).controller();

        self.$view(BY_ID, 'button-show-form').removeClass('d-none');
        self.$view(BY_ID, 'form').addClass('d-none');
    }

    HomeController.prototype.onAddItemSaveClick = function (event) {
        event.preventDefault();

        var self = $(this).controller(),
            items = self.$model('websites'),
            addItemText = self.$view('form input[type="text"]').val();

        if (items.indexOf(addItemText) >= 0) {
            _showFeedback('O item já está na lista. Informe outro valor!');
            return;
        }

        if ($.trim(addItemText || '').length < 1) {
            _showFeedback('Preencha o campo com algum valor!');
            return;
        }

        self.$model('websites', items.concat([addItemText]))

        self.$view(BY_ID, 'button-show-form').removeClass('d-none');
        self.$view(BY_ID, 'form').addClass('d-none');

        function _showFeedback(feedback) {
            self.$view('form span.invalid-feedback').text(feedback);
            self.$view('form input[type="text"]').addClass('is-invalid');

            setTimeout(function () {
                self.$view('form input[type="text"]').removeClass('is-invalid');
            }, 2 * 1000)
        }
    }

    HomeController.prototype.onDiscardClick = function (event) {
        var self = $(this).controller(),
            model = self.$model();

        console.log('onDiscardClick->model.before:', model);

        model.websites = [];

        console.log('onDiscardClick->model.middle:', model);
        console.log('onDiscardClick->model.after:', self.$model());
        // not update model
    }

    function _onUpdateModel(oldState, newState, modelPath, controller) {
        controller.$view(BY_ID, 'info-title').text(newState.title);
        controller.$view(BY_ID, 'info-description').text(newState.description);

        var pathItems = 'websites',
            cbItems = (modelPath
                ? function () { }
                : _onUpdateItems);

        cbItems.call(
            null,
            utils.getObjectItemByPath(oldState, pathItems),
            utils.getObjectItemByPath(newState, pathItems),
            pathItems,
            controller
        );
    }

    function _onUpdateItems(oldState, newState, modelPath, controller) {
        var list = controller.$view(BY_ID, 'info-list');

        list.empty();

        $.each(newState || [], function (_, itemText) {
            itemText = (itemText || '');

            var item = $('<li>')
                .addClass('list-group-item');

            if (itemText.indexOf('http://') >= 0 || itemText.indexOf('https://') >= 0) {
                var link = $('<a>')
                    .attr('href', itemText)
                    .attr('target', '_blank')
                    .text(itemText);
                item.append(link);
            } else
                item.text(itemText);

            list.append(item);
        });
    }

    exports.HomeController = register('home', HomeController);
});
