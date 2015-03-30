/* http://github.com/mindmup/bootstrap-wysiwyg */
/*global jQuery, $, FileReader*/
/*jslint browser:true*/
(function ($) {
    'use strict';
    var readFileIntoDataUrl = function (fileInfo) {
        var loader = $.Deferred(),
            fReader = new FileReader();
        fReader.onload = function (e) {
            loader.resolve(e.target.result);
        };
        fReader.onerror = loader.reject;
        fReader.onprogress = loader.notify;
        fReader.readAsDataURL(fileInfo);
        return loader.promise();
    };
    $.fn.cleanHtml = function () {
        var html = $(this).html();
        return html && html.replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, '');
    };
    $.fn.wysiwyg = function (userOptions) {
        var editor = this,
            selectedRange,
            options,
            toolbarBtnSelector,
            editing = false,
            lastLink,
            updateToolbar = function () {
                if (options.activeToolbarClass) {
                    $(options.toolbarSelector).find(toolbarBtnSelector).each(function () {
                        var command = $(this).data(options.commandRole);
                        if (document.queryCommandState(command)) {
                            $(this).addClass(options.activeToolbarClass);
                        } else {
                            $(this).removeClass(options.activeToolbarClass);
                        }
                    });
                }
            },
            execCommand = function (commandWithArgs, valueArg) {
                var commandArr = commandWithArgs.split(' '),
                    command = commandArr.shift(),
                    args = commandArr.join(' ') + (valueArg || '');
                document.execCommand(command, 0, args);
                updateToolbar();
            },
            getCurrentRange = function () {
                var sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    return sel.getRangeAt(0);
                }
            },
            saveSelection = function () {
                if (!!window.getSelection().toString()) {
                    selectedRange = getCurrentRange();
                }
            },
            restoreSelection = function () {
                var selection = window.getSelection();
                if (selectedRange) {
                    try {
                        selection.removeAllRanges();
                    } catch (ex) {
                        document.body.createTextRange().select();
                        document.selection.empty();
                    }

                    selection.addRange(selectedRange);
                }
            },
            insertFiles = function (files) {
                editor.focus();
                $.each(files, function (idx, fileInfo) {
                    if (/^image\//.test(fileInfo.type)) {
                        $.when(readFileIntoDataUrl(fileInfo)).done(function (dataUrl) {
                            execCommand('insertimage', dataUrl);
                        }).fail(function (e) {
                            options.fileUploadError("file-reader", e);
                        });
                    } else {
                        options.fileUploadError("unsupported-file-type", fileInfo.type);
                    }
                });
            },
            markSelection = function (input, color) {
                restoreSelection();
                if (document.queryCommandSupported('hiliteColor')) {
                    document.execCommand('hiliteColor', 0, color || 'transparent');
                }
                saveSelection();
                input.data(options.selectionMarker, color);
            },
            bindToolbar = function (toolbar, options) {
                toolbar.find(toolbarBtnSelector).click(function () {
                    restoreSelection();
                    editor.focus();
                    execCommand($(this).data(options.commandRole));
                    saveSelection();
                });
                toolbar.find('[data-toggle=dropdown]').click(restoreSelection);

                toolbar.find('input[type=text][data-' + options.commandRole + ']').on('keypress', function (e) {

                    if (e.which == 13) {
                        if (lastLink) {
                            $(lastLink).attr('href', $(this).val());
                            $(this).val('');
                            editor.focus();
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            lastLink = undefined;
                        } else {
                            var newValue = this.value;
                            this.value = '';
                            restoreSelection();
                            if (newValue) {
                                editor.focus();
                                execCommand($(this).data(options.commandRole), newValue);
                            }
                            saveSelection();
                        }
                    }

                }).on('focus', function () {
                    var input = $(this);
                    if (!input.data(options.selectionMarker) && !!window.getSelection().toString()) {
                        markSelection(input, options.selectionColor);
                        input.focus();
                    }
                }).on('blur', function (e) {
                    var input = $('.add-link-input');
                    if (input.data(options.selectionMarker)) {
                        markSelection(input, false);
                    }
                    if (input.val().length) {
                        if (lastLink) {
                            $(lastLink).attr('href', $(this).val());
                            $(this).val('');
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            lastLink = undefined;
                        } else {
                            var newValue = this.value;
                            /* ugly but prevents fake double-calls due to selection restoration */
                            this.value = '';
                            restoreSelection();
                            if (newValue) {
                                editor.focus();
                                execCommand($(this).data(options.commandRole), newValue);
                            }
                            saveSelection();
                        }
                    }

                });
                toolbar.find('input[type=file][data-' + options.commandRole + ']').change(function () {
                    restoreSelection();
                    if (this.type === 'file' && this.files && this.files.length > 0) {
                        insertFiles(this.files);
                    }
                    saveSelection();
                    this.value = '';
                });

            },
            initFileDrops = function () {
                editor.on('dragenter dragover', false)
                    .on('drop', function (e) {
                        var dataTransfer = e.originalEvent.dataTransfer;
                        e.stopPropagation();
                        e.preventDefault();
                        if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
                            insertFiles(dataTransfer.files);
                        }
                    });
            };
        options = $.extend({}, $.fn.wysiwyg.defaults, userOptions);
        toolbarBtnSelector = 'a[data-' + options.commandRole + '],button[data-' + options.commandRole + '],input[type=button][data-' + options.commandRole + ']';
        //bindHotkeys(options.hotKeys);
        if (options.dragAndDropImages) {
            initFileDrops();
        }
        bindToolbar($(options.toolbarSelector), options);
        editor.attr('contenteditable', true)
            .on('mouseup keyup mouseout', function () {
                saveSelection();
                updateToolbar();
            }).on('click', 'a', function (e) {
                $('.add-link-input').val($(this).attr('href'));
                lastLink = this;
                if ($(this).parents('.editting').length) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            }).on('mouseup', function (e) {
                if ($(window.getSelection().anchorNode).parents('a').length) {
                    $('.add-link-input').val($(window.getSelection().anchorNode).parents('a').attr('href'));
                    lastLink = this;
                }
            });
        $(window).bind('touchend', function (e) {
            var isInside = (editor.is(e.target) || editor.has(e.target).length > 0),
                currentRange = getCurrentRange(),
                clear = currentRange && (currentRange.startContainer === currentRange.endContainer && currentRange.startOffset === currentRange.endOffset);
            if (!clear || isInside) {
                saveSelection();
                updateToolbar();
            }
        });
        return this;
    };
    $.fn.wysiwyg.defaults = {
        toolbarSelector: '[data-role=editor-toolbar]',
        commandRole: 'edit',
        activeToolbarClass: 'btn-info',
        selectionMarker: 'edit-focus-marker',
        selectionColor: '#328DFF',
        dragAndDropImages: true,
        fileUploadError: function (reason, detail) {
            console.log("File upload error", reason, detail);
        }
    };
}(window.jQuery));