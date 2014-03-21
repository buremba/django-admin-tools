django.jQuery(document).ready(function () {

    django.jQuery(".advancedfileinput").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            var $this = django.jQuery(this);
            reader.onload = function (e) {
                $this.siblings('img.preupload_thumbnail').attr('src', e.target.result);
            }

            reader.readAsDataURL(this.files[0]);
        }
    });
});