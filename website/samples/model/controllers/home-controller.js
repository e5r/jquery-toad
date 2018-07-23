E5R.namespace('app/controllers', function (exports) {
    "use strict";

    var $ = E5R.$jq,
        register = E5R.require('@registerController'),

        BY_ID = E5R.require('@constants').VIEW_BY_ID;

    function HomeController(el, options) {
        console.log('model.before:', this.$model());

        var model = {
            title: 'Card title',
            description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            f: function () { /* functions are discarded */ },
            imageUrl: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg',
            nativeList: [],
            list: {
                items: [
                    'https://github.com/e5r'
                ],
                f: function () { /* functions are discarded */ }
            }
        };

        this.$model(model);
        this.$onUpdateModel(_onUpdateModel);
        this.$onUpdateModel('list.items', _onUpdateItems);

        console.log('model.after:', this.$model());
        console.log(this);
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
            items = self.$model('list.items'),
            addItemText = self.$view('form input[type="text"]').val();

        if (items.indexOf(addItemText) >= 0) {
            _showFeedback('O item já está na lista. Informe outro valor!');
            return;
        }

        if ($.trim(addItemText || '').length < 1) {
            _showFeedback('Preencha o campo com algum valor!');
            return;
        }

        self.$model('list.items', items.concat([addItemText]))

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

        model.list.items = [];

        console.log('onDiscardClick->model.middle:', model);
        console.log('onDiscardClick->model.after:', self.$model());
        // not update model
    }

    function _onUpdateModel(oldState, newState, modelPath, controller) {
        /* After [this.$model(...)] on constructor

        modelPath = null

        oldState = null 

        newState = {
            title: 'Card title',
            description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            imageUrl: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg',
            list: {
                itens: [
                    'https://github.com/e5r'
                ]
            }
        } */
    }

    function _onUpdateItems(oldState, newState, modelPath, controller) {
        /* After [this.$model(...)] on constructor

        modelPath = 'list.items'

        oldState = null 

        newState =  [
            'https://github.com/e5r'
        ] */

        /* After [self.$model(...)] on onAddOrgSaveClick

        modelPath = 'list.items'

        oldState =  [
            'https://github.com/e5r'
        ]
        
        newState = [
            'https://github.com/e5r',
            '{new.org.url}',
        ] */
    }

    exports.HomeController = register('home', HomeController);
});
