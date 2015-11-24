$('.js-del-this-block').click(function () {
    if (confirm('Вы уверены, что хотите удалить статью?')) {
        sendAjaxLink($(this), delArtPrevBlock);
    }
    return false;
});
$('.js-publish-block').click(function () {
    var dataPublish = $(this).parents('.mde-useful-read__useful-read-cont').data('publish');
    console.log(dataPublish);
    if (dataPublish == 0) {
        $($(this).parents('.mde-useful-read__useful-read-cont')).prependTo('#publish-article');
    } else if (dataPublish == 1) {
        $($(this).parents('.mde-useful-read__useful-read-cont')).prependTo('#not-publish-article');
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