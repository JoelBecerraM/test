jQuery(function ($) {
    'use strict';

    // Header Sticky
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 800) {
            $('.navbar-area').addClass("is-sticky");
        } else {
            $('.navbar-area').removeClass("is-sticky");
        }
    });

    // Mean Menu
    jQuery('.mean-menu').meanmenu({
        meanScreenWidth: "992"
    });

    // Others Option For Responsive JS
    $(".others-option-for-responsive .dot-menu").on("click", function () {
        $(".others-option-for-responsive .container .container").toggleClass("active");
    });

    // Home Slides
    $('.home-slides').owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        autoplayHoverPause: true,
        items: 1,
        smartSpeed: 100,
        autoplay: false,
    });
    $(".home-slides").on("translate.owl.carousel", function () {
        $(".main-slides-content span").removeClass("animated fadeInUp").css("opacity", "0");
        $(".main-slides-content h1").removeClass("animated fadeInUp").css("opacity", "0");
        $(".main-slides-content p").removeClass("animated fadeInUp").css("opacity", "0");
        $(".main-slides-content a").removeClass("animated fadeInUp").css("opacity", "0");
    });
    $(".home-slides").on("translated.owl.carousel", function () {
        $(".main-slides-content span").addClass("animated fadeInUp").css("opacity", "1");
        $(".main-slides-content h1").addClass("animated fadeInUp").css("opacity", "1");
        $(".main-slides-content p").addClass("animated fadeInUp").css("opacity", "1");
        $(".main-slides-content a").addClass("animated fadeInUp").css("opacity", "1");
    });

    // Hero Slides
    $('.hero-slides').owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        autoplayHoverPause: true,
        items: 1,
        smartSpeed: 100,
        autoplay: false,
        navText: [
            "<i class='bx bx-chevrons-left'></i>",
            "<i class='bx bx-chevrons-right'></i>"
        ],
    });

    // Count Time
    function makeTimer() {
        var endTime = new Date("September 20, 2022 17:00:00 PDT");
        var endTime = (Date.parse(endTime)) / 1000;
        var now = new Date();
        var now = (Date.parse(now) / 1000);
        var timeLeft = endTime - now;
        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < "10") {
            hours = "0" + hours;
        }
        if (minutes < "10") {
            minutes = "0" + minutes;
        }
        if (seconds < "10") {
            seconds = "0" + seconds;
        }
        $("#days").html(days + "<span>Days</span>");
        $("#hours").html(hours + "<span>Hours</span>");
        $("#minutes").html(minutes + "<span>Minutes</span>");
        $("#seconds").html(seconds + "<span>Seconds</span>");
    }
    setInterval(function () {
        makeTimer();
    }, 0);

    // Subscribe form
    $(".newsletter-form").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formErrorSub();
            submitMSGSub(false, "Please enter your email correctly.");
        } else {
            // everything looks good!
            event.preventDefault();
        }
    });
    function callbackFunction(resp) {
        if (resp.result === "success") {
            formSuccessSub();
        } else {
            formErrorSub();
        }
    }
    function formSuccessSub() {
        $(".newsletter-form")[0].reset();
        submitMSGSub(true, "Thank you for subscribing!");
        setTimeout(function () {
            $("#validator-newsletter").addClass('hide');
        }, 4000)
    }
    function formErrorSub() {
        $(".newsletter-form").addClass("animated shake");
        setTimeout(function () {
            $(".newsletter-form").removeClass("animated shake");
        }, 1000)
    }
    function submitMSGSub(valid, msg) {
        if (valid) {
            var msgClasses = "validation-success";
        } else {
            var msgClasses = "validation-danger";
        }
        $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
    }
    // AJAX MailChimp
    $(".newsletter-form").ajaxChimp({
        url: "https://envytheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
        callback: callbackFunction
    });

    // Partner Slider
    $('.partner-slider').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        smartSpeed: 500,
        margin: 30,
        autoplayHoverPause: true,
        autoplay: true,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            1024: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });

    // WOW JS
    $(window).on('load', function () {
        if ($(".wow").length) {
            var wow = new WOW({
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 20, // distance to the element when triggering the animation (default is 0)
                mobile: true, // trigger animations on mobile devices (default is true)
                live: true, // act on asynchronously loaded content (default is true)
            });
            wow.init();
        }
    });

    // Nice Select JS
    //$('select').niceSelect();
    // Select2
    $('.js-select2').select2({
        placeholder: "Seleccione una opcion",
        allowClear: true
    });
    $('.js-select2-multiple').select2({
        placeholder: "Seleccione las opciones",
        allowClear: true
    });

    // Testimonials Slides
    $('.testimonials-slides').owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        autoplayHoverPause: true,
        items: 1,
        smartSpeed: 100,
        autoplay: false,
        navText: [
            "<i class='bx bx-chevrons-left'></i>",
            "<i class='bx bx-chevrons-right'></i>"
        ],
    });

    // Popup Video
    $('.popup-youtube').magnificPopup({
        disableOn: 320,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Popup Image
    $('a[data-imagelightbox="popup-btn"]')
            .imageLightbox({
                activity: true,
                overlay: true,
                button: true,
                arrows: true
            });

    // FAQ Accordion
    $(function () {
        $('.accordion').find('.accordion-title').on('click', function () {
            // Adds Active Class
            $(this).toggleClass('active');
            // Expand or Collapse This Panel
            $(this).next().slideToggle('fast');
            // Hide The Other Panels
            $('.accordion-content').not($(this).next()).slideUp('fast');
            // Removes Active Class From Other Titles
            $('.accordion-title').not($(this)).removeClass('active');
        });
    });

    // Tabs
    (function ($) {
        $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
        $('.tab ul.tabs li a').on('click', function (g) {
            var tab = $(this).closest('.tab'),
                    index = $(this).closest('li').index();
            tab.find('ul.tabs > li').removeClass('current');
            $(this).closest('li').addClass('current');
            tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
            tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
            g.preventDefault();
        });
    })(jQuery);

    // Input Plus & Minus Number JS
    $('.input-counter').each(function () {
        var spinner = jQuery(this),
                input = spinner.find('input[type="text"]'),
                btnUp = spinner.find('.plus-btn'),
                btnDown = spinner.find('.minus-btn'),
                min = input.attr('min'),
                max = input.attr('max');

        btnUp.on('click', function () {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
        btnDown.on('click', function () {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
    });

    // Go to Top
    $(function () {
        // Scroll Event
        $(window).on('scroll', function () {
            var scrolled = $(window).scrollTop();
            if (scrolled > 600)
                $('.go-top').addClass('active');
            if (scrolled < 600)
                $('.go-top').removeClass('active');
        });
        // Click Event
        $('.go-top').on('click', function () {
            $("html, body").animate({scrollTop: "0"}, 500);
        });
    });

    // Odometer JS
    $('.odometer').appear(function (e) {
        var odo = $(".odometer");
        odo.each(function () {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });

    // Preloader
    jQuery(window).on('load', function () {
        $('.preloader').fadeOut();
    })

    // DataTables
    jQuery.extend(!0, jQuery.fn.dataTable.defaults, {
        language: {
            aria: {
                sortAscending: "Activar para ordenar la columna de manera ascendente",
                sortDescending: "Activar para ordenar la columna de manera descendente"
            },
            decimal: ".", thousands: ",", infoThousands: ",",
            lengthMenu: "_MENU_", search: "_INPUT_", searchPlaceholder: "Filtrar ...",
            loadingRecords: "Cargando ...", processing: "Procesando ...",
            emptyTable: "<span class=\"text-warning\">No hay datos disponibles en la tabla</span>",
            zeroRecords: "<span class=\"text-warning\">No se encontraron coincidencias</span>", infoEmpty: "",
            infoFiltered: "<span class=\"text-info\">(Filtrado de un total de _MAX_ entradas)</span>",
            info: "", //"Pagina <strong>_PAGE_</strong> de <strong>_PAGES_</strong>",
            paginate: {
                first: '<i class="fa fa-angle-double-left"></i>', previous: '<i class="fa fa-angle-left"></i>',
                next: '<i class="fa fa-angle-right"></i>', last: '<i class="fa fa-angle-double-right"></i>'}
        }
    });

}(jQuery));

//
//
//

var darkmode = false;

var windowDarkMode = window.localStorage.getItem("DarkMode");
darkmode = !windowDarkMode ? false : true;

function question(msg, onConfirm, onCancel, buttonText) {
    if (!buttonText)
        buttonText = ["Aceptar", "Cancelar"];
    Swal.fire({
        icon: "question",
        showClass: {
            popup: darkmode ?
                "swal2-popup-dark-mode" : "swal2-popup"
        },
        title: "Pregunta",
        showCancelButton: true,
        confirmButtonText: "<i class=\"fa fa-check\"></i>&nbsp;&nbsp;"+buttonText[0],
        cancelButtonText: "<i class=\"fa fa-cancel\"></i>&nbsp;&nbsp;"+buttonText[1],
        reverseButtons: true,
        focusCancel: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        html: msg
    }).then((result) => {
        if (result.isConfirmed) {
            if (onConfirm)
                onConfirm();
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            if (onCancel)
                onCancel();
        }
    });
}
function success(msg, onConfirm, buttonText) {
    if (!buttonText)
        buttonText = "Aceptar";
    Swal.fire({
        icon: "success",
        showClass: {
            popup: darkmode ?
                "swal2-popup-dark-mode" : "swal2-popup"
        },
        title: "&Eacute;xito",
        confirmButtonText: "<i class=\"fa fa-check\"></i>&nbsp;&nbsp;"+buttonText,
        customClass: {
            confirmButton: "btn btn-success m-1"
        },
        buttonsStyling: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        html: msg
    }).then((result) => {
        if (result.isConfirmed) {
            if (onConfirm)
                onConfirm();
        }
    });
}
function info(msg, onConfirm, buttonText) {
    if (!buttonText)
        buttonText = "Aceptar";
    Swal.fire({
        icon: "info",
        showClass: {
            popup: darkmode ?
                "swal2-popup-dark-mode" : "swal2-popup"
        },
        title: "Informaci&oacute;n",
        confirmButtonText: "<i class=\"fa fa-info\"></i>&nbsp;&nbsp;"+buttonText,
        customClass: {
            confirmButton: "btn btn-info m-1"
        },
        buttonsStyling: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        html: msg
    }).then((result) => {
        if (result.isConfirmed) {
            if (onConfirm)
                onConfirm();
        }
    });
}
function warning(msg, onConfirm, buttonText) {
    if (!buttonText)
        buttonText = "Aceptar";
    Swal.fire({
        icon: "warning",
        showClass: {
            popup: darkmode ?
                "swal2-popup-dark-mode" : "swal2-popup"
        },
        title: "Precauci&oacute;n",
        confirmButtonText: "<i class=\"fa fa-exclamation\"></i>&nbsp;&nbsp;"+buttonText,
        customClass: {
            confirmButton: "btn btn-warning m-1"
        },
        buttonsStyling: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        html: msg
    }).then((result) => {
        if (result.isConfirmed) {
            if (onConfirm)
                onConfirm();
        }
    });
}
function error(msg, onConfirm, buttonText) {
    if (!buttonText)
        buttonText = "Aceptar";
    Swal.fire({
        icon: "error",
        showClass: {
            popup: darkmode ?
                "swal2-popup-dark-mode" : "swal2-popup"
        },
        title: "Error",
        confirmButtonText: "<i class=\"fa fa-cancel\"></i>&nbsp;&nbsp;"+buttonText,
        customClass: {
            confirmButton: "btn btn-danger m-1"
        },
        buttonsStyling: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        html: msg
    }).then((result) => {
        if (result.isConfirmed) {
            if (onConfirm)
                onConfirm();
        }
    });
}

function formatNumber(value) {
    var format = formatMoney(value);
    format = format.substring(1);
    format = format.substring(0, format.length - 3);
    return format;
}
function formatMoney(value) {
    return "$"+parseFloat(value, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}
function formatPercentage(value) {
    return redondea(parseFloat(value) * 100)+"%";
}
function redondea(value, decimals) {
    if (!decimals)
        decimals = 2;
    return Number(parseFloat(value)).toFixed(decimals);
}
function replaceAll(value, find, replace) {
    return value.replace(new RegExp(find, "g"), replace);
}
function replaceAllIgnoreCase(value, find, replace) {
    return value.replace(new RegExp(find, "ig"), replace);
}

function scv(name, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + "; " + expires;
}
function gcv(name) {
    var s = document.cookie;
    var pos = s.indexOf(name + "=");
    if (pos===-1)
        return null;
    var start = pos + name.length + 1;
    var end = s.indexOf(";", start);
    if (end===-1)
        end = s.length;
    return s.substring(start, end);
}
function rcv(name) {
    scv(name, "", -1);
}
function gi(id) {
    return document.getElementById(id);
}
function ce(id) {
    return document.createElement(id);
}
function kc(e) {
    var a = window.event ? event.keyCode : e.keyCode;
    return a;
}

function wm() {
    $('.preloader').show();
}
function cwm() {
    $('.preloader').fadeOut();
}
function notify(msg, $div) {
    if (!$div)
        $div = $("#notify-div");
    notify_class_info(msg, $div);
}
function notify_class_original(msg, $field) {
    notify_class(msg, "block-content block-content-full block-content-sm bg-body-light fs-sm", $field);
}
function notify_class_info(msg, $field) {
    notify_class(msg, "alert alert-info", $field);
}
function notify_class_warning(msg, $field) {
    notify_class(msg, "alert alert-warning", $field);
}
function notify_class_error(msg, $field) {
    notify_class(msg, "alert alert-danger", $field);
}
function notify_class_success(msg, $field) {
    notify_class(msg, "alert alert-success", $field);
}
function notify_class_secondary(msg, $field) {
    notify_class(msg, "alert alert-secondary", $field);
}
function notify_class(msg, classes, $field) {
    if (!$field)
        $field = $("#notify-div");
    if ($field) {
        $field.removeClass();
        $field.addClass(classes);
        $field.html(msg);
    }
}

function getProperties(obj) {
    var properties = [];
    //var methods = [];
    // Determination functions and properties of the target by a parent object
    Object.getOwnPropertyNames(obj).forEach((name) => {
        if (typeof obj[name]==='function') {
            //methods.push(name);
        } else if (obj.hasOwnProperty(name) && properties.indexOf(name)===-1) {
            properties.push(name);
        }
    });
    return properties;
}
function getParameters(response) {
    var ret = "";
    var properties = getProperties(response);
    properties.forEach(function(element) {
        var value = response[element];
        if (value&&value!=="")
            ret += "&"+element+"="+response[element];
    });
    return ret;
}
function copyValores(source, dest) {
    var properties = getProperties(source);
    properties.forEach(function(element) {
        dest[element] = source[element];
    });
}
function setFormValues($form, response) {
    var properties = getProperties(response);
    properties.forEach(function(element) {
        var $input = $("#"+$form[0].id+" [name="+element+"]");
        if ($input[0]) {
            var type = $input[0].type;
            if (type==="checkbox") {
                $input.prop("checked", response[element]==="1");
            } else {
                $input.val(response[element]);
            }
        }
    });
}
function getFormValues($form) {
    var values = {};
    $.each($("input, select, textarea", $form), function (k) {
        var name = $(this).attr("name");
        var type = $(this)[0].type;
        if (type==="checkbox") {
            values[name] = $(this).is(":checked") ? "1" : "0";
        } else {
            var value = $(this).val();
            if ($(this).hasClass("text-uppercase"))
                value = value.toUpperCase();
            values[name] = value;
        }
    });
    return values;
}
function emptyFormValues($form) {
    $.each($("input, select, textarea", $form), function (k) {
        //var name = $(this).attr("name");
        var disabled = $(this)[0].disabled;
        if (disabled)
            return;
        var type = $(this)[0].type;
        if (type==="checkbox") {
            $(this).attr("checked", false);
        } else if (type==="select-one") {
            $(this).prop("selectedIndex", 0);
        } else {
            $(this).val("");
        }
    });
}
function resetForm($form) {
    $form[0].reset();
}

function loadScript(script, onComplete) {
    $.getScript(script)
    .done(function(script, textStatus) {
        if (onComplete)
            onComplete();
    }).fail(function(err) {
        error("Error al obtener el script ["+script+"].<br><br><b>("+err.status+") "+err.statusText+"</b>");
    });
}
function loadPageContainer(page, onComplete) {
    $.ajax({
        url: page,
        beforeSend: function() {
            wm();
        }
    }).done(function(response) {
        cwm();
        $("#page-container").html(response);
        $(window).scrollTop(0);
        if (onComplete)
            onComplete();
    }).fail(function(err) {
        cwm();
        error("Error al obtener la pagina ["+page+"].<br><br><b>("+err.status+") "+err.statusText+"</b>");
    });
}
function loadPage(page, onComplete) {
    $.ajax({
        url: page,
        beforeSend: function() {
            wm();
        }
    }).done(function(response) {
        cwm();
        if (onComplete)
            onComplete(response);
    }).fail(function(err) {
        cwm();
        error("Error al obtener la pagina ["+page+"].<br><br><b>("+err.status+") "+err.statusText+"</b>");
    });
}

function mvc_post(data, done, fail, message) {
    $.ajax({
        url: "/ecommerce/MVC",
        method: "post",
        beforeSend: function() {
            wmp();
        },
        data: data
    }).done(function(response, textStatus, jqXHR) {
        cwmp();
        if (jqXHR.status===205) {
            var complete = function() {
                top.location = "/ecommerce";
            };
            warning("La sesion no existe o ha expirado, para continuar debe de iniciar su sesión nuevamente.", complete);
            return;
        }
        if (response.error) {
            if (message) {
                message(response);
                return;
            }
            error(response.mensaje);
            return;
        }
        if (done)
            done(response);
    }).fail(function(err) {
        cwmp();
        if (fail)
            fail(err);
    });
}
function mvc_wwm(data, done, fail, message) {
    $.ajax({
        url: "/ecommerce/MVC",
        data: data
    }).done(function(response, textStatus, jqXHR) {
        if (jqXHR.status===205) {
            var complete = function() {
                top.location = "/ecommerce";
            };
            warning("La sesion no existe o ha expirado, para continuar debe de iniciar su sesión nuevamente.", complete);
            return;
        }
        if (response.error) {
            if (message) {
                message(response);
                return;
            }
            error(response.mensaje);
            return;
        }
        if (done)
            done(response);
    }).fail(function(err) {
        if (fail)
            fail(err);
    });
}
function mvc(data, done, fail, message) {
    $.ajax({
        url: "/ecommerce/MVC",
        beforeSend: function() {
            wm();
        },
        data: data
    }).done(function(response, textStatus, jqXHR) {
        cwm();
        if (jqXHR.status===205) {
            var complete = function() {
                top.location = "/ecommerce";
            };
            warning("La sesion no existe o ha expirado, para continuar debe de iniciar su sesión nuevamente.", complete);
            return;
        }
        if (response.error) {
            if (message) {
                message(response);
                return;
            }
            error(response.mensaje);
            return;
        }
        if (done)
            done(response);
    }).fail(function(err) {
        cwm();
        if (fail)
            fail(err);
    });
}
function accion(registro, accion, valores, onComplete, onError, onFail) {
    $.ajax({
        url: "/ecommerce/MVC",
        beforeSend: function() {
            wm();
        },
        data: {
            id: "Accion",
            registro: registro,
            accion: accion,
            valores: valores
        }
    }).done(function(response, textStatus, jqXHR) {
        cwm();
        if (jqXHR.status===205) {
            var complete = function() {
                top.location = index;
            };
            warning("La sesion no existe o ha expirado, para continuar debe de iniciar su sesión nuevamente.", complete);
            return;
        }
        if (response.error) {
            if (onError)
                onError(response);
        } else {
            if (onComplete)
                onComplete(response);
        }
    }).fail(function(err) {
        cwm();
        if (onFail)
            onFail(err);
        else
            error("Error al ejecutar la accion en el registro ["+registro+";"+accion+"].<br><br><b>("+err.status+") "+err.statusText+"</b>");
    });
}
function registro(record, valores, onComplete, onError, onFail) {
    $.ajax({
        url: "/ecommerce/MVC",
        beforeSend: function() {
            wm();
        },
        data: {
            id: "Registro",
            registro: record,
            valores: valores
        }
    }).done(function(response, textStatus, jqXHR) {
        cwm();
        if (jqXHR.status===205) {
            var complete = function() {
                top.location = index;
            };
            warning("La sesion no existe o ha expirado, para continuar debe de iniciar su sesión nuevamente.", complete);
            return;
        }
        if (response.error) {
            if (onError)
                onError(response);
        } else {
            if (onComplete)
                onComplete(response);
        }
    }).fail(function(err) {
        cwm();
        if (onFail)
            onFail(err);
        else
            error("Error al obtener el registro ["+record+";"+valores+"].<br><br><b>("+err.status+") "+err.statusText+"</b>");
    });
}
function coleccion(registro, where, onComplete, onError, onFail) {
    $.ajax({
        url: "/ecommerce/MVC",
        beforeSend: function() {
            wm();
        },
        data: {
            id: "Coleccion",
            registro: registro,
            where: where
        }
    }).done(function(response, textStatus, jqXHR) {
        cwm();
        if (jqXHR.status===205) {
            var complete = function() {
                top.location = index;
            };
            warning("La sesion no existe o ha expirado, para continuar debe de iniciar su sesión nuevamente.", complete);
            return;
        }
        if (response.error) {
            if (onError)
                onError(response);
        } else {
            if (onComplete)
                onComplete(response);
        }
    }).fail(function(err) {
        cwm();
        if (onFail)
            onFail(err);
        else
            error("Error al obtener la coleccion de los registros.<br><br><b>("+err.status+") "+err.statusText+"</b>");
    });
}
function lista(registro, where, order, onComplete, onError, onFail) {
    $.ajax({
        url: "/ecommerce/MVC",
        beforeSend: function() {
            wm();
        },
        data: {
            id: "Lista",
            where: where,
            order: order,
            registro: registro
        }
    }).done(function(response, textStatus, jqXHR) {
        cwm();
        if (jqXHR.status===205) {
            var complete = function() {
                top.location = index;
            };
            warning("La sesion no existe o ha expirado, para continuar debe de iniciar su sesión nuevamente.", complete);
            return;
        }
        if (response.error) {
            if (onError)
                onError(response);
        } else {
            if (onComplete)
                onComplete(response);
        }
    }).fail(function(err) {
        cwm();
        if (onFail)
            onFail(err);
        else
            error("Error al obtener la lista de registros ["+registro+";"+where+"] .<br><br><b>("+err.status+") "+err.statusText+"</b>");
    });
}
function comboRegistros(registro, where, order, $campo, valor, texto, valorinicial) {
    var onFail = function(err) {
        var mensaje = "Error al obtener la lista de registros ["+registro+";"+where+"] .<br><br><b>("+err.status+") "+err.statusText+"</b>";
        error(mensaje);
    };
    var onError = function(response) {
        error(response.mensaje);
    };
    var onComplete = function(response) {
        //$campo.empty();
        for (var i=0; i<response.length; i++) {
            $campo.append($("<option></option>").attr("value",
                response[i][valor]).text(response[i][texto]));
        }
        if (valorinicial)
            $campo.val(valorinicial);
    };
    lista(registro, where, order, onComplete, onError, onFail);
}
function autocomplete(min, inp, data, result, render, onclick) {
    var arr = [];
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;

    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var val = this.value;
        //close any already open lists of autocompleted values
        closeAllLists();
        if (!val) {
            arr = [];
            return;
        }
        //starts only whit min characters
        if (arr.length===0&&val.length<min) {
            return;
        }
        seekRecords(val);
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var list = gi(this.id+"-autocomplete-list");
        if (!list)
            return;
        var x = list.getElementsByTagName("div");
        if (e.keyCode===40) {
        /*If the arrow DOWN key is pressed,
         increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
            /*scroll div*/
            list.scrollTop = x[currentFocus].offsetTop;
            return false;
        } else if (e.keyCode===38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x, list);
            /*scroll div*/
            list.scrollTop = x[currentFocus].offsetTop;
            return false;
        } else if (e.keyCode===13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > - 1) {
                /*and simulate a click on the "active" item:*/
                if (x)
                    x[currentFocus].click();
                return false;
            }
        }
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keyup", function(e) {
        var k = kc(e);
        /*close on ESC*/
        if (k===27) {
            arr = [];
            closeAllLists();
            e.preventDefault();
            return false;
        }
        /*seek on ENTER*/
        else if (k===13) {
            if (arr.length===0) {
                var val = inp.value;
                if (val==="")
                    return;
                arr = [];
                closeAllLists();
                seekRecords(val);
            }
            e.preventDefault();
            return false;
        }
        /*seek ALL on HOME*/
        else if (k===36) {
            if (arr.length===0) {
                var val = inp.value;
                arr = [];
                closeAllLists();
                seekRecords(val);
            }
            e.preventDefault();
            return false;
        }
    });

    function seekRecords(val) {
        currentFocus = - 1;
        /*fill the array*/
        if (arr.length===0) {
            var ondata = function(array) {
                arr = array;
                /*if (arr.length===1) {
                    closeAllLists();
                    var record = arr[0];
                    arr = [];
                    onclick(inp, record);
                    return;
                }*/
                if (arr.length===0) {
                    inp.select();
                    inp.focus();
                    return;
                }
                selectedRecords(val);
            };
            data(val, ondata);
            return;
        } else {
            /*search records*/
            selectedRecords(val);
        }
    };

    function selectedRecords(val) {
        val = val.toUpperCase();
        var a;
        /*create a div element that will contain the items (values):*/
        var a = ce("div");
        a.setAttribute("id", inp.id+"-autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the div element as a child of the autocomplete container:*/
        inp.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (var i=0; i<arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (result(arr[i], val)) {
            //if (arr[i].substr(0, val.length).toUpperCase()===val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                var b = ce("div");
                /*make the matching letters bold:*/
                b.innerHTML = render(arr[i], val);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='"+JSON.stringify(arr[i])+"'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*get the value for the autocomplete text field:*/
                    var value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                    /*empty array*/
                    arr = [];
                    /*callback*/
                    onclick(inp, JSON.parse(value));
                });
                a.appendChild(b);
            }
        }
        inp.focus();
    }

    function addActive(x, list) {
        /*a function to classify an item as "active":*/
        if (!x)
            return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length)
            currentFocus = 0;
        if (currentFocus < 0)
            currentFocus = (x.length - 1);
        /*add class "active":*/
        x[currentFocus].classList.add("bg-primary","text-white");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i=0; i<x.length; i++) {
            x[i].classList.remove("bg-primary","text-white");
        }
    }

    function closeAllLists() {
        /*close all autocomplete lists in the document*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i=0; i<x.length; i++) {
            x[i].parentNode.removeChild(x[i]);
        }
    }

    /*execute a function when someone clicks in the document:*/
    //document.addEventListener("click", function (e) {
    //    closeAllLists();
    //});
}
function busquedas(parametros, onComplete, onError, onCancelar) {
    var onFailII = function(err) {
        notify_error("Error al obtener la lista de registros ["+parametros.registro+";"+parametros.where+"].<br><br><b>("+
            err.status+") "+err.statusText+"</b>");
    };
    var onErrorII = function(response) {
        if (onError) {
            onError(response);
        } else {
            notify_error(response.mensaje);
        }
    };
    var onCompleteII = function(response) {
        if (response.length===1) {
            var selectedRowData = response[0];

            if (onComplete)
                onComplete(selectedRowData);

            return;
        }

        var selectedRowData;

        var aceptar = function() {
            var data = $table.rows(".bg-body-light").data();
            if (data.length===0) {
                notify("Debe de seleccionar un registro.", $contentNotify);
                return;
            }

            selectedRowData = data[0];

            myModal.hide();
        };

        var $buttonCancelar = $("#modalDialogBusquedasCancel");
        $buttonCancelar.unbind("click");
        $buttonCancelar.click(function() {
            notify("Listo.");
            selectedRowData = null;
            myModal.hide();
        });
        var $buttonAceptar = $("#modalDialogBusquedasAccept");
        $buttonAceptar.unbind("click");
        $buttonAceptar.click(function() {
            aceptar();
        });

        var onReady = function() {
            $modalDialogBusquedas.focus();

            $("#tabla-dialog-busquedas").focus();
            $table.draw();
        };

        $("#modalDialogBusquedasTitle").html(parametros.title);
        $("#modalDialogBusquedasDocument").addClass("modal-lg");
        $("#modalDialogBusquedasBody").empty();
        $("#modalDialogBusquedasBody").append($(
            '<table id="tabla-dialog-busquedas" class="table table-hover table-vcenter">'+
            '</table>'+
            '<div id="modalDialogBusquedasNotify" class="block-content block-content-full block-content-sm bg-body-light fs-sm">Listo.</div>'));

        var $contentNotify = $("#modalDialogBusquedasNotify");

        var $table = $("#tabla-dialog-busquedas").DataTable({
            data: response,
            autoWidth: false,
            columns: parametros.columns,
            columnDefs: parametros.columnDefs,
            order: parametros.tableOrder,
            scrollY: parametros.scrollY,
            paging: false
        });
        $("#tabla-dialog-busquedas tbody").unbind("click");
        $("#tabla-dialog-busquedas tbody").on("click", "tr", function() {
            // single seleccion
            if ($(this).hasClass('bg-body-light')) {
                $(this).removeClass('bg-body-light');
            } else {
                $table.$('tr.bg-body-light').removeClass('bg-body-light');
                $(this).addClass('bg-body-light');
            }
        });

        notify("Listo.", $contentNotify);

        if (response.length===0)
            notify_class_warning("No se encontro ning&uacute;n registro.");

        $modalDialogBusquedas.unbind("shown.bs.modal");
        $modalDialogBusquedas.on("shown.bs.modal", function() {
            onReady();
        });
        $modalDialogBusquedas.unbind("hidden.bs.modal");
        $modalDialogBusquedas.on("hidden.bs.modal", function() {
            $table.destroy();

            if (selectedRowData) {
                if (onComplete)
                    onComplete(selectedRowData);
            } else {
                if (onCancelar)
                    onCancelar();
            }
        });

        var options = {
            keyboard: false,
            backdrop: "static"
        };
        var myModal = new bootstrap.Modal($modalDialogBusquedas, options);
        myModal.show();
    };

    notify("Obteniendo registros ...");
    if (parametros.coleccion)
        coleccion(parametros.coleccion, parametros.where, onCompleteII, onErrorII, onFailII);
    else
        lista(parametros.registro, parametros.where, parametros.order, onCompleteII, onErrorII, onFailII);
}

function seleccionaAvatar(avatar) {
    var img = "assets/img/avatars/avatars-"+avatar+".png";
    $("#form-datos  [name=avatar]").val(img);
    $("#avatar-img").attr("src", img);
}
function togglePassword(input) {
    var $input = $("#"+input);
    var type = $input.attr("type")==="password" ? "text" : "password";
    $input.attr("type", type);

    var $btn = $input.parent().parent().find(".btn");
    if ($btn.hasClass("active"))
        $btn.removeClass("active");
    else
        $btn.addClass("active");
}
function restorezoom(div) {
    div.style.backgroundPosition = "0% 0%";
    div.style.backgroundImage = "";
}
function zoom(e, img) {
    var zoomer = e.currentTarget;
    if (zoomer.style.backgroundImage==="")
        zoomer.style.backgroundImage = "url('"+img.src+"')";
    if (!e.offsetX||!e.offsetY)
        return;
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX;
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageY;
    x = offsetX / zoomer.offsetWidth * 100;
    y = offsetY / zoomer.offsetHeight * 100;
    zoomer.style.backgroundPosition = x+'% '+y+'%';
}

function inicializaBusqueda() {
    var $search = $("#form-search [name=search]");
    var complete = function(record) {
        $search.attr("data-record", record.noparte);
        $search.val(record.descripcion);
        // Voy directo a la busqueda.
        busquedaAutopartesUniversal();
    };
    autoBusquedaAutopartes($search, complete);
}
function autoBusquedaAutopartes($clave, onComplete, onError) {
    var data = function(value, ondata) {
        value = value.toUpperCase();
        var onAceptar = function(err) {
            $clave.select();
            $clave.focus();
        };
        var onFailII = function(err) {
            error("Error al obtener la lista de registros.<br><br><b>("+
                err.status+") "+err.statusText+"</b>");
        };
        var onErrorII = function(response) {
            if (onError) {
                onError(response);
            } else {
                if (response.exception.indexOf("WebException")!==-1) {
                    warning(response.mensaje);
                } else {
                    error(response.exception);
                }
            }
        };
        var onCompleteII = function(response) {
            ondata(response);
        };
        var data = {
            id: "AutoBusquedaAutopartes",
            compania: usuario.compania,
            valor: value
        };
        mvc_wwm(data, onCompleteII, onFailII, onErrorII);
    };
    var result = function(record, value) {
        var words = value.split(" ");
        var foundDescripcionLarga = true;
        for (var indx=0; indx<words.length; indx++) {
            if (!record.descripcionlarga.toUpperCase().includes(words[indx])) {
                foundDescripcionLarga = false;
                break;
            }
        }
        return foundDescripcionLarga;
    };
    var render = function(record, value) {
        var words = value.split(" ");
        var noparte = record.noparte;
        var descripcion = record.descripcion;
        var codigos = record.codigos.split("@").join(" ");
        for (var indx=0; indx<words.length; indx++) {
            var word = words[indx];
            if (word==="")
                continue;
            noparte = replaceAllIgnoreCase(noparte, word, "<b>"+word+"</b>");
            descripcion = replaceAllIgnoreCase(descripcion, word, "<b>"+word+"</b>");
            codigos = replaceAllIgnoreCase(codigos, word, "<b>"+word+"</b>");
        }
        return "<span class=\"fs-4\">"+noparte+"</span><br>"
                +"<span class=\"fs-6\">"+descripcion+"</span><br>"
                +"<span class=\"fs-6\">"+codigos+"</span>";
    };
    var click = function(input, record) {
        onComplete(record);
    };
    autocomplete(3, $clave[0], data, result, render, click);

    $clave.focus();
}
function busquedaAutopartesUniversal() {
    //close all autocomplete lists in the document
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i=0; i<x.length; i++)
        x[i].parentNode.removeChild(x[i]);
    $("#search-autocomplete-list").remove();
    //

    var $search = $("#form-search [name=search]");
    var record = $search.attr("data-record");
    var value = $search.val();
    $search.val("");
    $search.attr("data-record", "");

    pageModel["pagina"] = 0;
    pageModel["valor"] = value;
    pageModel["noparte"] = "";
    if (record!=="")
        pageModel["noparte"] = record;

    pageModel["anio"] = "";
    pageModel["marca"] = "";
    pageModel["modelo"] = "";
    pageModel["motor"] = "";
    pageModel["linea"] = "";

    vistaProductos();
}
function cerrarSesion() {
    var aceptar = function() {
        var data = {
            id: "IniciaSesion",
            cerrar: "OK"
        };
        var onFail = function(err) {
            warning("Error al Cerrar la Sesi&oacute;n.<br><br><b>("+err.status+") "+err.statusText+"</b>");
        };
        var onError = function(response) {
            if (response.exception.indexOf("WebException")!==-1) {
                warning(response.mensaje);
            } else {
                error(response.exception);
            }
        };
        var onComplete = function(response) {
            var inicio = function() {
                top.location = "/ecommerce";
            };
            info("Sesi&oacute;n cerrada correctamente.", inicio);
        };
        mvc_wwm(data, onComplete, onFail, onError);
    };
    var cancelar = function() {
    };

    question("&iquest;Realmente desea cerrar la sesi&oacute;n?", aceptar, cancelar, ["Si", "No"]);
}
function obtenCarrito(onComplete) {
    var data = {
        compania: usuario.compania,
        usuario: usuario.usuario,
        id: "ObtenCarrito"
    };

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al obtener el Carrito.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        error(msg);
    };
    var onError = function(response) {
        if (response.exception.indexOf("WebException")!==-1) {
            warning(response.mensaje);
        } else {
            error(response.exception);
        }
    };

    mvc_wwm(data, onComplete, onFail, onError);
}
function armaMapaCarrito(response) {
    elCarrito = new HashMap();
    for(var indx=0; indx<response.productos.length; indx++) {
        var producto = response.productos[indx];
        elCarrito.put(producto.noparte, producto.cantidad);
    }
}
function dibujaTotalesCarrito(response) {
    $("#total-carrito").html(response.totales.totAutopartes);
}
function agregaCantidad(id, cuantos) {
    var $cantidad = $("#"+id+"cantidad");

    var cantidad = parseInt($cantidad.val());
    if (isNaN(cantidad)) {
        cantidad = 1;
    } else {
        cantidad += parseInt(cuantos);
        if (cantidad<=0)
            cantidad = 1;
    }

    $cantidad.val(cantidad+"");
    $cantidad.select();
    $cantidad.focus();
}
function agregaProductoAlCarrito(id, noparte, complete) {
    var $cantidad = $("#"+id+"cantidad");

    var selecciona = function() {
        $cantidad.select();
        $cantidad.focus();
    };

    var cantidad = parseInt($cantidad.val());
    if (isNaN(cantidad)) {
        warning("Debe de escribir una cantidad válida.", selecciona);
        return;
    }

    var aceptar = function() {
        agregaProductoCarritoCantidad(noparte, cantidad, complete);
    };
    var cancelar = function() {
        $input.select();
        return;
    };

    if (cantidad > 25) {
        question("&iquest;Realmente desea agregar "+cantidad+" piezas de este producto?", aceptar, cancelar);
        return;
    }

    var maximo = 999;
    if (cantidad > maximo) {
        error("Solo se permiten como maximo "+maximo+" piezas.", selecciona);
    } else {
        aceptar();
    }
}
function agregaProductoCarritoCantidad(noparte, cantidad, onCompleteII) {
    var data = {
        compania: usuario.compania,
        usuario: usuario.usuario,
        noparte: noparte,
        cantidad: cantidad,
        promocion: pageModel.selectPromotions,
        id: "AgregaAutoparteAlCarrito"
    };

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al agregar al carrito.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        error(msg);
    };
    var onError = function(response) {
        if (response.exception.indexOf("WebException")!==-1) {
            warning(response.mensaje);
        } else {
            error(response.exception);
        }
    };
    var onComplete = function(response) {
        elCarrito.put(noparte, cantidad);
        dibujaTotalesCarrito(response);
        if (onCompleteII)
            onCompleteII(response);
    }

    mvc(data, onComplete, onFail, onError);
}
function busquedaClientes(texto, onComplete, onError) {
    var parametros = {
        registro: "mx.intran.ecommerce.dao.entity.ClienteDAO",
        where: "compania = '"+usuario.compania+"' AND (nombre LIKE '%"+texto+"%' OR cliente LIKE '%"+texto+"%')",
        order: "nombre",
        title: "Clientes",
        scrollY: "200px",
        columns: [
            {title: "Cliente", data: "cliente", width: "20%"},
            {title: "Nombre", data: "nombre", width: "60%"},
            {title: "Correo Electr&oacute;nico", data: "correoelectronico", width: "20%"}
        ],
        columnDefs: [
            {width: "20%", targets: [0]},
            {width: "60%", targets: [1]},
            {width: "20%", targets: [2]}
        ],
        tableOrder: [[1, "asc"]]
    };

    busquedas(parametros, onComplete, onError);
}
function busquedaPerfiles(texto, onComplete, onError) {
    var parametros = {
        registro: "mx.intran.ecommerce.dao.entity.PerfilDAO",
        where: "compania = '"+usuario.compania+"' AND (perfil LIKE '%"+texto+"%' OR descripcion LIKE '%"+texto+"%')",
        order: "descripcion",
        title: "Perfiles",
        scrollY: "200px",
        columns: [
            {title: "Perfil", data: "perfil", width: "20%"},
            {title: "Descripci&oacute;n", data: "descripcion", width: "80%"}
        ],
        columnDefs: [
            {width: "20%", targets: [0]},
            {width: "80%", targets: [1]}
        ],
        tableOrder: [[1, "asc"]]
    };

    busquedas(parametros, onComplete, onError);
}
function busquedaUsuarios(texto, onComplete, onError) {
    var parametros = {
        registro: "mx.intran.ecommerce.dao.entity.UsuarioDAO",
        where: "compania = '"+usuario.compania+"' AND (nombre LIKE '%"+texto+"%' OR usuario LIKE '%"+texto+"%')",
        order: "nombre",
        title: "Usuarios",
        scrollY: "200px",
        columns: [
            {title: "Usuario", data: "usuario", width: "20%"},
            {title: "Nombre", data: "nombre", width: "50%"},
            {title: "Email", data: "email", width: "30%"}
        ],
        columnDefs: [
            {width: "20%", targets: [0]},
            {width: "50%", targets: [1]},
            {width: "30%", targets: [2]}
        ],
        tableOrder: [[1, "asc"]]
    };

    busquedas(parametros, onComplete, onError);
}
function buscarCompania(onComplete, onAceptar) {
    var onAceptarII = function() {
        if (onAceptar)
            onAceptar();
    };
    var onFailII = function(err) {
        var mensaje = "Error al buscar el registro.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        error(mensaje);
    };
    var onErrorII = function(response) {
        if (response.exception.indexOf("WebException")!==-1) {
            warning(response.mensaje, onAceptarII);
        } else {
            error(response.mensaje, onAceptarII);
        }
    };
    var onCompleteII = function(response) {
        if (onComplete)
            onComplete(response);
    };
    registro("mx.intran.ecommerce.dao.entity.CompaniaDAO", usuario.compania,
        onCompleteII, onErrorII, onFailII);
}
function validaPermiso(permiso) {
    if (!usuario.permisos.includes(permiso)) {
        warning("Usted no tiene permiso para esta opci&oacute;n \"<b>"+permiso+"</b>\".");
        return false;
    }
    return true;
}

