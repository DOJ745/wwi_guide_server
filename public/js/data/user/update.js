$(document).ready(function() {
    const form = $("#itemUpdateForm")
    const resMsg = $("#resUpdateMsg")
    const loginField = $("#loginUpdateField")
    const achievementsField = $("#achievementsUpdateField")
    const scoreField = $("#scoreUpdateField")
    let itemId, tempArray

    const updateModal = document.getElementById('updateModal');
    updateModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        itemId = button.getAttribute('data-bs-whatever');

        loginField.val($('#cardLogin' + itemId).html())
        achievementsField.val($('#cardAchievements' + itemId).html().replace('Achievements: ', ''))
        scoreField.val($('#cardScore' + itemId).html().replace('Score: ', ''))
    })

    updateModal.addEventListener('hide.bs.modal', function (event) {
        resMsg.attr('hidden', '')
    })

    let updateItem = function (event) {
        tempArray = achievementsField.val().split(",")
        let formData = {
            "login": loginField.val(),
            "achievements": tempArray,
            "score": scoreField.val(),
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

                $('#cardLogin' + itemId).html(res.operationResult.login)
                $('#cardAchievements' + itemId).html(`Achievements: ${res.operationResult.achievements}`)
                $('#cardScore' + itemId).html(`Score: ${res.operationResult.score}`)
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