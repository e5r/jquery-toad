+function ($, App) {
	; function require(_) { return App[_] = App[_] || {} }
	; function _(c,p,v){c[p]=v}
	(function (exports) {

		var DATA_COMPONENT = 'app-gui-toggleable'
		var DATA_CHANGED = 'app-gui-toggleable-changed'

		_(ToggleableComponent, 'SELECTOR', '[data-app-gui-toggleable]')
		_(ToggleableComponent, 'NAME', 'appToggleable')
		function ToggleableComponent() {
			return this.each(function () {
				var $this = $(this)
				var text = $this.data(DATA_COMPONENT)
				var handler = function () {
					var $el = $(this)
					var current = $el.text()

					$el.text(text)
					text = current

					$this.data(DATA_CHANGED, !$this.data(DATA_CHANGED))
				}
				$this.on('click', handler)
			})
		};

		// ToggleableComponent.SELECTOR = '[data-app-gui-toggleable]'
		// ToggleableComponent.NAME = 'appToggleable'

		exports[ToggleableComponent.NAME + '-component'] = $.fn[ToggleableComponent.NAME] = ToggleableComponent

	})(App.components = App.components || {})
}(jQuery, window.ClientApp = window.ClientApp || {});