function vistaInicio() {
    function onComplete() {
        function onCompleteII() {
            initInicio();
        };
        loadScript("/ecommerce/assets/js/pages/inicio.js", onCompleteII);
    };
    loadPageContainer("/ecommerce/assets/pages/inicio.html", onComplete);
}
function vistaAcercaDe() {
    function onComplete() {
    };
    loadPageContainer("/ecommerce/assets/pages/acerca-de.html", onComplete);
}
function vistaSegimientoPedido() {
    function onComplete() {
    };
    loadPageContainer("/ecommerce/assets/pages/seguimiento-pedido.html", onComplete);
}
function vistaMiCuenta() {
    function onComplete() {
    };
    loadPageContainer("/ecommerce/assets/pages/mi-cuenta.html", onComplete);
}
function vistaPreguntasFrecuentes() {
    function onComplete() {
    };
    loadPageContainer("/ecommerce/assets/pages/preguntas-frecuentes.html", onComplete);
}
function vistaTerminosDeServicio() {
    function onComplete() {
    };
    loadPageContainer("/ecommerce/assets/pages/terminos-servicio.html", onComplete);
}
function vistaPoliticaDePrivacidad() {
    function onComplete() {
    };
    loadPageContainer("/ecommerce/assets/pages/politica-privacidad.html", onComplete);
}
function vistaContacto() {
    function onComplete() {
    };
    loadPageContainer("/ecommerce/assets/pages/contacto.html", onComplete);
}
function vistaLogin() {
    function onComplete() {
        function onCompleteII() {
            initLogin();
        };
        loadScript("/ecommerce/assets/js/pages/login.js", onCompleteII);
    };
    loadPageContainer("/ecommerce/assets/pages/login.html", onComplete);
}
function vistaProductos() {
    function onComplete() {
        function onCompleteII() {
            initProductos();
        };
        loadScript("/ecommerce/assets/js/pages/productos.js", onCompleteII);
    };
    loadPageContainer("/ecommerce/assets/pages/productos.html", onComplete);
}
function vistaProductoDetalle() {
    function onComplete() {
        function onCompleteII() {
            initProductoDetalle();
        };
        loadScript("/ecommerce/assets/js/pages/producto-detalle.js", onCompleteII);
    };
    loadPageContainer("/ecommerce/assets/pages/producto-detalle.html", onComplete);
}
function vistaCarrito() {
    function onComplete() {
        function onCompleteII() {
            initCarrito();
        };
        loadScript("/ecommerce/assets/js/pages/carrito.js", onCompleteII);
    };
    loadPageContainer("/ecommerce/assets/pages/carrito.html", onComplete);
}
function vistaComprar() {
    function onComplete() {
    };
    loadPageContainer("/ecommerce/assets/pages/comprar.html", onComplete);
}
function vistaAdminClientes() {
    if (!validaPermiso("administracion"))
        return;
    function onComplete() {
        function onCompleteII() {
            initAdminClientes();
        };
        loadScript("/ecommerce/assets/js/pages/admin-clientes.js", onCompleteII);
    };
    loadPageContainer("/ecommerce/assets/pages/admin-clientes.html", onComplete);
}
function vistaAdminUsuarios() {
    if (!validaPermiso("administracion"))
        return;
    function onComplete() {
        function onCompleteII() {
            initAdminUsuarios();
        };
        loadScript("/ecommerce/assets/js/pages/admin-usuarios.js", onCompleteII);
    };
    loadPageContainer("/ecommerce/assets/pages/admin-usuarios.html", onComplete);
}
function vistaAdminPerfiles() {
    if (!validaPermiso("administracion"))
        return;
    function onComplete() {
        function onCompleteII() {
            initAdminPerfiles();
        };
        loadScript("/ecommerce/assets/js/pages/admin-perfiles.js", onCompleteII);
    };
    loadPageContainer("/ecommerce/assets/pages/admin-perfiles.html", onComplete);
}
function vistaAdminPermisos() {
    if (!validaPermiso("administracion"))
        return;
    function onComplete() {
        function onCompleteII() {
            initAdminPermisos();
        };
        loadScript("/ecommerce/assets/js/pages/admin-permisos.js", onCompleteII);
    };
    loadPageContainer("/ecommerce/assets/pages/admin-permisos.html", onComplete);
}

