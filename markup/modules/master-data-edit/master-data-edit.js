$('.js-edit-block').click(function () {
    $('body').addClass('blackout');
    $(this).removeClass('master-data-edit__section-title_edit');
    var currentBlock = $(this).parents('.master-data-edit__section-cont').first();
    currentBlock.addClass('edit');
    currentBlock.find('.master-data-edit__hide-edit').hide();
    currentBlock.find('form').show();
    currentBlock.find('.mde-btn-cont').show();
    currentBlock.find('textarea').elastic();
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
function successHandler() {
    console.log('ОК!');
}
function openActualData(currentBlock) {
    var formId = currentBlock.find('form');
    //var formLength = currentBlock.find('.mde-form-element').length;
    sendForm(formId, writeActualData, errorHandler);
}
function writeActualData(response, formId) {
    //console.log(formId.find('.mde-form-element').first().attr('name'));
    var data = response;
    for (var key in data.data) {
        //console.log(key + '' + data.data[key]);
        if (Array.isArray(data.data[key])) {
            formId.find('[name*=' + key + ']').each(function (i) {
                if ($(this).attr('type') == 'checkbox') {
                    for (var j = 0; j < data.data[key].length; j++) {
                        if (data.data[key][j] == $(this).val()) {
                            $(this).attr('checked', true);
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
                $(field).attr('checked');
            } else if ($(field).attr('type') == 'radio') {
                $(formId).find('[name=' + key + '][value=' + data.data[key] + ']').attr('checked', true);
            } else {
                $(field).val(data.data[key]);
                $(field).closest('p').show();
            }
        }
    }
}

