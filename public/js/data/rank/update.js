$(document).ready(function() {
    const form = $("#itemUpdateForm")
    const resMsg = $("#resUpdateMsg")
    const nameField = $("#nameUpdateField")
    const countryIdField = $("#countryIdUpdateField")
    const pointsField = $("#pointsUpdateField")
    const imgField = $("#imgUpdateField")
    let itemId

    const updateModal = document.getElementById('updateModal');
    updateModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        itemId = button.getAttribute('data-bs-whatever');

        nameField.val($('#cardName' + itemId).html())
        countryIdField.val($('#cardCountryId' + itemId).html().replace("Country ID: ", ""))
        pointsField.val($('#cardPoints' + itemId).html().replace('Points: ', ''))
        imgField.val($('#cardImg' + itemId).attr('src'))
    })

    updateModal.addEventListener('hide.bs.modal', function (event) {
        resMsg.attr('hidden', '')
    })

    let updateItem = function (event) {
        let formData = {
            "name": nameField.val(),
            "countryId": countryIdField.val(),
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
                $('#cardCountryId' + itemId).html(res.operationResult.countryId)
                $('#cardPoints' + itemId).html(`Points: ${res.operationResult.points}`)
                $('#cardImg' + itemId).attr('src', res.operationResult.img)
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