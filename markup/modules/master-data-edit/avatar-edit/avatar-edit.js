$('#image-cropper').cropit({
    imageBackground: true,
    onImageLoaded: function (object) {
        $('.slider-wrapper').show();
        $('.single-slider').jRange({
            from: $('#image-cropper').cropit('zoom'),
            to: 1,
            step: 0.01,
            scale: ['', ''],
            format: '%s',
            width: 130,
            showLabels: false,
            onstatechange: function () {
                $('#image-cropper').cropit('zoom', $('.single-slider').val());
            }
        });
    }
});