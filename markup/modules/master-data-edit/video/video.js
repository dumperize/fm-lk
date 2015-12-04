function loadNewVideo() {
    $.ajax({
        url: $('#newVideoUpload').attr('name'),
        dataType: 'json',
        type: 'GET', //важно! заменить на POST!
        data: {
            url: $('#newVideoUpload').val()
        },
        success: function (response) {
            if (response.success) {
                console.log('success!');
            }
        }.bind($(this))
    });
    $('.mde-video-edit__download').hide();
    $('.mde-video-edit__wrapper').show();
    openActualData($('#newVideoUpload').closest('.section-cont'));
}