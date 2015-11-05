$('.js-show-popup').click(function () {
    $(this).parents('div').first().find('.js-popup').css('display', 'table');
    return false;
});

