$('.js-del-this-block').click(function () {
    if (confirm('Вы уверены, что хотите удалить статью?')) {
        sendAjaxLink($(this), delArtPrevBlock);
    }
    return false;
});
$('.js-publish-block').click(function () {
    var dataPublish = $(this).parents('.mde-useful-read__useful-read-cont').data('publish');
    var article = $(this).parents('.mde-useful-read__useful-read-cont');

    console.log(dataPublish);
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
function delArtPrevBlock() {
    $(this).closest('.article-preview').parent().toggle(500, function () {
        $(this).remove();
        addCreateNewBlock();
    });
}
function addCreateNewBlock() {
    var maxArticlePreview = parseInt($('.mde-useful-read').data('maxArticle'));

    if (maxArticlePreview > $('.mde-useful-read').find('.article-preview').length) {
        $('.mde-useful-read__add-new-cont').show();
    }
}