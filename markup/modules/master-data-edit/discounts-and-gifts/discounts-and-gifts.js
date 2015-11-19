$('.js-del-discounts-block').click(function () {
    if (confirm('Вы уверены, что хотите удалить услугу?')) {
        sendAjaxLink($(this), delDiscountsBlock);
    }
    return false;
});
function delDiscountsBlock() {
    this.closest('.discounts').parent.toggle(500, function () {
        $(this).remove();
        addCreateDiscountsBlock();
    });
}
function addCreateDiscountsBlock() {
    if (2 > $('.mde-discounts-and-gifts').find('.discounts').length) {
        $('.mde-discounts-and-gifts__add-discounts-cont').show();
    }
}
