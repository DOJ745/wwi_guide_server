$(document).ready(function () {
    const regForm = $("#myForm")
    const loginField = $("#loginField")
    const passwordField = $("#passwordField")
    const repPasswordField = $("#repeatPasswordField")
    const resMsg = $("#resMsg")

    let validateForm = function (event) {
        if (repPasswordField.val() !== passwordField.val()) {
            resMsg.css("opacity", "0.1");
            resMsg.animate({opacity: '1.0'}, 633);
            resMsg.html('Passwords are not equal!')
            resMsg.removeAttr('hidden')
        }
        else {
            let formData = {
                "login": loginField.val(),
                "password": passwordField.val()
            }

            $.ajax({
                url: regForm.attr('action'),
                type: regForm.attr('method'),
                headers: {'Accept': 'application/json'},
                data: formData
            })
                .done((res) => {
                    resMsg.css("opacity", "0.1");
                    resMsg.animate({opacity: '1.0'}, 633);
                    resMsg.attr('style', 'color: green')
                    resMsg.removeAttr('hidden')
                    resMsg.html(res.message)
                })
                .fail((jqXHR) => {
                    let errorData = $.parseJSON(jqXHR.responseText)
                    resMsg.css("opacity", "0.1");
                    resMsg.animate({opacity: '1.0'}, 633);
                    resMsg.attr('style', 'color: red')
                    resMsg.html(errorData.message)
                    resMsg.removeAttr('hidden')
                })
        }
        event.preventDefault()
    }
    regForm[0].addEventListener("submit", validateForm, true)
})