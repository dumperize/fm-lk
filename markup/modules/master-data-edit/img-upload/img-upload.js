$(document).ready(function () {
    $('.js-photo-upload').click(function () {
        var selector = $(this).attr('href');   //передаем в переменную уникальный id из адресса ссылки
        $(selector).find('.js-open-file').trigger('click'); //при клике на ссылке, происходит клик по лейблу с файл инпутом
        return false;
    });
    $('.js-photo-upload-btn').click(function () {
        $(this).parents('.img-upload').first().find('.js-open-file').trigger('click'); //при клике на кнопку, происходит клик по лейблу с файл инпутом
        return false;
    });
});
$('.js-input-photo').change(function (e) {
    var file = e.target.files[0];
    var id = '#' + $(this).parents('.img-upload').first().attr('id');
    canvasResize(file, {
        width: 800,
        height: 0,
        crop: false,
        quality: 80,
        //rotate: 90,
        callback: function (data, width, height) {
            if (width >= 200 && height >= 200) {
                initCropit(id);                                         //Инициализация cropit
                $(id).find(id + '-cropper').cropit('imageSrc', data);   //передаем в cropit data (изображение)
            } else {
                alert('Слишком маленькое изображение.\nВыберите другое изображение.');
                $(id).find('.js-open-file').trigger('click');     //снова просим выбрать файл
            }
        }
    });
});
//Инициализация cropit и jquery-ui slider
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
            if ($(selector).is(':hidden')) {
                $('body').addClass('blackout');
                $(selector).css('z-index', '1001');
                $(selector).show();
                $('html, body').animate({
                    scrollTop: $(selector).offset().top
                }, 600);
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
        var data = $(this).parents('.img-upload').first().find('.image-cropper').first().cropit('export');
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
        $('.master-data-edit__avatar').attr('src', data); //вставка обрез. изображения в аватарку
        closeImgUpload(this);
        return false;
    }
);
//Закрытые псевдоокна
$('.js-close-ico').click(function () {
    closeImgUpload(this);
});
function closeImgUpload(selector) {
    $(selector).parents('.img-upload').first().css('display', 'none');
    $(selector).parents('.img-upload').find('form').trigger('reset');
    $('body').removeClass('blackout');
}
//При клике на cropit-image-preview меняем вид курсора
$('.cropit-image-preview').mousedown(function () {
    $('.cropit-image-preview').addClass('grabbing');

});
$('.cropit-image-preview').mouseup(function () {
    $('.cropit-image-preview').removeClass('grabbing');
});
//$.fancybox.open(selector,
//    {
//        minWidth: '600px',
//        closeEffect: 'none',
//        afterClose: function () {
//            $(selector).find('form').trigger('reset');
//        }
//    });