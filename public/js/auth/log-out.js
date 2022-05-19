$(document).ready(function() {
    const form = $("#logOutForm")
    const resMsg = $("#resMsg")

    const logOutModal = document.getElementById('logOutModal');
    logOutModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
    })

    logOutModal.addEventListener('hide.bs.modal', function (event) {})

    let insertItem = function (event) {
        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            headers: {'Accept': 'application/json'},
        })
            .done(() => {
                setTimeout(reloadPage, 100)
                function reloadPage(){ location.href = "/" }
            })
            .fail((jqXHR) => {
                let errorData = $.parseJSON(jqXHR.responseText)
                resMsg.css("opacity", "0.1");
                resMsg.animate({opacity: '1.0'}, 633);
                resMsg.attr('style', 'color: red')
                if(errorData.message !== null)
                    resMsg.html(errorData.message)
                resMsg.removeAttr('hidden')
            })
        event.preventDefault()
    }
    form[0].addEventListener("submit", insertItem, true)
})