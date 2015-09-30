$(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.js-to-top').css('display', 'block');
    } else {
        $('.js-to-top').hide();
    }
});
$('.js-to-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 1000);
    return false;
});