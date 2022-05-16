$(document).ready(function() {
    const form = $("#itemDeleteForm")
    const resMsg = $("#resDelMsg")
    const elementId = $("#elementId")
    let itemId

    const deleteModal = document.getElementById('deleteModal');
    deleteModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        itemId = button.getAttribute('data-bs-whatever');
        elementId.html("ID: " + itemId)
        /*nameField.val($('#cardName' + itemId).html())
        descriptionField.val($('#cardDescription' + itemId).html())
        pointsField.val($('#cardPoints' + itemId).html().replace('Points: ', ''))
        imgField.val($('#cardImg' + itemId).attr('src'))*/
    })

    deleteModal.addEventListener('hide.bs.modal', function (event) {
        resMsg.attr('hidden', '')
    })

    let deleteAchievement = function (event) {
        let formData =  { 'id': itemId }

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

                ('#cardElem' + itemId).remove()
                /*$('#cardName' + itemId).html(res.operationResult.name)
                $('#cardDescription' + itemId).html(res.operationResult.description)
                $('#cardPoints' + itemId).html(`Points: ${res.operationResult.points}`)
                $('#cardImg' + itemId).attr('src', res.operationResult.img)*/
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

    form[0].addEventListener("submit", deleteAchievement, true)
})