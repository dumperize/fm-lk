$('.js-select-album').click(function () {
    sendAjaxLink($(this).children('a'), writeAlbum);
    return false;
});
$('.js-del-this-block').click(function () {
    if ($(this).closest('.mde-useful-read__useful-read-cont').length > 0) {
        if (confirm('Вы уверены, что хотите удалить статью?')) {
            sendAjaxLink($(this), delThisBlock);
        }
    } else if ($(this).closest('.mde-photo__album-cover').length > 0) {
        if (confirm('Вы уверены, что хотите удалить альбом?')) {
            sendAjaxLink($(this), delThisBlock);
        }
    }
    return false;
});
function writeAlbum(responce) {
    var albumCont = $('.mde-photo__album-cont');

    $('.mde-photo__album-cover').removeClass('mde-photo__album-cover_act');
    $(this).parent().addClass('mde-photo__album-cover_act');
    albumCont.html('');
    albumCont.prepend('<p class="mde-photo__album-title">' + responce.data.title + '</p>');
    for (var i = 0; i < responce.data.photos.length; i++) {
        albumCont.append('<a href="' + responce.data.photos[i].fullsize + '" class="mde-photo__img-prev"><img src="' + responce.data.photos[i].preview + '" alt="' + responce.data.photos[i].alt + '"><br></a>');
    }
}
