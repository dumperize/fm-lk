$('.js-edit-block').click(function () {
    $(this).removeClass('master-data-edit__section-title_edit');
    var currentBlock = $(this).closest('.master-data-edit__section-cont');
    mdeOpenEditBlock(currentBlock);
    sendAjaxLink($(this), writeAlbumEdit);
    return false;
});
$('.js-edit-block-two-steps').click(function () {
    $(this).removeClass('master-data-edit__section-title_edit');
    var currentBlock = $(this).closest('.master-data-edit__section-cont');
    mdeOpenEditBlockTwoSteps(currentBlock);
    return false;
});
$('.js-edit-block-cancel').click(function () {
    var currentBlock = $(this).closest('.master-data-edit__section-cont');
    mdeCloseEditBlock(currentBlock);
    return false;
});
$('.js-edit-block-save').click(function () {
    var currentBlock = $(this).closest('.master-data-edit__section-cont');
    var formId = currentBlock.find('form');
    if (formId.attr('class') == 'mde-service-edit') {
        sendForm(formId, saveServiceForm, errorHandler);
    }
    mdeCloseEditBlock(currentBlock);
    return false;
});
function mdeCloseEditBlock(currentBlock) {
    if (currentBlock.hasClass('two-step') && currentBlock.find('form').is(':visible')) {
        currentBlock.find('form').hide();
        currentBlock.find('.master-data-edit__hide-edit').show();
    } else {
        $('body').removeClass('blackout');
        currentBlock.find('.master-data-edit__section-title').addClass('master-data-edit__section-title_edit');
        currentBlock.removeClass('edit');
        currentBlock.find('form').hide();
        currentBlock.find('.master-data-edit__hide-edit').show();
        currentBlock.find('.mde-btn-cont').hide();
        currentBlock.find('.discounts').removeClass('discounts_edit');  //Убрать элементы редакт. у discounts
        currentBlock.find('.ctrl-btn').hide();                          //Убрать элементы редакт.
        currentBlock.find('.add-new-cont').parent().hide();             //Убрать добавить новый блок
        currentBlock.find('.mde-photo__album-cont').show();             //Показать содержимое альбома
    }
}
function mdeOpenEditBlock(currentBlock) {
    $('body').addClass('blackout');
    currentBlock.addClass('edit');
    currentBlock.find('.master-data-edit__hide-edit').hide();
    currentBlock.find('form').show();
    currentBlock.find('.mde-btn-cont').show();
    autosize(currentBlock.find('textarea'));
    openActualData(currentBlock);
    $('.mde-photo-edit__wrapper').html(''); //очищаем контейнер с фотографиями
}
function mdeOpenEditBlockTwoSteps(currentBlock) {
    $('body').addClass('blackout');
    currentBlock.addClass('edit');
    currentBlock.find('.discounts').addClass('discounts_edit');
    currentBlock.find('.ctrl-btn').fadeIn(400); //отладка
    currentBlock.find('.article-preview').find('.ctrl-btn').fadeIn(400);
    currentBlock.find('.mde-photo__album-cover').find('.ctrl-btn').fadeIn(400).find('.ctrl-btn__publish').hide();
    currentBlock.find('.mde-btn-cont').show();
    currentBlock.find('.mde-useful-read__not-publish').show();
    currentBlock.find('.mde-photo__album-cont').hide();
    addCreateDiscountsBlock();
    addCreateNewBlock(currentBlock);
}
function openActualData(currentBlock) {
    var formId = currentBlock.find('form');
    sendForm(formId, writeActualData, errorHandler);
}
function writeActualData(response, formId) {
    var data = response;
    for (var key in data.data) {
        if (Array.isArray(data.data[key])) {
            formId.find('[name*=' + key + ']').each(function (i) {
                if ($(this).attr('type') == 'checkbox') {
                    for (var j = 0; j < data.data[key].length; j++) {
                        if (data.data[key][j] == $(this).val()) {
                            $(this).attr('checked', true).trigger('change');
                            break;
                        }
                    }
                } else {
                    if (data.data[key][i]) {
                        $(this).val(data.data[key][i]);
                        $(this).closest('p').show();
                    }
                }
            });
        } else {
            var field = $(formId).find('[name=' + key + ']');
            if ($(field).attr('type') == 'checkbox') {
                //alert('if ' + $(field).attr('type'));
                $(field).attr('checked').trigger('change');
            } else if ($(field).attr('type') == 'radio') {
                $(formId).find('[name=' + key + '][value=' + data.data[key] + ']').attr('checked', true).trigger('change');
            } else {
                $(field).val(data.data[key]);
                $(field).closest('p').show();
            }
        }
    }
}