var $modalDialogBusquedas = $("#modalDialogBusquedas");

var producto_lista =
    '<div class="shop-item-box products-details-desc"> \
        <div class="row align-items-center"> \
            <div class="col-lg-3 col-sm-3"> \
                <div class="shop-image"> \
                    <a href="#" onclick="pageModel.noparte = \'@noparte@\'; vistaProductoDetalle(); return false;"> \
                        <img src="/intran/fotos/chicas/@noparte@.png" onerror="this.src=\'/ecommerce/assets/img/shop/shop-0.png\'" alt="image"> \
                    </a> \
                </div> \
            </div> \
            <div class="col-lg-6 col-sm-6"> \
                <div class="product-content"> \
                    <h3> \
                        <a href="#" onclick="pageModel.noparte = \'@noparte@\'; vistaProductoDetalle(); return false;">@descripcion@</a> \
                    </h3> \
                    <div class="loggeado price"> \
                        <span>Precio:</span> \
                        <span class="new-price @lista@">@precio@</span> \
                    </div> \
                    <div class="loggeado promocion price"> \
                        <span>Promoci&oacute;n:</span> \
                        <span class="old-price">@precio@</span>  \
                        <span class="new-price">@promocionnormal@</span>  \
                        <span class="new-price">@promocionespecial@</span> \
                    </div> \
                    <div class="product-quantities"> \
                        <div class="row"> \
                            <div class="col-lg-4 col-md-4"> \
                                <span>Familia:</span> \
                                <br><a onclick="return false;">@familia@</a> \
                            </div> \
                            <div class="col-lg-4 col-md-4"> \
                                <span>L&iacute;nea:</span> \
                                <br><a onclick="return false;">@linea@</a> \
                            </div> \
                            <div class="col-lg-4 col-md-4"> \
                                <span>Sistema:</span> \
                                <br><a onclick="return false;">@sistema@</a> \
                            </div> \
                        </div> \
                    </div> \
                    <ul class="products-info"> \
                        <li class="loggeado"><span>Disponibilidad:</span> <a onclick="return false;">@disponibilidad@</a></li> \
                        <li><span>NoParte:</span> <a onclick="return false;">@noparte@</a></li> \
                        <li><span>OEM:</span> <a onclick="return false;">@oem@</a></li> \
                    </ul> \
                </div> \
            </div> \
            <div class="col-lg-3 col-sm-3"> \
                <div class="loggeado product-content"> \
                    <div class="product-quantities mt-4"> \
                        <span>Cantidad:</span> \
                        <div class="input-counter"> \
                            <span class="minus-btn" onclick="agregaCantidad(\'@noparte@\', -1); return false;"> \
                                <i class="bx bx-minus"></i> \
                            </span> \
                            <input type="text" value="@cantidad@" id="@noparte@cantidad"> \
                            <span class="plus-btn" onclick="agregaCantidad(\'@noparte@\', 1); return false;"> \
                                <i class="bx bx-plus"></i> \
                            </span> \
                        </div> \
                    </div> \
                    <div class="product-add-to-cart"> \
                        <button type="submit" class="default-btn" \
                                onclick="agregaProductoAlCarrito(\'@noparte@\', \'@noparte@\'); return false;"> \
                            <i class="flaticon-shopping-cart"></i> Agregar<span></span> \
                        </button> \
                    </div> \
                </div> \
            </div> \
        </div> \
    </div>';

