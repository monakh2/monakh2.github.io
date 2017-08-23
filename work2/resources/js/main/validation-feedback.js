$(function () {
    $('.feedback-form').each(function () {
        $(this).validate({
            rules: {
                feedback_name: {
                    required: true,
                    regex: /^[А-ЯЁа-яё]+$/,
                    minlength: 2,
                    maxlength: 20
                },
                feedback_phone: {
                    required: true,
                    regex: /\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}/,
                    minlength: 10
                }
            },
            messages: {
                feedback_name: {
                    required: "Поле обязательно для заполнения",
                    regex: 'Напишите Ваше имя на русском',
                    minlength: "Минимум 2 символа",
                    maxlength: "Максимум 20 символов"
                },
                feedback_phone: {
                    required: "Поле обязательно для заполнения",
                    regex: 'Используйте формат: +7(***)***-**-**',
                    minlength: "Минимум 2 символа"
                }
            },
            errorElement: 'p',
            errorClass: "form-messages text-danger"
        });
    });


    $(".feedback-modal-form").validate({
        rules: {
            feedback_name: {
                required: true,
                regex: /^[А-ЯЁа-яё]+$/,
                minlength: 2,
                maxlength: 20
            },
            feedback_phone: {
                required: true,
                regex: /\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}/,
                minlength: 10
            }
        },
        messages: {
            feedback_name: {
                required: "Поле обязательно для заполнения",
                regex: 'Напишите Ваше имя на русском',
                minlength: "Минимум 2 символа",
                maxlength: "Максимум 20 символов"
            },
            feedback_phone: {
                required: "Поле обязательно для заполнения",
                regex: 'Используйте формат: +7(***)***-**-**',
                minlength: "Минимум 2 символа"
            }
        },
        errorElement: 'p',
        errorClass: "form-messages text-danger"
    });
});