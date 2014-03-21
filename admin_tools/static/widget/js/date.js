$.widget("ui.timespinner", $.ui.spinner, {
    options: {
        // seconds
        step: 60 * 1000,
        // hours
        page: 60
    },

    _parse: function (value) {
        if (typeof value === "string") {
            // already a timestamp
            if (Number(value) == value) {
                return Number(value);
            }
            return +Globalize.parseDate(value);
        }
        return value;
    },

    _format: function (value) {
        return Globalize.format(new Date(value), "t");
    }
});

$(document).ready(function () {
    function sixty(value) {
        value = parseInt(value, 10);
        if (value >= 0 && value <= 59) {
            return ( value < 10 ? "0" : "" ) + value;
        }
    }


    $(".datepickerfield").not('.daterange').datepicker({dateFormat: 'yy-mm-dd'});

    $(".daterange").datepicker({
        numberOfMonths: 2,
        dateFormat: 'yy-mm-dd',
        showButtonPanel: true,
        onClose: function (selectedDate) {
            $this = $(this);
            if ($this.hasClass('daterange')) {
                if ($this.attr('data-position') == 'start')
                    $('[data-auto="' + $this.attr('data-target') + '"]').datepicker("option", "minDate", selectedDate);
                else if ($this.attr('data-position') == 'end')
                    $('[data-auto="' + $this.attr('data-target') + '"]').datepicker("option", "maxDate", selectedDate);
            }
        }
    });

});