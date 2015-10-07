$(document).click(function (event) {
        if ($(event.target).closest('.js-bookmark-search-cont').length) {
            return;
        }
        $('.js-bookmark-search-input').hide();
        $('.js-bookmark-search-title').show();
        event.stopPropagation();
    }
);
$('.js-bookmark-search-title').click(function () {
        $(this).hide();
        $('.js-bookmark-search-input').show();
        $('.js-bookmark-search-input #bookmark-search').trigger('focus');
    }
);

