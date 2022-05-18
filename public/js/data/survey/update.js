$(document).ready(function() {
    const form = $("#itemUpdateForm")
    const resMsg = $("#resUpdateMsg")
    const questionTextField = $("#questionTextUpdateField")
    const answerVariantsField = $("#answerVariantsUpdateField")
    const pointsField = $("#pointsUpdateField")
    const imgField = $("#imgUpdateField")
    let itemId, tempArray

    const updateModal = document.getElementById('updateModal');
    updateModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        itemId = button.getAttribute('data-bs-whatever');

        questionTextField.val($('#cardQuestionText' + itemId).html())
        answerVariantsField.val($('#cardAnswerVariants' + itemId).html().replace('Answer variants: ', ''))
        pointsField.val($('#cardPoints' + itemId).html().replace('Points: ', ''))
        imgField.val($('#cardImg' + itemId).attr('src'))
    })

    updateModal.addEventListener('hide.bs.modal', function (event) {
        resMsg.attr('hidden', '')
    })

    let updateItem = function (event) {
        const regExp = /\s*(?:,|$)\s*/
        tempArray = answerVariantsField.val().split(regExp)
        let formData = {
            "question_text": questionTextField.val(),
            "answer_variants": tempArray,
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

                $('#cardQuestionText' + itemId).html(res.operationResult.question_text)
                $('#cardAnswerVariants' + itemId).html(`Answer variants: ${res.operationResult.answer_variants}`)
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