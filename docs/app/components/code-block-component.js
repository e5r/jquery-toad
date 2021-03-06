TOAD.namespace('app/components', function (exports) {
    "use strict";

    /* https://highlightjs.org - highlight.js é pré-requisito */
    if (typeof hljs !== 'object' || typeof hljs.highlight !== 'function') {
        throw new Error("Library highlight.js is required!")
    }

    var $ = TOAD.$jq,
        register = TOAD.require('@registerComponent'),

        CDATA_BEGIN = '[CDATA[',
        CDATA_BEGIN_LENGTH = CDATA_BEGIN.length,
        CDATA_END = ']]',
        CDATA_END_LENGTH = CDATA_END.length,

        _CACHE_ = []

    function CodeBlockComponent(ctrl, options) {
        var $this = $(this)

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
        var cachedContent = _getCache(options.filePath);

        if (cachedContent) {
            _loadSuccess(el, options, cachedContent)

            return;
        }

        $.ajax({
            method: 'GET',
            dataType: 'text',
            url: options.filePath
        }).done(function (data) {
            _addToCache(options.filePath, data);
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

        var contentArray = (typeof content === 'string' ? content : '').split('\n'),
            lineBegin = (typeof options.lineBegin === 'number' ? options.lineBegin : 1),
            lineEnd = (typeof options.lineEnd === 'number' ? options.lineEnd : contentArray.length),
            contentArrayFiltered = []

        if (lineEnd < lineBegin) {
            lineEnd = lineBegin
        }

        for (var l = 0; l < contentArray.length; l++) {
            var lineNumber = l + 1

            if (lineNumber >= lineBegin && lineNumber <= lineEnd) {
                contentArrayFiltered.push(contentArray[l])
            }
        }

        pre.addClass(['card', 'shadow'])
        pre.text(contentArrayFiltered.join('\n'))
        hljs.highlightBlock(pre[0])
        el.append(pre)
    }

    function _loadError(el, options, message) {
        _loadFinish(el)

        var fullMessage = 'Erro ao carregar bloco de código '
            + '<a style="font-weight:bold" href="'
            + (options.filePath || '')
            + '" target="_blank">'
            + (options.filePath || '')
            + '</a>'
            + '!'
            + (typeof message === 'string'
                ? '<hr /><p>' + message + '</p>'
                : '')

        el.addClass('alert')
        el.addClass('alert-warning')
        el.html('<i class="fas fa-exclamation-triangle"></i> ' + fullMessage)
    }

    function _getCDataContent(jqEl) {
        var cdataNode

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

    function _addToCache(filePath, fileContent) {
        var found = _getCache(filePath),
            record = {
                path: filePath,
                content: fileContent
            }

        if (found) {
            var idx = _CACHE_.indexOf(found)
            _CACHE_[idx] = record

            return;
        }

        _CACHE_.push(record)
    }

    function _getCache(filePath) {
        var found;

        $.each(_CACHE_, function (idx, obj) {
            if (obj.path === filePath) {
                found = obj
            }
        })

        return found;
    }

})
