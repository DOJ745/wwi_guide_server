$(document).ready(function() {
    const form = $("#itemInsertForm")
    const resMsg = $("#resInsertMsg")
    const textField = $("#textInsertField")
    const testThemeIdField = $("#testThemeIdInsertField")
    const imgField = $("#imgInsertField")
    let itemId

    const insertModal = document.getElementById('insertModal');
    insertModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        itemId = button.getAttribute('data-bs-whatever');
    })

    insertModal.addEventListener('hide.bs.modal', function (event) {
        resMsg.attr('hidden', '')
    })

    let insertItem = function (event) {
        let formData = {
            "text": textField.val(),
            "testThemeId": testThemeIdField.val(),
            "img": imgField.val()
        }
        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            headers: {'Accept': 'application/json'},
            data: formData
        })
            .done((res) => {
                resMsg.attr('style', 'color: green')
                resMsg.css("opacity", "0.1");
                resMsg.animate({opacity: '1.0'}, 633);
                resMsg.html(res.message)
                resMsg.removeAttr('hidden')

                setTimeout(reloadPage, 699)
                function reloadPage(){ location.href = "/tests-questions" }
            })
            .fail((jqXHR) => {
                let errorData = $.parseJSON(jqXHR.responseText)
                resMsg.css("opacity", "0.1");
                resMsg.attr('style', 'color: red')
                resMsg.animate({opacity: '1.0'}, 633);
                resMsg.html(errorData.message)
                resMsg.removeAttr('hidden')
            })
        event.preventDefault()
    }
    form[0].addEventListener("submit", insertItem, true)
})