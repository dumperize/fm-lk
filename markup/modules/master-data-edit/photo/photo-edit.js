$('.js-add-photo-to-album').click(function () {
    $(this).closest('.mde-photo-edit').find('.mde-photo-edit__input-photo-load').trigger('click');
    return false;
});
$('.js-photo-load').change(function (e) {
    var files = e.target.files;
    var errFiles = [];
    var completeFiles = 0;
    var filesCount = Object.keys(files).length;
    //var maxElem = $(this).closest('.mde-photo-edit').data('maxElem');
    //var maxElemExisting = $(this).closest('.mde-photo-edit').children('.mde-photo-edit__wrapper').find('.mde-photo-edit__elem-cont').length;
    //console.log(maxElemExisting);

    for (var i = 0, file; file = files[i]; i++) {
        //if (i == (maxElem - maxElemExisting)) {
        //    alert('Достигнуто максимальное количество фотографий в альбоме.');
        //    break;
        //}
        canvasResize(file, {
            width: 800,
            height: 0,
            crop: false,
            quality: 80,
            //rotate: 90,
            callback: function (data, width, height) {
                if (width >= 220 && height >= 220) {
                    setTimeout(
                        function () {
                            addPhotoToAlbum(data);
                        },
                        400 * completeFiles); //посмотреть, что файлы загружаются поочередно
                } else {
                    errFiles.push(this.name);
                }
                completeFiles++;
                if (completeFiles >= filesCount && errFiles.length > 0) {
                    setTimeout(
                        function () {
                            if (errFiles.length == 1) {
                                alert('Изображение: ' + errFiles + ' слишком маленькое.\nОстальные изображения были загружены.');
                            } else {
                                alert('Изображения: ' + errFiles + ' слишком маленькие.\nОстальные изображения были загружены.');
                            }
                        },
                        500);
                }
            }.bind(file)
        });
    }
    $(this).closest('.mde-photo-edit').trigger('reset');
});
function addPhotoToAlbum(data) {

    if (checkMaxAlbumElem()) {
        return false;
    }
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
    checkMaxAlbumElem();
}
function checkMaxAlbumElem() {
    var maxElem = $('.mde-photo-edit').data('maxElem');
    var maxElemExisting = $('.mde-photo-edit').children('.mde-photo-edit__wrapper').find('.mde-photo-edit__elem-cont').length;

    if (maxElem == maxElemExisting) {
        //alert('Достигнуто максимальное количество фотографий в альбоме.');
        showPopUpMessage('Достигнуто максимальное количество фотографий в альбоме!', 3000);
        $('.mde-photo-edit__add-btn').hide();
        return true;
    }
    return false;
}