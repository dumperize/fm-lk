$(document).ready(function () {
    $('.various').click(function () {
        var selector = $(this).attr('href'); //передаем в переменную уникальный id из адресса ссылки
        initCropit(selector);                //Инициализация cropit и jquery-ui slider
        $(selector).find('.js-open-file').trigger('click'); //при клике на ссылке, происходит клик по лейблу с файл инпутом
        //if ($(selector).find('.cropit-image-background').width() != 0) {
        //     $(selector).parents('.js-popup-photo-upload').first().css('display', 'table');
        //}
        return false;
    });
    $('.js-photo-upload').click(function () {
        $('#img-upload').find('.js-open-file').trigger('click');
    });
});
function initCropit(selector) {
    var cropitSelector = selector + '-cropper';
    $(selector).find('.cropit-slider').slider({
        min: 0,
        max: 1,
        step: 0.01
    });
    $(cropitSelector).cropit({
        imageBackground: true,
        onImageLoaded: function (object) {
            console.log($(cropitSelector).cropit('imageSize'));
            //$(selector).parents('.js-popup-photo-upload').first().css('display', 'table');
            //var bgImage = $(cropitSelector).find('.cropit-image-preview').css('background-image');
            //console.log(bgImage.substr(3, bgImage.length - 1));
            //$(cropitSelector).find('.cropit-image-background').attr('src', bgImage.substr(4, bgImage.length - 2));
            if ($(selector).is(':hidden')) {
                $.fancybox.open('#img-upload',
                    {
                        maxWidth: 800,
                        maxHeight: 600,
                        width: '70%',
                        height: '70%',
                        autoSize: false,
                        closeEffect: 'none',
                        afterClose: function () {
                            $(selector).find('form').trigger('reset');
                        }
                    });
            }
            $(selector).find('.cropit-slider').slider('option', 'min', $(cropitSelector).cropit('zoom'));
            $(selector).find('.cropit-slider').slider('option', 'value', $(cropitSelector).cropit('zoom'));
        }
    });

}
//Передаем значение value из jquery-ui slider в cropit для увел./умен. изображения
$('.cropit-slider').on('slide', function (event, ui) {
    $(this).parents('.image-cropper').first().cropit('zoom', ui.value);
    $(this).parents('.image-cropper').first().cropit('zoom', ui.value);
});
//Загрузка данных на сервер и вставка обрез. изображения в аватарку до загрузки на сервер
$('.js-download-image-btn').click(function () {
        var data = $(this).parents('.js-popup-photo-upload').first().find('.image-cropper').first().cropit('export');
        $.ajax({
            url: $(this).attr('href'),
            dataType: 'json',
            type: 'POST',
            data: {
                img: data
            },
            success: function (response) {
                if (response.success) {
                    console.log(response);
                }
            }
        });
        $('.js-popup-photo-upload').hide();
        $('.master-data-edit__avatar').attr('src', data); //вставка обрез. изображения в аватарку
        return false;
    }
);
//При клике на cropit-image-preview меняем вид курсора
$('.cropit-image-preview').mousedown(function () {
    $('.cropit-image-preview').css({
        cursor: '-webkit-grabbing'
    });
});
$('.cropit-image-preview').mouseup(function () {
    $('.cropit-image-preview').css('cursor', '');
});