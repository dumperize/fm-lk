$('.js-photo-upload').click(function () {
    $('.js-open-file').trigger('click');
    if ($('.cropit-image-background').width() != 0) {
        $('.js-popup-photo-upload').css('display', 'table');
    }
    return false;
});
$('#image-cropper').cropit({
    imageBackground: true,
    onImageLoaded: function (object) {
        $('.js-popup-photo-upload').css('display', 'table');
        $('.single-slider').jRange({
            from: $('#image-cropper').cropit('zoom'),
            to: 1,
            step: 0.01,
            scale: ['', ''],
            format: '%s',
            width: 130,
            showLabels: false,
            theme: 'theme-blue',
            onstatechange: function () {
                $('#image-cropper').cropit('zoom', $('.single-slider').val());
            }
        });
        console.log($('#image-cropper').cropit('zoom'));
    }
});
$('.cropit-image-preview').mousedown(function () {
    $('.cropit-image-preview').css({
        cursor: '-webkit-grabbing'
    });
});
$('.cropit-image-preview').mouseup(function () {
    $('.cropit-image-preview').css('cursor', '');
});
$('.js-download-image-btn').click(function () {
        var data = $('#image-cropper').cropit('export');
        $.ajax({
            url: $(this).attr('href'),
            dataType: 'json',
            type: 'POST',
            data: { img: data },
            success: function (response) {
                if (response.success) {
                    console.log(response);
                }
            }
        });
        $('.js-popup-photo-upload').hide();
        $('.master-data-edit__avatar').attr('src', data);
        return false;
    }
);