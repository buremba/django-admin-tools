django.jQuery(document).ready(function () {
    var $ = django.jQuery, category = $('.class_category'), area = $('fieldset.eav-django-field-area'), h2 = area.find("h2"), id = $('#id_hidden-eav-pk').text() || '';
    window.extrafield_url = django.jQuery('#id_hidden-eav-endpoint-url').text();
    var lookup = function () {
        django.jQuery.get(extrafield_url + "/" + category.val() + "/" + id, function (data) {
            area.html('').append(h2).append(data);
        });
    }
    category.change(lookup);
});