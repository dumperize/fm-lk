// По клику за пределами блока 'js-bookmark-search-cont' возвращаем в усзодное состояние
$(document).click(function (event) {
        if ($(event.target).closest('.js-bookmark-search-cont').length) {
            return;
        }
        $('.js-bookmark-search-input').hide();
        $('.js-bookmark-search-title').show();
        event.stopPropagation();
    }
);

// По клику на 'js-bookmark-search-title' прячем его и показываем 'js-bookmark-search-input' и ставим фокус на поле #bookmark-search
$('.js-bookmark-search-title').click(function () {
        $(this).hide();
        $('.js-bookmark-search-input').show();
        $('.js-bookmark-search-input #bookmark-search').trigger('focus');
    }
);

// AJAX запрос на получение списка мастеров
$('.js-bookmark-search-cont').submit(function () {
        $.ajax({
            url: $(this).attr('action'),
            dataType: 'json',
            type: $(this).attr('method'),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    $('.js-bookmark-result').html('');
                    for (var i = 0; i < response.data.length; i++) {
                        $('.js-bookmark-result').append(response.data[i]);
                    }
                }
            }
        });
        return false;
    }
);

