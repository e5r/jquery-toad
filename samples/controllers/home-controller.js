+function ($, App) {
	; function require(_) { return App[_] = App[_] || {} }
	(function (exports) {

		var core = require('core')

		/** @constant {string} */
		var DATA_TITLE_SELECTOR = '[data-app-gui-title]'

		/** @constant {string} */
		var DATA_CONFIG_TITLE = 'app-config-title'

		/**
		 * HomeController
		 * @constructor
		 * 
		 * @param {DOM} el - Elemento anexado a controller
		 */
		function HomeController(el) {
			if (this instanceof HomeController === false)
				return new HomeController(el)

			var scope = this.scope = $(el)

			this.model = {
				title: scope.data(DATA_CONFIG_TITLE)
			}
		}

		/**
		 * Aplica o título da controller
		 */
		HomeController.prototype.ApplyTitle = function () {
			$ctrl = $(this).ctrl()

			$(DATA_TITLE_SELECTOR, $ctrl.scope).text($ctrl.model.title)
		}

		exports['home-controller'] = HomeController

	})(App.controllers = App.controllers || {})
}(jQuery, window.ClientApp = window.ClientApp || {});
