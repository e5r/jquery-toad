E5R.namespace('app/components', function(exports) {
    var $ = E5R.$jq,
        Component = E5R.require('@').Component;

    var DATA_TEXT = 'text';
    var DATA_CHANGED = 'changed';

    function ToggleableComponent(ctrl, options) {
        var $this = $(this)
        var text = options.text;
        var handler = function() {
            var $el = $(this);
            var current = $el.text();

            $el.text(text);
            text = current;
            $this.data(DATA_CHANGED, !$this.data(DATA_CHANGED));
        }
        $this.css('cursor', 'pointer');
        $this.removeAttr('href');
        $this.on('click', handler)
    };

    exports['toggleable'] = Component({
        name: 'toggleable',
        ctor: ToggleableComponent
    })
});
