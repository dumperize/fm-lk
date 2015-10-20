// Скрываем 'js-personal-data-edit' по клику на ссылку 'js-hide-edit-form' (Отмена)
$('.js-hide-edit-form').click(function () {
        $('.js-personal-data-edit').css('display', 'none');
        return false;
    }
);
// AJAX запрос на изменение личных данных мастера
$('.js-form-edit').submit(function () {
        $.ajax({
            url: $(this).attr('action'),
            dataType: 'json',
            type: $(this).attr('method'),
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    console.log('success');
                }
            }
        });
        return false;
    }
);