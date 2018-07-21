E5R.namespace('app/controllers', function (exports) {
    "use strict";

    var $ = E5R.$jq,
        register = E5R.require('@registerController'),

        BY_ID = E5R.require('@constants').VIEW_BY_ID;

    function ModelController(el, options) {
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

        this.$onUpdateModel(_onUpdateModel);
        this.$onUpdateModel('github.orgs', _onUpdateOrgs);

        /*
        this.$model();                      // get full model
        this.$model({ object });            // set full model
        this.$model('string');              // get path of model
        this.$model('string', { object });  // set path of model
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

    function _onUpdateModel(modelPath, oldState, newState) {
        /* After [this.$model(...)] on constructor

        modelPath = null

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

        modelPath = 'github.orgs'

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

    function _onUpdateOrgs(modelPath, oldState, newState) {
        /* After [this.$model(...)] on constructor

        modelPath = 'github.orgs'

        oldState = null 

        newState =  [
            'https://github.com/e5r'
        ] */

        /* After [self.$model(...)] on onAddOrgSaveClick

        modelPath = 'github.orgs'

        oldState =  [
            'https://github.com/e5r'
        ]
        
        newState = [
            'https://github.com/e5r',
            '{new.org.url}',
        ] */
    }

    exports.ModelController = register('model-controller', ModelController);
});
