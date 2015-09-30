$(document).on('click', '.js-show-phone', function () {
    $(this).hide().parent().find('.js-show-phone_details').show();
    tellAboutUs($(this), '.master_photo-and-contacts__contact-wrap');
    yandexGoal_showPhone($(this).attr('data-id'));
});