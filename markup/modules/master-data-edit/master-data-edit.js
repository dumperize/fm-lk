$('.js-edit-block').click(function () {
    $('body').addClass('blackout');
    $(this).removeClass('master-data-edit__section-title_edit');
    $(this).parents('.master-data-edit__section-cont').first().addClass('edit');
    return false;
});
$('.js-edit-block-cancel').click(function () {
    $('body').removeClass('blackout');
    $('.js-edit-block').addClass('master-data-edit__section-title_edit');
    $(this).parents('.master-data-edit__section-cont').first().removeClass('edit');
    return false;
});

