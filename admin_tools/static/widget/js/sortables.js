/**
 * List sortables
 */
var Suit = { $: django.jQuery.noConflict() };
if (!$) $ = Suit.$;
$(document).ready(function () {
    var $ = Suit.$;
    // Register callbacks to perform after inline has been added
    Suit.after_inline = function () {
        var functions = {};
        var register = function (fn_name, fn_callback) {
            functions[fn_name] = fn_callback;
        };

        var run = function (inline_prefix, row) {
            for (var fn_name in functions) {
                functions[fn_name](inline_prefix, row);
            }
        };

        return {
            register: register,
            run: run
        };
    }();

    // Backwards compatiblity
    SuitAfterInline = Suit.after_inline;

    /**
     * Fixed submit buttons.
     */
    $.fn.suit_fixed = function () {
        $(this).each(function () {
            // extra_offset: 70 (60 Footer height + 10 top offset)
            var $fixed_item = $(this), pos = $fixed_item.offset(), extra_offset = 70;
            $(window).bind('scroll.sl resize.sl load.sl', function (e) {
                var $win = $(this), scroll_top = $win.scrollTop();
                if ($fixed_item.height() < $win.height() &&
                    scroll_top > (pos.top - 10) &&
                    $fixed_item.height() < $win.height()) {
                    !$fixed_item.hasClass('fixed') && $fixed_item.addClass('fixed');
                    var max_top = Math.min(10, $(document).height() - $fixed_item.height() - scroll_top - extra_offset);
                    $fixed_item.css('top', max_top + 'px');
                }
                else if (scroll_top <= (pos.top - 10) &&
                    $fixed_item.hasClass('fixed')) {
                    $fixed_item.removeClass('fixed');
                }
            });

            $(window).trigger('scroll.sl');
        });
    };


    /**
     * Search filters - submit only changed fields
     */
    $.fn.suit_search_filters = function () {
        $(this).change(function () {
            var $field = $(this);
            var $option = $field.find('option:selected');
            var select_name = $option.data('name');
            if (select_name) {
                $field.attr('name', select_name);
            } else {
                $field.removeAttr('name');
            }
            // Handle additional values for date filters
            var additional = $option.data('additional');
            if (additional) {
                var hidden_id = $field.data('name') + '_add';
                var $hidden = $('#' + hidden_id);
                if (!$hidden.length) {
                    $hidden = $('<input/>').attr('type', 'hidden').attr('id', hidden_id);
                    $field.after($hidden);
                }
                additional = additional.split('=');
                $hidden.attr('name', additional[0]).val(additional[1])
            }
        });
        $(this).trigger('change');
    };

    /**
     * Linked select - shows link to related item after Select
     */
    $.fn.suit_linked_select = function () {

        var get_link_name = function ($select) {
            var text = $select.find('option:selected').text();
            return text && $select.val() ? text + '' : '';
        };

        var get_url = function ($add_link, $select) {
            var value = $select.val();
            return $add_link.attr('href') + '../' + value + '/';
        };

        var add_link = function ($select) {
            var $add_link = $select.next();
            if ($add_link.hasClass('add-another')) {
                var $link = $add_link.next('a');
                if (!$link.length) {
                    $link = $('<a/>').addClass('linked-select-link');
                    $add_link.after($link).after(' &nbsp; ');
                }
                $link.text(get_link_name($select));
                $link.attr('href', get_url($add_link, $select));
            }
        };

        $(this).each(function () {
            add_link($(this));
        });
        /*
         $(document).on('change', this.selector, function () {
         add_link($(this));
         });*/
    };

    /**
     * Content tabs
     */
    $.fn.suit_form_tabs = function () {

        var $tabs = $(this);
        var tab_prefix = $tabs.data('tab-prefix');
        if (!tab_prefix)
            return;

        var $tab_links = $tabs.find('a');

        function tab_contents($link) {
            return $('.' + tab_prefix + '-' + $link.attr('href').replace('#', ''));
        }

        function activate_tabs() {
            // Init tab by error, by url hash or init first tab
            if (window.location.hash) {
                var found_error;
                $tab_links.each(function () {
                    var $link = $(this);
                    if (tab_contents($link).find('.error').length != 0) {
                        $link.addClass('error');
                        $link.trigger('click');
                        found_error = true;
                    }
                });
                !found_error && $($tabs).find('a[href=' + window.location.hash + ']').click();
            } else {
                $tab_links.first().trigger('click');
            }
        }

        $tab_links.click(function () {
            var $link = $(this);
            $link.parent().parent().find('.active').removeClass('active');
            $link.parent().addClass('active');
            $('.' + tab_prefix).removeClass('show').addClass('hide');
            tab_contents($link).removeClass('hide').addClass('show')
        });

        activate_tabs();
    };


    $(function () {

        // Fixed submit buttons
        $('.inner-right-column').suit_fixed();

        // Show link to related item after Select
        $('.linked-select').suit_linked_select();

        // Handle change list filter null values
        $('.search-filter').suit_search_filters();

    });

});

