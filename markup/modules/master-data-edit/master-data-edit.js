$('.js-show-popup').click(function () {
    $(this).parents('div').first().find('.js-popup').css('display', 'table');
    return false;
});
//$(document).ready(function () {
//    $('#img-upload').fancybox({
//        maxWidth: 800,
//        maxHeight: 600,
//        fitToView: false,
//        width: '70%',
//        height: '70%',
//        autoSize: false,
//        closeClick: false,
//        openEffect: 'none',
//        closeEffect: 'none'
//    });
//});

