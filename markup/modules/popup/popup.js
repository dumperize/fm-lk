$('.js-close-popup').click(function () {
    $(this).closest('.js-popup').css('display', 'none');
    $('#popup-template').stop();
    return false;
});
function showPopUpMessage(text, timeout) {
    if (!timeout) {
        timeout = 3000;
    }
    if ($('#popup-template').is(':visible')) {
        setTimeout(function () {
            return showPopUpMessage(text);
        }, (timeout / 10));
    } else {
        $('#popup-template').find('.popup__content').html('<div class="popup-alert-text"><p>' + text + '</p></div>')
            .closest('#popup-template').fadeIn(500).delay(timeout).fadeOut(500);
    }
}