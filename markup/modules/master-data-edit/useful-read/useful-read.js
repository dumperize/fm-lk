$('.js-publish-block').click(function () {
    var dataPublish = $(this).parents('.mde-useful-read__useful-read-cont').data('publish');
    var article = $(this).parents('.mde-useful-read__useful-read-cont');

    if (dataPublish == 0) {
        $(article).find('.ctrl-btn__publish').removeClass('ctrl-btn__publish').addClass('ctrl-btn__not-publish');
        $(article).prependTo('#publish-article');
        article.data('publish', '1');
    } else if (dataPublish == 1) {
        $(article).find('.ctrl-btn__publish').removeClass('ctrl-btn__not-publish').addClass('ctrl-btn__publish');
        $(article).prependTo('#not-publish-article');
        article.data('publish', '0');
    }
    //sendAjaxLink($(this), delArtPrevBlock);
    return false;
});