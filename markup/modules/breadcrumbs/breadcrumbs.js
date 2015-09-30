$('.js-parent-rub').click(function () {
    var pos = $('.js-parent-rub').position().left + $('.js-parent-rub').width();
    console.log(pos);
    $('.js-breadcrumbs-list').css('left', pos).toggle();
    return false;

});