//добавление блока "+ добавить ..."
function addCreateNewBlock(elm) {
    //определяем исходный контейнер в котором будем работать
    if (!$(elm).hasClass('master-data-edit__section-cont')) {
        elm = $(elm).closest('.master-data-edit__section-cont');
    }
    //определяем содержание
    var maxElem = parseInt($(elm).find('[data-max-elem]').data('maxElem')); //максимальное разрешенное кол-во элементов

    if ($(elm).find('.mde-useful-read').length > 0) {
        if (maxElem > $('.mde-useful-read').find('.article-preview').length) {
            $('.mde-useful-read__add-new-cont').show();
        }
    } else if ($(elm).find('.mde-photo').length > 0) {
        if (maxElem > $('.mde-photo').find('.mde-photo__album-cover').length) {
            $('.mde-photo__add-new-cont').css('display', 'inline-block');
        }
    }
}
//удаление родительского блока
function delArtPrevBlock() {
    if ($(this).closest('.article-preview').length > 0) {
        $(this).closest('.article-preview').parent().toggle(500, function () {
            addCreateNewBlock(this);
            $(this).remove();
        });
    }
}
function delThisBlock() {
    if ($(this).closest('.article-preview').length > 0) {
        $(this).closest('.article-preview').parent().toggle(500, function () {
            addCreateNewBlock(this);
            $(this).remove();
        });
    } else if ($(this).closest('.mde-photo__album-cover').length > 0) {
        $(this).closest('.mde-photo__album-cover').toggle(500, function () {
            addCreateNewBlock(this);
            $(this).remove();
        });
    }
}