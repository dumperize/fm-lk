$('.js-edit-block').click(function () {
    $('body').addClass('blackout');
    $(this).removeClass('master-data-edit__section-title_edit');
    var currentBlock = $(this).parents('.master-data-edit__section-cont').first();
    currentBlock.addClass('edit');
    currentBlock.find('.master-data-edit__hide-edit').hide();
    currentBlock.find('form').show();
    currentBlock.find('.mde-btn-cont').show();
    openActualData(currentBlock);
    return false;
});
$('.js-edit-block-cancel').click(function () {
    var currentBlock = $(this).parents('.master-data-edit__section-cont').first();
    mdeCloseEditBlock(currentBlock);
    return false;
});
$('.js-edit-block-save').click(function () {
    var currentBlock = $(this).parents('.master-data-edit__section-cont').first();
    var formId = currentBlock.find('form');
    if (formId.attr('class') == 'mde-service-edit') {
        sendForm(formId, saveServiceForm, errorHandler);
    }
    mdeCloseEditBlock(currentBlock);
    return false;
});
function mdeCloseEditBlock(currentBlock) {
    $('body').removeClass('blackout');
    currentBlock.find('.js-edit-block').addClass('master-data-edit__section-title_edit');
    currentBlock.removeClass('edit');
    currentBlock.find('form').hide();
    currentBlock.find('.master-data-edit__hide-edit').show();
    currentBlock.find('.mde-btn-cont').hide();
}
function errorHandler(response) {
    alert('Ошибка!');
}
function sucseesHandler(response) {
    alert('Ура!');
}

