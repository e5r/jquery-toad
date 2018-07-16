TOAD.namespace('app/components', function (exports) {
    "use strict";

    /* https://highlightjs.org - highlight.js é pré-requisito */
    if (typeof hljs !== 'object' || typeof hljs.highlight !== 'function') {
        throw new Error("Library highlight.js is required!");
    }

    var $ = TOAD.$jq,
        register = TOAD.require('@registerComponent'),

        CDATA_BEGIN = '[CDATA[',
        CDATA_BEGIN_LENGTH = CDATA_BEGIN.length,
        CDATA_END = ']]',
        CDATA_END_LENGTH = CDATA_END.length

    function CodeBlockComponent(ctrl, options) {
        var $this = $(this);

        // Se [data-file-path] for informado, carregamos o conteúdo
        // do arquivo informado
        if (typeof options.filePath === 'string') {
            _loadInit($this)
            _loadFilePath($this, options)
        }

        // Em outro caso, consideramos que o bloco de código está
        // como conteúdo do elemento em um elemento  <![CDATA[]]>
        else {
            var codeBlock = _getCDataContent($this)

            $this.empty()
            _setCodeBlock($this, options, codeBlock)
        }
    }

    exports.CodeBlockComponent = register('code-block', CodeBlockComponent)

    function _loadInit(el) {
        el.addClass('alert')
        el.addClass('alert-light')
        el.addClass('border-secondary')
        el.html('<i class="fas fa-spinner"></i> loading...')
    }

    function _loadFinish(el) {
        el.removeClass('alert')
        el.removeClass('alert-light')
        el.removeClass('border-secondary')
        el.empty()
    }

    function _loadFilePath(el, options) {
        $.ajax({
            method: 'GET',
            dataType: 'text',
            url: options.filePath
        }).done(function (data) {
            _loadSuccess(el, options, data)
        }).fail(function (jqXHR) {
            var message = 'HTTP {code} - {text}'
                .replace('{code}', jqXHR.statusCode)
                .replace('{text}', jqXHR.statusText)

            _loadError(el, options, message)
        })
    }

    function _loadSuccess(el, options, content) {
        _loadFinish(el)
        _setCodeBlock(el, options, content)
    }

    function _setCodeBlock(el, options, content) {
        var langDef = typeof options.lang === 'string'
            ? 'class="lang-' + options.lang + '"'
            : '',
            pre = $('<pre ' + langDef + '>')

        pre.addClass('card')
        pre.text(content)
        hljs.highlightBlock(pre[0])
        el.append(pre)
    }

    function _loadError(el, options, message) {
        _loadFinish(el)

        var fullMessage = 'Erro ao carregar bloco de código '
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

    function _getCDataContent(jqEl) {
        var cdataNode;

        jqEl.contents().each(function (idx, el) {
            if (!cdataNode && el.nodeType === 8)
                cdataNode = el
        })

        if (cdataNode) {
            var value = cdataNode.nodeValue || ''

            if (typeof value !== 'string')
                return

            if (value.substr(0, CDATA_BEGIN_LENGTH) === CDATA_BEGIN)
                value = value.substr(CDATA_BEGIN_LENGTH)

            if (value.substr(value.length - CDATA_END_LENGTH) === CDATA_END)
                value = value.substr(0, value.length - CDATA_END_LENGTH)

            return value
        }
    }
})
