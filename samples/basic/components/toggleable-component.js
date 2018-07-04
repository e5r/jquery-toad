E5R.namespace('app/components', function (exports) {
    var $ = E5R.$jq,
        Component = E5R.import('@').Component,

        DATA_CHANGED = 'changed';

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

    var component = Component({
        name: 'toggleable',
        ctor: ToggleableComponent
    });

    exports[component.$name] = component;
});
