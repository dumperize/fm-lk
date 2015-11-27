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
            console.log(this);
            $(this).next('div').remove();
            $(this).remove();
        });
    } else if ($(this).closest('.mde-photo__album-cover').length > 0) {
        $(this).closest('.mde-photo__album-cover').toggle(500, function () {
            addCreateNewBlock(this);
            $(this).remove();
        });
    }
}