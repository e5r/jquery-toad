TOAD.namespace('app/controllers', function (exports) {
    "use strict";

    var $ = TOAD.$jq,
        register = TOAD.require('@registerController'),
        COLORS = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'light',
            'dark',
            'white'
        ],
        CHANGE_COLOR_INTERVAL = 10 * 1000

    /**
     * @constructor
     * @param {DOM} el - Elemento DOM da controller
     */
    function MainController(el) {
        changeBgColor(el)
        setInterval(changeBgColor, CHANGE_COLOR_INTERVAL, el)
    }

    /**
     * Altera a classe 'bg-*' do elemento passado aleatoriamente
     * 
     * @private
     * @param {DOM} el - Elemento da controller
     * @param {object} options - Opções
     */
    function changeBgColor(el, options) {
        var $el = $(el),
            colorMax = COLORS.length - 1,
            colorSelected = Math.floor(Math.random() * colorMax),
            twbsClass = 'bg-' + COLORS[colorSelected],
            lastTwbsClass = $el.data('twbs-class')

        $el.removeClass(lastTwbsClass)
        $el.data('twbs-class', twbsClass)
        $el.addClass(twbsClass);
    }

    exports.MainController = register('main', MainController)
})