var producto_grid =
    '<div class="col-lg-4 col-sm-4"> \
        <div class="shop-item-box products-details-desc"> \
            <div class="shop-image pagination-area" style="height: 200px;"> \
                <a href="#" onclick="pageModel.noparte = \'@noparte@\'; vistaProductoDetalle(); return false;"> \
                    <img src="/intran/fotos/chicas/@noparte@.png" onerror="this.src=\'/ecommerce/assets/img/shop/shop-0.png\'" alt="image"> \
                </a> \
            </div> \
            <div class="product-content align-items-center"> \
                <h3> \
                    <a href="#" onclick="pageModel.noparte = \'@noparte@\'; vistaProductoDetalle(); return false;">@descripcion@</a> \
                </h3> \
                <div class="loggeado price"> \
                    <span>Precio:</span> \
                    <span class="new-price @lista@">@precio@</span> \
                </div> \
                <div class="loggeado promocion price"> \
                    <span>Promoci&oacute;n:</span> \
                    <span class="old-price">@precio@</span>  \
                    <span class="new-price">@promocionnormal@</span>  \
                    <span class="new-price">@promocionespecial@</span> \
                </div> \
                <!-- div class="product-quantities"> \
                    <div class="row"> \
                        <div class="col-lg-4 col-md-4"> \
                            <span>Familia:</span> \
                            <br><a onclick="return false;">@familia@</a> \
                        </div> \
                        <div class="col-lg-4 col-md-4"> \
                            <span>L&iacute;nea:</span> \
                            <br><a onclick="return false;">@linea@</a> \
                        </div> \
                        <div class="col-lg-4 col-md-4"> \
                            <span>Sistema:</span> \
                            <br><a onclick="return false;">@sistema@</a> \
                        </div> \
                    </div> \
                </div --> \
                <ul class="products-info"> \
                    <li class="loggeado"><span>Disponibilidad:</span> <a onclick="return false;">@disponibilidad@</a></li> \
                    <li><span>NoParte:</span> <a onclick="return false;">@noparte@</a></li> \
                    <li><span>OEM:</span> <a onclick="return false;">@oem@</a></li> \
                </ul> \
            </div> \
            <div class="loggeado product-content"> \
                <div class="product-quantities align-items-center mt-4"> \
                    <span>Cantidad:</span> \
                    <div class="input-counter"> \
                        <span class="minus-btn" onclick="agregaCantidad(\'@noparte@\', -1); return false;"> \
                            <i class="bx bx-minus"></i> \
                        </span> \
                        <input type="text" value="@cantidad@" id="@noparte@cantidad"> \
                        <span class="plus-btn" onclick="agregaCantidad(\'@noparte@\', 1); return false;"> \
                            <i class="bx bx-plus"></i> \
                        </span> \
                    </div> \
                </div> \
                <div class="product-add-to-cart align-items-center"> \
                    <button type="submit" class="default-btn" \
                            onclick="agregaProductoAlCarrito(\'@noparte@\', \'@noparte@\'); return false;"> \
                        <i class="flaticon-shopping-cart"></i> Agregar<span></span> \
                    </button> \
                </div> \
            </div> \
        </div> \
    </div>';

