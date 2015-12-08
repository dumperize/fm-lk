$('.js-del-this-block').click(function () {
    if ($(this).closest('.mde-useful-read__useful-read-cont').length > 0) {
        if (confirm('Вы уверены, что хотите удалить статью?')) {
            sendAjaxLink($(this), delThisBlock);
        }
    } else if ($(this).closest('.mde-photo__album-cover').length > 0) {
        if (confirm('Вы уверены, что хотите удалить альбом?')) {
            sendAjaxLink($(this), delThisBlock);
        }
    } else if ($(this).closest('.mde-photo-edit__elem-cont').length > 0) {
        if (confirm('Вы уверены, что хотите удалить фотографию?')) {
            sendAjaxLink($(this), delThisBlock);
        }
    } else if ($(this).closest('.mde-reviews__review-cont').length > 0) {
        if (confirm('Удалить комментарий?')) {
            sendAjaxLink($(this), delThisBlock);
        }
    }
    return false;
});

//удаление родительского блока
function delThisBlock() {
    if ($(this).closest('.article-preview').length > 0) {
        $(this).closest('.article-preview').parent().toggle(500, function () {
            addCreateNewBlock(this);
            $(this).remove();
        });
    } else if ($(this).closest('.mde-photo-edit__elem-cont').length > 0) {
        $(this).closest('.mde-photo-edit__elem-cont').fadeOut(500, function () {
            $(this).next('div').remove();
            $(this).closest('.mde-photo-edit').find('.mde-photo-edit__add-btn').fadeIn(500);
            $(this).remove();
        });
    } else if ($(this).closest('.mde-photo__album-cover').length > 0) {
        $(this).closest('.mde-photo__album-cover').toggle(500, function () {
            addCreateNewBlock(this);
            $(this).remove();
        });
    } else if ($(this).closest('.mde-video').length > 0) {
        $(this).closest('.mde-video__video-cover').toggle(500, function () {
            addCreateNewBlock(this);
            $(this).remove();
        });
    } else if ($(this).closest('.mde-reviews').length > 0) {
        $(this).closest('.mde-reviews__review-cont').fadeOut(500, function () {
            $(this).remove();
        });
    }
}