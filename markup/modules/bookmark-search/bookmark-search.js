// При клике за пределами контейнера 'js-bookmark-search-cont' возвращаем его в исходное состояние
$(document).click(function (event) {
        if ($(event.target).closest('.js-bookmark-search-cont').length) {
            return;
        }
        $('.js-bookmark-search-input').hide();
        $('.js-bookmark-search-title').show();
        event.stopPropagation();
    }
);

// При клике на контейнер 'js-bookmark-search-title' скрываем его и показываем контейнер с поиском
$('.js-bookmark-search-title').click(function () {
        $(this).hide();
        $('.js-bookmark-search-input').show();
        $('.js-bookmark-search-input #bookmark-search').trigger('focus');
    }
);

// AJAX отправка формы
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
                        console.log(response.data[i]);
                    }
                }
            },
            beforeSend: function () {
                console.log('before send');
            }
        });
        return false;
    }
);

