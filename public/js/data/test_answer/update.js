$(document).ready(function() {
    const form = $("#itemUpdateForm")
    const resMsg = $("#resUpdateMsg")
    const textField = $("#textUpdateField")
    const testQuestionIdField = $("#testQuestionIdUpdateField")
    const pointsField = $("#pointsUpdateField")
    const isTrueField = $("#isTrueUpdateField")
    const isFalseField = $("#isFalseUpdateField")
    let itemId
    let isTrueValue

    const updateModal = document.getElementById('updateModal');
    updateModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        itemId = button.getAttribute('data-bs-whatever');

        textField.val($('#cardText' + itemId).html())
        testQuestionIdField.val($('#cardTestQuestionId' + itemId).html().replace('Test question ID: ', ''))
        pointsField.val($('#cardPoints' + itemId).html().replace('Points: ', ''))

        if($('#cardIsTrue' + itemId).html().replace('Is true: ', '') === "true"){
            isTrueField.attr("checked", '')
            isFalseField.removeAttr("checked")
        }
        else {
            isFalseField.attr("checked", '')
            isTrueValue.removeAttr("checked")
        }
    })

    updateModal.addEventListener('hide.bs.modal', function (event) {
        resMsg.attr('hidden', '')
    })

    $('#itemUpdateForm input[type=radio]').click(function(){
        isTrueValue = this.value === "setTrue";
    })

    let updateItem = function (event) {
        let formData = {
            "text": textField.val(),
            "testQuestionId": testQuestionIdField.val(),
            "points": pointsField.val(),
            "isTrue": isTrueValue,
            "id": itemId
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

                $('#cardText' + itemId).html(res.operationResult.text)
                $('#cardTestAnswerId' + itemId).html(res.operationResult.testQuestionId)
                $('#cardPoints' + itemId).html(`Points: ${res.operationResult.points}`)
                $('#cardIsTrue' + itemId).html(`Is true: ${res.operationResult.isTrue}` )
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