$(document).ready(function () {

    //$('body').on('focus', '.timepickerfield', function(){
    $(".timepickerfield").mask({
        mask: "HH:mm",
        definitions: {
            HH: function (value) {
                value = parseInt(value, 10);
                if (value >= 1 && value <= 24) {
                    return ( value < 10 ? "0" : "" ) + value;
                }
            },
            mm: sixty
        }
    });
    //});
});