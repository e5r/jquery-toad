TOAD.namespace('app/components', function (exports) {
    "use strict";

    var $ = TOAD.$jq,
        register = TOAD.require('@registerComponent')

    function DemoComponent(ctrl, options) {
        var $this = $(this)

        if (typeof options.filePath !== 'string') {
            _showError($this, options, 'Atributo [data-file-path] inválido!')

            return;
        }

        _prepareNode($this)
        _addHeader($this, options)
        _addBody($this, options)
    }

    exports.DemoComponent = register('demo', DemoComponent)

    function _prepareNode(el) {
        el.addClass(['card', 'shadow', 'mb-3'])
    }

    function _addHeader(el, options) {
        var elDivHeader = $('<div>'),

            elIconBegin = $('<i>')
                .addClass(['fas', 'fa-link', 'text-muted'])
                .css('padding-right', '5px'),

            elLabel = $('<span>')
                .addClass('text-muted')
                .text(options.filePath),

            elLinkOpenNewWindow = $('<a>')
                .addClass('float-right')
                .attr('href', options.filePath)
                .attr('target', '_blank')
                .attr('title', 'Abrir em página separada'),

            elIconNewWindow = $('<i>')
                .addClass(['fas', 'fa-external-link-alt'])

        elLinkOpenNewWindow.append(elIconNewWindow)

        elDivHeader
            .addClass('card-header')
            .append(elIconBegin)
            .append(elLabel)
            .append(elLinkOpenNewWindow)

        el.append(elDivHeader)
    }

    function _addBody(el, options) {
        var elDivBody = $('<div>'),

            elIframe = $('<iframe>')
                .addClass(['embed-responsive-item'])
                .attr('src', options.filePath)

        elDivBody
            .addClass(['card-body', 'embed-responsive', 'embed-responsive-21by9'])
            .append(elIframe)

        el.append(elDivBody)
    }

    function _showError(el, options, message) {
        el.empty()

        var fullMessage = 'Erro ao carregar página de demonstração '
            + '<strong>'
            + (options.filePath || '')
            + '</strong>'
            + '!'
            + (typeof message === 'string'
                ? '<hr /><p>' + message + '</p>'
                : '')

        el.addClass('alert')
        el.addClass('alert-warning')
        el.html('<i class="fas fa-exclamation-triangle"></i> ' + fullMessage)
    }
})
