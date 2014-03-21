(function ($) {
    $(document).ready(function () {
        // Add anchor tag for Show/Hide link
        $("div.fieldset.collapse").each(function (i, elem) {
            var fieldset = $(elem).find('fieldset');
            if (fieldset.find("div.errors").length == 0) {
                fieldset.addClass("collapsed");
                $(elem).addClass("collapsed").find("h3.fieldsetHeader").first().append(' (<a id="fieldsetcollapser' +
                    i + '" class="collapse-toggle" href="#">' + gettext("Show") +
                    '</a>)');
            }
        });
        // Add toggle to anchor tag
        $("div.fieldset.collapse a.collapse-toggle").click(function() {
            var parent = $(this).closest('div.fieldset.collapse');
            if(parent.hasClass('collapsed'))
                $(this).text(gettext("Hide")).closest(".fieldset").find('fieldset').removeClass("collapsed").trigger("show.fieldset", [$(this).attr("id")]).closest('div.fieldset').removeClass("collapsed");
            else
                $(this).text(gettext("Show")).closest(".fieldset").find('fieldset').addClass("collapsed").trigger("hide.fieldset", [$(this).attr("id")]).closest('div.fieldset').addClass("collapsed");

            return false;
        });
    });
})(django.jQuery);