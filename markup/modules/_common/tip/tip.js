tellAboutUs = function (el, parent) {
    var tip = el.parents(parent).find('.js-tip');
    tip.show();
    setTimeout(function () {
        tip.hide();
    }, 5000);
};

$('.js-close-tip').click(function () {
    $(this).parent('.js-tip').hide();
});