$(document).ready(function() {
    const form = $("#itemInsertForm")
    const resMsg = $("#resInsertMsg")
    const titleField = $("#titleInsertField")
    const achievementIdField = $("#achievementIdInsertField")
    const surveyIdField = $("#surveyIdInsertField")
    const yearIdField = $("#yearIdInsertField")
    const textParagraphsField = $("#textParagraphsInsertField")
    const imagesField = $("#imagesInsertField")
    const imagesTitlesField = $("#imagesTitlesInsertField")
    let itemId, tempTextParagraphs, tempImages, tempImagesTitles

    const insertModal = document.getElementById('insertModal');
    insertModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        itemId = button.getAttribute('data-bs-whatever');
    })

    insertModal.addEventListener('hide.bs.modal', function (event) {
        resMsg.attr('hidden', '')
    })

    let insertItem = function (event) {
        const regExpComma = /\s*(?:,|$)\s*/
        const regExpText = /\s*(?:\n\n|$)\s*/
        tempImages = imagesField.val().split(regExpComma)
        tempImagesTitles = imagesTitlesField.val().split(regExpComma)
        tempTextParagraphs = textParagraphsField.val().split(regExpText)

        let formData = {
            "title": titleField.val(),
            "achievementId": achievementIdField.val(),
            "yearId": yearIdField.val(),
            "surveyId": surveyIdField.val(),
            "text_paragraphs": tempTextParagraphs,
            "images": tempImages,
            "images_titles": tempImagesTitles
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
                $("#insertModal").animate({scrollTop: 0}, 400)

                setTimeout(reloadPage, 999)
                function reloadPage(){ location.href = "/events" }
            })
            .fail((jqXHR) => {
                let errorData = $.parseJSON(jqXHR.responseText)
                resMsg.css("opacity", "0.1");
                resMsg.attr('style', 'color: red')
                resMsg.animate({opacity: '1.0'}, 633);
                resMsg.html(errorData.message)
                resMsg.removeAttr('hidden')
                $("#insertModal").animate({scrollTop: 0}, 400)
            })
        event.preventDefault()
    }
    form[0].addEventListener("submit", insertItem, true)
})