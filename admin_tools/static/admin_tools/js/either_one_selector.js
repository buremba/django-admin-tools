var $ = django.jQuery;

$(document).ready(function () {

    var fields = $('.require_one_of');
    var grouped_fields = [];
    fields.each(function () {
        var $this = $(this);
        if (!grouped_fields[$this.attr('require_one_of_id')])
            grouped_fields[$this.attr('require_one_of_id')] = []
        grouped_fields[$this.attr('require_one_of_id')].push($this.closest('.form-row')[0])
    });
    for (var gidx = 0; gidx < grouped_fields.length; gidx++) {
        fields = grouped_fields[gidx];
        var firstone, fieldname;
        fields.forEach(function(i) {
            if ($(i).find("[name]").val().length>0) firstone = $(i), fieldname = $(i).find("[name]").attr('name');
        });
        if (!firstone) {
            firstone = $(fields[0]);
            fieldname = $(fields[0]).find("[name]").attr('name');
        }
        var options = [];
        fields.forEach(function (_this) {
            for (var i = 0; i < _this.classList.length; i++) if (_this.classList[i].match(/^field-/)) {
                fname = _this.classList[i].replace('field-', '');
                options.push([fname, $(_this).find('.label label').text()]);
                break;
            }
            firstone.children(0).append($(_this).find('.fieldcontent').not('.either-one-of-content').css('display', 'none').addClass(fname).addClass('either-one-of-content'));
            $(_this).hide()
        });
        var optionstr = [];
        var nameselect = [];
        for (var i = 0; i < options.length; i++) {
            optionstr.push('<option value=' + options[i][0] + '>' + options[i][1] + '</option>');
            nameselect.push(options[i][0]);
        }
        firstone.show().find('.label').html('<select name=' + nameselect.join('-') + '-selector>' + optionstr.join() + '</select>').find('select').change(function () {
            var area = $(this).closest('.form-row').find('.fieldcontent');
            area.find('input, select, textarea').val('').attr('disabled', true);
            area.hide().filter('.' + this.value).show();
            $('.fieldcontent.'+this.value).find('input, select, textarea').removeAttr('disabled');
        }).val(fieldname)
        firstone.find('.fieldcontent.'+fieldname).show();
    }
});