(function ($) {
    $.fn.suit_list_sortable = function () {
        var $inputs = $(this);
        if (!$inputs.length)
            return;

        // Detect if this is normal or mptt table
        var mptt_table = $inputs.first().closest('table').hasClass('table-mptt');

        function perform_move($arrow, $row) {
            var $next, $prev;
            if (mptt_table) {
                function get_padding($tr) {
                    return parseInt($tr.find('th:first').css('padding-left'));
                }

                function find_with_children($tr) {
                    var padding = get_padding($tr);
                    return $tr.nextUntil(function () {
                        return get_padding($(this)) <= padding
                    }).andSelf();
                }

                $('.selected').removeClass('selected');
                var padding = get_padding($row);
                var $rows_to_move = find_with_children($row);
                if ($arrow.data('dir') === 'down') {
                    $next = $rows_to_move.last().next();
                    if ($next.length && get_padding($next) === padding) {
                        var $after = find_with_children($next).last();
                        if ($after.length) {
                            $rows_to_move.insertAfter($after).addClass('selected');
                        }
                    }
                } else {
                    $prev = $row.prevUntil(function () {
                        return get_padding($(this)) <= padding
                    }).andSelf().first().prev();
                    if ($prev.length && get_padding($prev) === padding) {
                        $rows_to_move.insertBefore($prev).addClass('selected')
                    }
                }
            } else {
                $('.selected').removeClass('selected');
                if ($arrow.data('dir') === 'down') {
                    $next = $row.next();
                    if ($next.is(':visible') && $next.length) {
                        $row.insertAfter($next).addClass('selected')
                    }
                } else {
                    $prev = $row.prev();
                    if ($prev.is(':visible') && $prev.length) {
                        $row.insertBefore($prev).addClass('selected')
                    }
                }
            }
        }

        function on_arrow_click(e) {
            perform_move($(this), $(this).closest('tr'));
            e.preventDefault();
        }

        function create_link(text, direction) {
            return $('<a/>').attr('href', '#')
                .addClass('sortable sortable-' + direction)
                .attr('data-dir', direction).html(text)
                .click(on_arrow_click);
        }

        $inputs.each(function () {
            var $inline_sortable = $('<div class="inline-sortable"/>');
            var icon = '<i class="icon-arrow-up icon-alpha5"></i>';
            $(this).parent().append($inline_sortable);
            $inline_sortable.append(create_link(icon, 'up'));
            $inline_sortable.append(create_link(icon.replace('-up', '-down'), 'down'));
        });

        // Filters out unchanged selects and sortable field itself
        function filter_unchanged(i, input) {
            if (input.type == 'select-one' || input.type == 'select-multiple') {
                for (var j = 0; j < input.options.length; j++) {
                    if (input.options[j].selected == input.options[j].defaultSelected) {
                        return false;
                    }
                }
            } else if ($(input).hasClass('suit-sortable')) {
                return false;
            }
            return true;
        }

        // Update input count right before submit
        if ($inputs && $inputs.length) {
            var $last_input = $inputs.last();
            var selector = $(this).selector;
            $($last_input[0].form).submit(function (e) {
                var i = 0;
                $(selector).each(function () {
                    var $input = $(this);
                    var fieldset_id = $input.attr('name').split('-')[0];
                    // Check if any of new dynamic block values has been added
                    var $set_block = $input.closest('.dynamic-' + fieldset_id);
                    if (!$set_block.length || $set_block.find(":input[value!=''][type!='hidden']").filter(filter_unchanged).serialize()) {
                        value = i++;
                        $input.val(value);
                    }
                });
            });
        }

        Suit.after_inline.register('bind_sortable_arrows', function (prefix, row) {
            $(row).find('.sortable').click(on_arrow_click);
        })
    };


    $(function () {
        $('.suit-sortable').suit_list_sortable();
    });

}(django.jQuery));