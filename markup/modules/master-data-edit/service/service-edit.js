$('.js-add-service-field').click(function () {
    var formId = $(this).parent('form').first();
    var fields = formId.find('.mde-form-element');
    for (var i = 0; i < fields.length; i++) {
        console.log(fields[i]);
        if ($(fields[i]).is(':hidden')) {
            $(fields[i]).show();
            if (i == 9) {
                $(this).hide();
                alert('Достигнуто максимальное количество услуг');
            }
            break;
        }
    }
    return false;
});

function openActualData(currentBlock) {
    var formId = currentBlock.find('form');
    //var formLength = currentBlock.find('.mde-form-element').length;
    sendForm(formId, writeActualData, errorHandler);
}
function writeActualData(response, formId) {
    var data = response;
    //console.log(formId);
    //for (var key in data.data) {
    //    console.log(data.data[key]);
    //}
    if (formId.attr('class') == 'mde-service-edit') {
        $.each(data.data, function (index, element) {
            var fields = formId.find('.mde-form-element');
            $(fields[index]).val(element);
            $(fields[index]).show();
        });
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
        if (fieldsValHalfSum <= fieldsValSum / 2) {
            $(list[0]).append('<li>' + fieldsVal + '</li>');
        } else {
            $(list[1]).append('<li>' + fieldsVal + '</li>');
        }
        fieldsValHalfSum += fieldsValLength;
    }
}
function successHandler() {
    console.log('ОК!');
}