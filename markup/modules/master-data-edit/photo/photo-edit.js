$('.js-add-photo-to-album').click(function () {
    $(this).closest('.mde-photo-edit').find('.mde-photo-edit__input-photo-load').trigger('click');
    return false;
});
$('.js-photo-load').change(function (e) {
    var files = e.target.files;
    var errFiles = [];
    var completeFiles = 0;
    var filesCount = Object.keys(files).length;
    var toMuchFiles = [];

    for (var i = 0, file; file = files[i]; i++) {
        canvasResize(file, {
            width: 800,
            height: 0,
            crop: false,
            quality: 80,
            //rotate: 90,
            callback: function (data, width, height) {
                if (width >= 220 && height >= 220) {
                    if (checkMaxAlbumElem()) {
                        toMuchFiles.push(this.name);
                    } else {
                        console.log(this.name + '_' + new Date().getTime());
                        $.ajax({
                            url: $('.mde-photo-edit').attr('action'),
                            dataType: 'json',
                            type: 'GET', //важно! заменить на POST!
                            data: {
                                //img: data
                            },
                            success: function (response) {
                                if (response.success) {
                                    addPhotoToAlbum(data);
                                    console.log('success!');
                                }
                            }
                        });
                    }
                } else {
                    errFiles.push(this.name);
                }
                completeFiles++;
                //console.log(completeFiles + ' ' + filesCount);
                if (completeFiles >= filesCount && errFiles.length > 0) {
                    if (errFiles.length == 1 && 1 == filesCount) {
                        showPopUpMessage('Изображение: ' + errFiles + ' слишком маленькое.');
                    } else if (errFiles.length == 1 && 2 <= filesCount) {
                        showPopUpMessage('Изображение: ' + errFiles + ' слишком маленькое.<br>Остальные изображения были загружены.');
                    } else {
                        showPopUpMessage('Изображения: ' + errFiles + ' слишком маленькие.<br>Остальные изображения были загружены.');
                    }
                }
                if (completeFiles >= filesCount && toMuchFiles.length > 0) {
                    showPopUpMessage('Изображения: ' + toMuchFiles + ' не были загружены.<br>Закончилось место в альбоме.');
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
    if (checkMaxAlbumElem()) {
        showPopUpMessage('Достигнуто максимальное количество фотографий в альбоме!');
        $('.mde-photo-edit__add-btn').hide();
    }
    return true;
}
function checkMaxAlbumElem() {
    var maxElem = $('.mde-photo-edit').data('maxElem');
    var maxElemExisting = $('.mde-photo-edit').children('.mde-photo-edit__wrapper').find('.mde-photo-edit__elem-cont').length;

    return (maxElem == maxElemExisting);
}
function writeAlbumEdit(responce) {
    var albumCont = $('.mde-photo-edit__wrapper');

    albumCont.html('');
    for (var i = 0; i < responce.data.photos.length; i++) {
        var src = responce.data.photos[i].preview;
        addPhotoToAlbum(src);
    }
}