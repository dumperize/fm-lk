$('.js-add-service-field').click(function () {
    var formId = $(this).parent('form').first();
    var fields = formId.find('.mde-form-element');
    for (var i = 0; i < fields.length; i++) {
        if ($(fields[i]).closest('p').is(':hidden')) {
            $(fields[i]).closest('p').show();
            if (i + 1 == fields.length) {
                $(this).hide();
                formId.find('.mde-service-edit__max-service').show();
                formId.find('.mde-service-edit__max-service').delay(3000).fadeOut('slow');
            }
            break;
        }
    }
    return false;
});
//$('.mde-form-element').elastic();
$('.js-del-service-field').click(function () {
    confirm('Удалить услугу?');
    $(this).closest('p').hide();
    $(this).siblings('textarea').val('');
    $('.js-add-service-field').show();
});

function openActualData(currentBlock) {
    var formId = currentBlock.find('form');
    //var formLength = currentBlock.find('.mde-form-element').length;
    sendForm(formId, writeActualData, errorHandler);
}
function writeActualData(response, formId) {
    //console.log(formId.find('.mde-form-element').first().attr('name'));
    var data = response;
    if (formId.attr('class') == 'mde-service-edit2') {
        $.each(data.data, function (index, element) {
            var fields = formId.find('.mde-form-element');
            $(fields[index]).val(element);
            $(fields[index]).closest('p').show();
        });
    } else {
        for (var key in data.data) {
            //console.log(key + '' + data.data[key]);
            if (Array.isArray(data.data[key])) {
                formId.find('[name*=' + key + ']').each(function (i) {
                    if (data.data[key][i]) {
                        $(this).val(data.data[key][i]);
                        $(this).closest('p').show();
                    }
                });
            } else {
                formId.find('[name=' + key + ']').val(data.data[key]);
            }
        }
    }
}
function saveServiceForm(response, formId) {
    var list = formId.parent('.master-data-edit__section-cont').first().find('.mde-service__list');
    //var formId = currentBlock.find('form');
    var fields = formId.find('.mde-form-element');
    var fieldsValSum = 0;
    var fieldsValHalfSum = 0;
    list.html('');
    for (var i = 0; fields.length > i; i++) {
        var fieldsVal = $(fields[i]).val();
        var fieldsValLength = fieldsVal.length;
        if (fieldsVal == '') {
            continue;
        }
        if (fieldsValLength < 30) {
            fieldsValLength = 30;
        }
        fieldsValSum += fieldsValLength;
    }
    for (var i = 0; fields.length > i; i++) {
        var fieldsVal = $(fields[i]).val();
        var fieldsValLength = fieldsVal.length;
        if (fieldsVal == '') {
            continue;
        }
        if (fieldsValLength < 30) {
            fieldsValLength = 30;
        }
        //console.log(fieldsValHalfSum + ' ' + fieldsValSum);
        if (fieldsValHalfSum < fieldsValSum / 2) {
            $(list[0]).append('<li>' + fieldsVal + '</li>');
        } else {
            $(list[1]).append('<li>' + fieldsVal + '</li>');
        }
        fieldsValHalfSum += fieldsValLength;
    }
}