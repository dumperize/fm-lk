$('a.js-scrollto[href^=#]').each(function () {
    var $target = $(this.hash);

    $(this).on('click', function () {
        if ($target.length > 0) {
            $('html, body').animate({scrollTop: $target.offset().top}, 'slow');
        }
        return false;
    });
});


// запрос на валидацию формы
function sendForm(form_DOM, successHandler, errorHandler) {
    jQuery.ajax({
        url: form_DOM.attr('action'),
        type: form_DOM.attr('method'),
        dataType: 'json',
        data: form_DOM.serialize(),
        success: function (response) {
            if (response.success) {
                form_DOM.find('.error-summary').remove();
                successHandler(response);
            } else {
                form_DOM.find('.error-summary').remove();
                form_DOM.prepend('<div class="error-summary format">' + response.errorSummary + '</div>');
                form_DOM.find('.error').removeClass('.error');
                for (var k in response.fields) {
                    form_DOM.find('[name="' + response.object + '[' + k + ']"]').addClass('error');
                }
                if (errorHandler) {
                    errorHandler(response);
                }
            }
        },
        error: function (response) {
            form_DOM.find('.error-summary').remove();
            form_DOM.prepend('<div class="error-summary format">Ошибка при отправке формы, попробуйте еще раз.</div>');
        },
        cache: false
    });
}

function yandexGoal_showPhone(masterID) {
    yaCounter21591305.reachGoal("show_number", {
        "master": masterID
    });
    return true;
}

$('a.scrollto[href^=#]').each(function () {
    var $target = $(this.hash);

    $(this).on('click', function () {
        if ($target.length > 0) {
            $('html, body').animate({scrollTop: $target.offset().top}, 'slow');
        }
        return false;
    });
});