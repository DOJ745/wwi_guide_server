$(document).ready(function() {
    const form = $("#itemUpdateForm")
    const resMsg = $("#resUpdateMsg")
    const nameField = $("#nameUpdateField")
    const achievementIdField = $("#achievementIdUpdateField")
    let itemId

    const updateModal = document.getElementById('updateModal');
    updateModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        itemId = button.getAttribute('data-bs-whatever');

        nameField.val($('#cardName' + itemId).html())
        achievementIdField.val($('#cardAchievementId' + itemId).html())
    })

    updateModal.addEventListener('hide.bs.modal', function (event) {
        resMsg.attr('hidden', '')
    })

    let updateItem = function (event) {
        let formData = {
            "name": nameField.val(),
            "achievementId": achievementIdField.val(),
            'id': itemId
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

                $('#cardName' + itemId).html(res.operationResult.name)
                $('#cardAchievementId' + itemId).html(res.operationResult.achievementId)
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

    form[0].addEventListener("submit", updateItem, true)
})