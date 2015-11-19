$('.js-discount-type-change').find('input').change(function () {
    if ($(this).attr('data-id') == 0) {
        $('.js-discount-type-value').hide();
    } else if ($(this).attr('data-id') == 1) {
        $('.js-discount-type-value').show();
        $('#disc-value').html(' %');
    } else if ($(this).attr('data-id') == 2) {
        $('.js-discount-type-value').show();
        $('#disc-value').html(' руб.');
    }
});
