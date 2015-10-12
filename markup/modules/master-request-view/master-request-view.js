$('.js-master-request-delete').hover(function () {
        $(this).closest('tbody').css('background-color', '#FA8072');
    },
    function () {
        $(this).closest('tbody').css('background-color', '');
    }
);
$('.js-master-request-delete').click(function () {
        if (confirm('Удалить эту заявку?')) {
            var tbody = $(this).closest('tbody');
            $.ajax({
                url: $(this).attr('href'),
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        tbody.remove();
                    }
                }
            });
        }
        return false;
    }
);
