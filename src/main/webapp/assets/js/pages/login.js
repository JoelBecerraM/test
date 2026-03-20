
function initLogin() {
    var $form = $("#form-login");

    var login = gcv("login");
    if (login) {
        var valores = JSON.parse(login);
        setFormValues($form, valores);
    }

    $form.validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMessage(false, "Debe de llenar todos los campos.");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });
}

function formError() {
    var $form = $("#form-login");
    $form.removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass();
    });
}

function submitMessage(valid, msg) {
    if (valid) {
        var msgClasses = "h4 animated text-success";
    } else {
        var msgClasses = "h4 text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).html(msg);
}

function submitForm() {
    submitMessage(true, "Validando ...");

    var $form = $("#form-login");
    var data = getFormValues($form);

    if (data.recordar==="1") {
        scv("login", JSON.stringify(data), 7);
    } else {
        rcv("login");
    }

    data["compania"] = usuario.compania;
    data["id"] = "IniciaSesion";

    var onFail = function(err) {
        submitMessage(false, "Error al Iniciar la Sesi&oacute;n. ("+err.status+") "+err.statusText+"</b>");
    };
    var onError = function(response) {
        if (response.exception.indexOf("WebException")!==-1) {
            submitMessage(false, response.mensaje);
        } else {
            submitMessage(false, response.exception);
        }
    };
    var onComplete = function(response) {
        submitMessage(true, "Usuario correcto.");
        var inicio = function() {
            top.location = "/ecommerce";
        };
        success("Bienvenido <b>"+response.nombre+"</b> al sitio de Comercio Electronico de Intran Flotamex.", inicio);
    };

    mvc(data, onComplete, onFail, onError);
}

