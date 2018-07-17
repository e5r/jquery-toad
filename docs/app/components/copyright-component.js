TOAD.namespace('app/components', function (exports) {
    "use strict";

    var $ = TOAD.$jq,
        register = TOAD.require('@registerComponent'),

        TEMPLATE = TOAD.constant(
            'COPYRIGHT_TEMPLATE',
            'Copyright (c) {year} E5R Development Team - Todos os direitos reservados')

    function CopyrightComponent(ctrl, options) {
        var $this = $(this)

        $this.text(TEMPLATE.replace('{year}', new Date().getFullYear()))
    }

    exports.CopyrightComponent = register('copyright', CopyrightComponent)
})
