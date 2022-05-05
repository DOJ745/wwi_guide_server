$(document).ready(function() {
    const form = $("#itemForm")
    const resMsg = $("#resMsg")
    const nameField = $("#nameField")
    const descriptionField = $("#descriptionField")
    const pointsField = $("#pointsField")
    const imgField = $("#imgField")
    let itemId

    const updateModal = document.getElementById('updateModal');
    updateModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        itemId = button.getAttribute('data-bs-whatever');

        nameField.val($('#cardName' + itemId).html())
        descriptionField.val($('#cardDescription' + itemId).html())
        pointsField.val($('#cardPoints' + itemId).html().replace('Points: ', ''))
        imgField.val($('#cardImg' + itemId).attr('src'))
    })

    updateModal.addEventListener('hide.bs.modal', function (event) {
        resMsg.attr('hidden', '')
    })

    let updateAchievement = function (event) {
        let formData = {
            "name": nameField.val(),
            "description": descriptionField.val(),
            "points": pointsField.val(),
            "img": imgField.val(),
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
                $('#cardDescription' + itemId).html(res.operationResult.description)
                $('#cardPoints' + itemId).html(`Points: ${res.operationResult.points}`)
                $('#cardImg' + itemId).attr('src', res.operationResult.img)
            })
            .fail((jqXHR) => {
                let errorData = $.parseJSON(jqXHR.responseText)
                resMsg.css("opacity", "0.1");
                resMsg.animate({opacity: '1.0'}, 633);
                resMsg.html(errorData.message)
                resMsg.removeAttr('hidden')
            })
        event.preventDefault()
    }

    form[0].addEventListener("submit", updateAchievement, true)
})