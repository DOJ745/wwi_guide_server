$(document).ready(function() {
    const loginForm = $("#myForm")
    const loginField = $("#loginField")
    const passwordField = $("#passwordField")
    const rememberMeBox = $("#rememberMe")
    const responseMsg = $("#response")

    rememberMeBox[0].addEventListener('change', function () {
        if (this.checked) { rememberMeBox.val('on') }
        else { rememberMeBox.val('off') }
    })

    let validateForm = function (event) {
        let formData = {
            "login": loginField.val(),
            "password": passwordField.val(),
            "remember": rememberMeBox.val()
        }

        $.ajax({
            url: loginForm.attr('action'),
            type: loginForm.attr('method'),
            headers: {'Accept': 'application/json'},
            data: formData
        })
            .done(() => {
                location.href = "/home"
            })
            .fail((jqXHR) => {
                let errorData = $.parseJSON(jqXHR.responseText)
                responseMsg.css("opacity", "0.1");
                responseMsg.animate({opacity: '1.0'}, 633);
                responseMsg.html(errorData.message)
                responseMsg.removeAttr('hidden')
            })
        event.preventDefault()
    }
    loginForm[0].addEventListener("submit", validateForm, true)
})