var categoria_li =
    '<li class="checkbox"> \
        <input type="checkbox" class="input" name="@clave@"> \
        <label class="label">@descripcion@</label> \
    </li>';

var images_producto =
    '<div class="row">\
           <figure class="img-fluid zoom" id="foto-zoom" onmouseout="restorezoom(this);" onmousemove="zoom(event, gi(\'image\'));">\
            <img onerror="this.src=\'/ecommerce/assets/img/products/products-8.jpg\'" src="/intran/fotos/grandes/@noparte@.png" id="image">\
        </figure>\
    </div>\
    <div class="row">\
        <div class="col" id="div-thumbnail-0">\
             <img src="/intran/fotos/grandes/@noparte@.png" class="img-thumbnail puntero"\
                 onclick="gi(\'image\').src=this.src;" onerror="this.onerror=null; gi(\'div-thumbnail-0\').innerHTML=\'\';">\
        </div>\
        <div class="col" id="div-thumbnail-1">\
             <img src="/intran/fotos/grandes/@noparte@-2.png" class="img-thumbnail puntero"\
                 onclick="gi(\'image\').src=this.src;" onerror="this.onerror=null; gi(\'div-thumbnail-1\').innerHTML=\'\';">\
        </div>\
        <div class="col" id="div-thumbnail-2">\
             <img src="/intran/fotos/grandes/@noparte@-3.png" class="img-thumbnail puntero"\
                 onclick="gi(\'image\').src=this.src;" onerror="this.onerror=null; gi(\'div-thumbnail-2\').innerHTML=\'\';">\
        </div>\
        <div class="col" id="div-thumbnail-3">\
             <img src="/intran/fotos/grandes/@noparte@-4.png" class="img-thumbnail puntero"\
                 onclick="gi(\'image\').src=this.src;" onerror="this.onerror=null; gi(\'div-thumbnail-3\').innerHTML=\'\';">\
        </div>\
        <div class="col" id="div-thumbnail-4">\
             <img src="/intran/fotos/grandes/@noparte@-5.png" class="img-thumbnail puntero"\
                 onclick="gi(\'image\').src=this.src;" onerror="this.onerror=null; gi(\'div-thumbnail-4\').innerHTML=\'\';">\
        </div>\
    </div>';
