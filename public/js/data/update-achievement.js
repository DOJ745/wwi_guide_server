$(document).ready(function() {
    const form = $(".itemForm")
    const resMsg = $(".resMSg")

    /*$(".itemForm").each(function(index) {
        alert(index + ": " + $(this).val())
    })*/

    const itemId = $(".itemId")
    const nameField = $(".nameField")
    const descriptionField = $(".descriptionField")
    const pointsField = $(".pointsField")
    const imgField = $(".imgField")

    let updateAchievement = function (event) {
        let formData = {
            "name": nameField.val(),
            "description": descriptionField.val(),
            "points": pointsField.val(),
            "img": imgField.val(),
            'id': itemId.html()
        }

        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            headers: {'Accept': 'application/json'},
            data: formData
        })
            .done((res) => {
                alert('Successful update!')
                resMsg.attr('style', 'color: green')
                resMsg.css("opacity", "0.1");
                resMsg.animate({opacity: '1.0'}, 633);
                resMsg.html(res.message)
                resMsg.removeAttr('hidden')
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

    $(".itemForm").each(function(index) {
        form[index].addEventListener("submit", updateAchievement, true)
    })

    //form[0].addEventListener("submit", updateAchievement, true)
})