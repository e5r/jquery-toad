E5R.namespace('app/components', function (exports) {
    "use strict";

    var $ = E5R.$jq,
        register = E5R.require('@registerComponent'),

        DATA_CHANGED = E5R.constant('TOGGLEABLE_COMPONENT_DATA_CHANGED', 'changed');

    function ToggleableComponent(ctrl, options) {
        var $this = $(this),
            text = options.text,
            handler = function () {
                var $el = $(this),
                    current = $el.text();

                $el.text(text);
                text = current;
                $this.data(DATA_CHANGED, !$this.data(DATA_CHANGED));
            };

        $this.css('cursor', 'pointer');
        $this.removeAttr('href');
        $this.on('click', handler)
    };

    exports['ToggleableComponent'] = register('toggleable', ToggleableComponent);
});
