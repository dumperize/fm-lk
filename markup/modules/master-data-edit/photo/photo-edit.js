$('.js-add-photo-to-album').click(function () {
    $(this).closest('.mde-photo-edit').find('.mde-photo-edit__input-photo-load').trigger('click');
    return false;
});
$('.js-photo-load').change(function (e) {
    var file = e.target.files[0];
    var id = '#' + $(this).parents('.img-upload').first().attr('id');
    canvasResize(file, {
        width: 800,
        height: 0,
        crop: false,
        quality: 80,
        //rotate: 90,
        callback: function (data, width, height) {
            if (width >= 220 && height >= 220) {
                console.log('!');
                addPhotoToAlbum(data);
            } else {
                alert('Слишком маленькое изображение.\nВыберите другое изображение.');
                //$(id).find('.js-open-file').trigger('click');     //снова просим выбрать файл
            }
        }
    });
});
function addPhotoToAlbum(data) {
    $('.mde-photo-edit').find('#elem-cont-template')
        .clone(true)
        .removeAttr('id')
        .appendTo('.mde-photo-edit__wrapper')
        .hide()
        .fadeIn(500)
        .find('.mde-photo-edit__img')
        .attr('src', data)
        .closest('.mde-photo-edit__img-cont').siblings('textarea').val('')
        .closest('.mde-photo-edit__wrapper').append('<div class="mde-photo-edit__clear-div"></div>');
    autosize($('.mde-photo-edit').find('textarea'));
}