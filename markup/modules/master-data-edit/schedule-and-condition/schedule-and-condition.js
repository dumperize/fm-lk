//Показать контейнер с id равным data-id радиокнопки
$('.js-select-schedule').find('[type=radio]').change(function () {
    var contIdShow = $(this).attr('data-id');
    $('.schedule-and-condition').find('[id*=mde-schedule]').hide();
    $(contIdShow).show();
});
