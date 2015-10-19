// Скрываем 'js-personal-data-edit' по клику на ссылку 'js-hide-edit-form' (Отмена)
$('.js-hide-edit-form').click(function () {
        $('.js-personal-data-edit').css('display', 'none');
        return false;
    }
);
