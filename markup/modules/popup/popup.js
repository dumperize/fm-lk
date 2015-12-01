$('.js-close-popup').click(function () {
    $(this).closest('.js-popup').css('display', 'none');
    return false;
});

function showPopUpMessage(text, timeout) {
    if (!timeout) {
        timeout = 3000;
    }
    $('#popup-template').find('.popup__content').html('<div class="popup-alert-text">' + text + '</div>');
    $('#popup-template').fadeIn(500).delay(timeout).fadeOut(500);
}
