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
    } else if ($(elm).find('.mde-video').length > 0) {
        if (maxElem > $('.mde-video').find('.mde-video__video-cont').length) {
            $('.mde-video__add-new-cont').css('display', 'inline-block');
        }
    }
}