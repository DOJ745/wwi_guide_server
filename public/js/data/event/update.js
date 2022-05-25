$(document).ready(function() {
    const form = $("#itemUpdateForm")
    const resMsg = $("#resUpdateMsg")
    const titleField = $("#titleUpdateField")
    const achievementIdField = $("#achievementIdUpdateField")
    const surveyIdField = $("#surveyIdUpdateField")
    const yearIdField = $("#yearIdUpdateField")
    const textParagraphsField = $("#textParagraphsUpdateField")
    const imagesField = $("#imagesUpdateField")
    const imagesTitlesField = $("#imagesTitlesUpdateField")
    let itemId, tempTextParagraphs, tempImages, tempImagesTitles

    const updateModal = document.getElementById('updateModal');
    updateModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        itemId = button.getAttribute('data-bs-whatever');

        titleField.val($('#cardTitle' + itemId).html())
        yearIdField.val($('#cardYearId' + itemId).html().replace('Year ID: ', ''))
        achievementIdField.val($('#cardAchievementId' + itemId).html().replace('Achievement ID: ', ''))
        surveyIdField.val($('#cardSurveyId' + itemId).html().replace('Survey ID: ', ''))

        let allImages = $(".cardImg" + itemId).map(function() {
            return this.innerHTML.replace("Image: ", "");
        }).get();
        imagesField.html(allImages.join(", "));

        let allImagesTitles = $(".cardImgTitle" + itemId).map(function() {
            return this.innerHTML.replace("Image title: ", "");
        }).get();
        imagesTitlesField.html(allImagesTitles.join(", "))

        let allTextParagraphs = $(".cardTextParagraph" + itemId).map(function() {
            return this.innerHTML.replace("Text paragraph: ", "");
        }).get();
        textParagraphsField.html(allTextParagraphs.join("\n\n"))
    })

    updateModal.addEventListener('hide.bs.modal', function (event) {
        resMsg.attr('hidden', '')
    })

    let updateItem = function (event) {
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
            "images_titles": tempImagesTitles,
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
                $("#updateModal").animate({scrollTop: 0}, 400)

                setTimeout(reloadPage, 1300)
                function reloadPage(){ location.href = "/events" }
            })
            .fail((jqXHR) => {
                let errorData = $.parseJSON(jqXHR.responseText)
                resMsg.css("opacity", "0.1");
                resMsg.attr('style', 'color: red')
                resMsg.animate({opacity: '1.0'}, 633);
                resMsg.html(errorData.message)
                resMsg.removeAttr('hidden')
                $("#updateModal").animate({scrollTop: 0}, 400)
            })
        event.preventDefault()
    }
    form[0].addEventListener("submit", updateItem, true)
})