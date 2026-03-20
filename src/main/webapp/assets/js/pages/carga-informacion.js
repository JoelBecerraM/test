
function initCargaInformacion() {
    initFormPromociones();
    initFormPrecios();
    initFormClientes();
    initFormCatalogo();
}

function initFormPromociones() {
    var $form = $("#form-promociones");
    $("#form-promociones input[name=compania]").val(usuario.compania);
    $("#form-promociones input[name=usuario]").val(usuario.usuario);

    var formError = function() {
        $form.removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }
    var submitMessage = function(valid, msg) {
        if (valid) {
            var msgClasses = "h4 animated text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit-promociones").removeClass().addClass(msgClasses).html(msg);
    }
    var submitForm = function() {
        submitMessage(true, "Subiendo Promociones ...");

        wm();

        $form.unbind("submit");
        $form.submit(function (e) {
            var formObj = $(this);
            var formURL = formObj.attr("action");
            var formData = new FormData(this);
            $.ajax({
                url: formURL,
                type: "post",
                data: formData,
                mimeType: "multipart/form-data",
                contentType: false,
                cache: false,
                processData: false,
                success: function (data, textStatus, jqXHR) {
                    cwm();

                    var response = JSON.parse(data);
                    if (response.error) {
                        formError();
                        submitMessage(false, response.mensaje);
                    } else {
                        submitMessage(true, "Termino.");
                        var complete = function() {
                            top.location = "/ecommerce";
                        };
                        info(JSON.stringify(response), complete);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    cwm();

                    var msg = "Error al procesar el Archivo de Catalogo de Productos.<br><br><b>("+jqXHR.status+") "+jqXHR.statusText+"</b>";

                    formError();
                    submitMessage(false, msg);
                }
            });
            e.preventDefault();
            //e.unbind();
        });
        $form.submit();
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

function initFormPrecios() {
    var $form = $("#form-precios");
    $("#form-precios input[name=compania]").val(usuario.compania);
    $("#form-precios input[name=usuario]").val(usuario.usuario);

    var formError = function() {
        $form.removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }
    var submitMessage = function(valid, msg) {
        if (valid) {
            var msgClasses = "h4 animated text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit-precios").removeClass().addClass(msgClasses).html(msg);
    }
    var submitForm = function() {
        submitMessage(true, "Subiendo Listas de Precio ...");

        wm();

        $form.unbind("submit");
        $form.submit(function (e) {
            var formObj = $(this);
            var formURL = formObj.attr("action");
            var formData = new FormData(this);
            $.ajax({
                url: formURL,
                type: "post",
                data: formData,
                mimeType: "multipart/form-data",
                contentType: false,
                cache: false,
                processData: false,
                success: function (data, textStatus, jqXHR) {
                    cwm();

                    var response = JSON.parse(data);
                    if (response.error) {
                        formError();
                        submitMessage(false, response.mensaje);
                    } else {
                        submitMessage(true, "Termino.");
                        var complete = function() {
                            top.location = "/ecommerce";
                        };
                        info(JSON.stringify(response), complete);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    cwm();

                    var msg = "Error al procesar el Archivo de Catalogo de Productos.<br><br><b>("+jqXHR.status+") "+jqXHR.statusText+"</b>";

                    formError();
                    submitMessage(false, msg);
                }
            });
            e.preventDefault();
            //e.unbind();
        });
        $form.submit();
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

function initFormClientes() {
    var $form = $("#form-clientes");
    $("#form-clientes input[name=compania]").val(usuario.compania);
    $("#form-clientes input[name=usuario]").val(usuario.usuario);

    var formError = function() {
        $form.removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }
    var submitMessage = function(valid, msg) {
        if (valid) {
            var msgClasses = "h4 animated text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit-clientes").removeClass().addClass(msgClasses).html(msg);
    }
    var submitForm = function() {
        submitMessage(true, "Subiendo Catalogo de Clientes ...");

        wm();

        $form.unbind("submit");
        $form.submit(function (e) {
            var formObj = $(this);
            var formURL = formObj.attr("action");
            var formData = new FormData(this);
            $.ajax({
                url: formURL,
                type: "post",
                data: formData,
                mimeType: "multipart/form-data",
                contentType: false,
                cache: false,
                processData: false,
                success: function (data, textStatus, jqXHR) {
                    cwm();

                    var response = JSON.parse(data);
                    if (response.error) {
                        formError();
                        submitMessage(false, response.mensaje);
                    } else {
                        submitMessage(true, "Termino.");
                        var complete = function() {
                            top.location = "/ecommerce";
                        };
                        info(JSON.stringify(response), complete);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    cwm();

                    var msg = "Error al procesar el Archivo de Catalogo de Productos.<br><br><b>("+jqXHR.status+") "+jqXHR.statusText+"</b>";

                    formError();
                    submitMessage(false, msg);
                }
            });
            e.preventDefault();
            //e.unbind();
        });
        $form.submit();
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

function initFormCatalogo() {
    var $form = $("#form-catalogo");
    $("#form-catalogo input[name=compania]").val(usuario.compania);
    $("#form-catalogo input[name=usuario]").val(usuario.usuario);

    var formError = function() {
        $form.removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }
    var submitMessage = function(valid, msg) {
        if (valid) {
            var msgClasses = "h4 animated text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit-catalogo").removeClass().addClass(msgClasses).html(msg);
    }
    var submitForm = function() {
        submitMessage(true, "Subiendo Catalogo de Productos ...");

        wm();

        $form.unbind("submit");
        $form.submit(function (e) {
            var formObj = $(this);
            var formURL = formObj.attr("action");
            var formData = new FormData(this);
            $.ajax({
                url: formURL,
                type: "post",
                data: formData,
                mimeType: "multipart/form-data",
                contentType: false,
                cache: false,
                processData: false,
                success: function (data, textStatus, jqXHR) {
                    cwm();

                    var response = JSON.parse(data);
                    if (response.error) {
                        formError();
                        submitMessage(false, response.mensaje);
                    } else {
                        submitMessage(true, "Termino.");
                        var complete = function() {
                            top.location = "/ecommerce";
                        };
                        info(JSON.stringify(response), complete);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    cwm();

                    var msg = "Error al procesar el Archivo de Catalogo de Productos.<br><br><b>("+jqXHR.status+") "+jqXHR.statusText+"</b>";

                    formError();
                    submitMessage(false, msg);
                }
            });
            e.preventDefault();
            //e.unbind();
        });
        $form.submit();
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

