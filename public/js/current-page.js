$(document).ready(function() {
    let pathname = window.location.pathname
    let elem
    function setLinkActive(elem){
        elem.addClass('active')
        elem.attr('aria-current', 'page')
        elem.attr('href', '#')
    }

    function setDropdownActive(elem){
        elem.addClass('active')
    }

    switch (pathname){
        case '/home':
            elem = $(".nav-link").eq(0)
            setLinkActive(elem)
            break
        case '/years':
            elem = $(".nav-link").eq(1)
            setLinkActive(elem)
            break
        case '/events':
            elem = $(".nav-link").eq(2)
            setLinkActive(elem)
            break
        case '/ranks':
            elem = $(".nav-link").eq(3)
            setLinkActive(elem)
            break
        case '/countries':
            elem = $(".nav-link").eq(4)
            setLinkActive(elem)
            break
        case '/achievements':
            elem = $(".nav-link").eq(5)
            setLinkActive(elem)
            break
        case '/armament':
            elem = $(".nav-link").eq(6)
            setLinkActive(elem)
            break
        case '/users':
            elem = $(".nav-link").eq(7)
            setLinkActive(elem)
            break
        case '/logs':
            elem = $(".nav-link").eq(8)
            setLinkActive(elem)
            break
        case '/tests-questions':
            elem = $(".nav-link.dropdown-toggle").eq(0)
            setDropdownActive(elem)
            break
        case '/tests-answers':
            elem = $(".nav-link.dropdown-toggle").eq(0)
            setDropdownActive(elem)
            break
        case '/surveys-questions':
            elem = $(".nav-link.dropdown-toggle").eq(1)
            setDropdownActive(elem)
            break
        case '/surveys-answers':
            elem = $(".nav-link.dropdown-toggle").eq(1)
            setDropdownActive(elem)
            break
        default:
    }
})