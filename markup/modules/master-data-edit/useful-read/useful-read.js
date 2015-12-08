$('.js-publish-block').click(function () {
    var dataPublish;
    var article;

    if ($(this).closest('.mde-useful-read').length > 0) {
        dataPublish = $(this).parents('.mde-useful-read__useful-read-cont').data('publish');
        article = $(this).parents('.mde-useful-read__useful-read-cont');

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
    } else if ($(this).closest('.mde-reviews').length > 0) {
        alert ('');
        dataPublish = $(this).parents('.mde-reviews__review-cont').data('publish');
        article = $(this).parents('.mde-reviews__review-cont');

        if (dataPublish == 0) {
            $(article).find('.ctrl-btn__publish').removeClass('ctrl-btn__publish').addClass('ctrl-btn__not-publish');
            $(article).prependTo('#publish-cont');
            article.data('publish', '1');
        } else if (dataPublish == 1) {
            $(article).find('.ctrl-btn__publish').removeClass('ctrl-btn__not-publish').addClass('ctrl-btn__publish');
            $(article).prependTo('#not-publish-cont');
            article.data('publish', '0');
        }
        //sendAjaxLink($(this), delArtPrevBlock);
    }
    return false;
});