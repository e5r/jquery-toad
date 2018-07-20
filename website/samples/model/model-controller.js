E5R.namespace('app/controllers', function (exports) {
    "use strict";

    var $ = E5R.$jq,
        register = E5R.require('@registerController'),
        _CONST_ = E5R.require('@constants'),

        BY_ID = _CONST_.VIEW_BY_ID,
        ON_UPDATE_MODEL = _CONST_.CTRL_ON_UPDATE_MODEL_METHOD;

    function ModelController(el, options) {
        // init $model
        this.$model({
            name: 'Erlimar Silva Campos',
            github: {
                nick: 'erlimar',
                home: 'https://github.com/erlimar',
                orgs: [
                    'https://github.com/e5r'
                ]
            }
        })

        /*
        this.$model();                      // get full model
        this.$model({ object });            // replace full model
        this.$model('string');              // get path of model
        this.$model('string', { object });  // replace path of model
        */
    };

    ModelController.prototype.onAddOrgSaveClick = function (event) {
        var self = $(this).controller(),
            orgs = self.$model('github.orgs'),
            addOrgUrl = self.$view(BY_ID, 'add-org-url').val();

        self.$model('github.orgs', orgs.concat([addOrgUrl]))
    }

    ModelController.prototype.onDiscardClick = function (event) {
        var self = $(this).controller(),
            model = self.$model();

        model.github.orgs = [];
        // not update model
    }

    ModelController.prototype[ON_UPDATE_MODEL] = function (oldState, newState) {
        /* After [this.$model(...)] on constructor

        oldState = null 

        newState = {
            name: 'Erlimar Silva Campos',
            github: {
                nick: 'erlimar',
                home: 'https://github.com/erlimar',
                orgs: [
                    'https://github.com/e5r'
                ]
            }
        } */

        /* After [self.$model(...)] on onAddOrgSaveClick

        oldState = {
            name: 'Erlimar Silva Campos',
            github: {
                nick: 'erlimar',
                home: 'https://github.com/erlimar',
                orgs: [
                    'https://github.com/e5r'
                ]
            }
        } 
        
        newState = {
            name: 'Erlimar Silva Campos',
            github: {
                nick: 'erlimar',
                home: 'https://github.com/erlimar',
                orgs: [
                    'https://github.com/e5r',
                    '{new.org.url}',
                ]
            }
        } */
    }

    exports.ModelController = register('model-controller', ModelController);
});
