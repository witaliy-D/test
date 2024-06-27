$('.program__item-content').on("click", function () {
    $('#modal-item .adaptive-box__image').attr('src', $(this).data('img'));
    $('#modal-item .modal-item__title').html($(this).data('title'));
    $('#modal-item .modal-item__info').html($(this).data('desc'));
});
