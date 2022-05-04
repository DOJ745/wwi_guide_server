$(document).ready(function () {
    const regForm = $("#myForm")
    const loginField = $("#loginField")
    const passwordField = $("#passwordField")
    const repPasswordField = $("#repeatPasswordField")
    const responseMsg = $("#response")

    let validateForm = function (event) {
        if (repPasswordField.val() !== passwordField.val()) {
            responseMsg.css("opacity", "0.1");
            responseMsg.animate({opacity: '1.0'}, 633);
            responseMsg.html('Passwords are not equal!')
            responseMsg.removeAttr('hidden')
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
                    responseMsg.css("opacity", "0.1");
                    responseMsg.animate({opacity: '1.0'}, 633);
                    responseMsg.attr('style', 'color: green')
                    responseMsg.removeAttr('hidden')
                    responseMsg.html(res.message)
                })
                .fail((jqXHR) => {
                    let errorData = $.parseJSON(jqXHR.responseText)
                    responseMsg.css("opacity", "0.1");
                    responseMsg.animate({opacity: '1.0'}, 633);
                    responseMsg.attr('style', 'color: red')
                    responseMsg.html(errorData.message)
                    responseMsg.removeAttr('hidden')
                })
        }
        event.preventDefault()
    }
    regForm[0].addEventListener("submit", validateForm, true)
})