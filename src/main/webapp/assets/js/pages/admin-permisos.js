
function initAdminPermisos() {
    initTablePermisos();
    initTableRoles();

    obtenPermisos();
}

function initTablePermisos() {
    var $table = $("#table-permisos").DataTable({
        //pagingType: "full_numbers", pageLength: 5, lengthMenu: [[5, 10, 20], [5, 10, 20]], autoWidth: !1,
        data: [],
        columns: [
            {title: "Permiso", data: "nombre"}
        ],
        columnDefs: [
        ],
        scrollY: "400px",
        searching: false,
        paging: false
    });

    $("#table-permisos tbody").on("click", "tr", function() {
        // multiple seleccion
        //$(this).toggleClass("bg-secondary");
        // single seleccion
        if ($(this).hasClass("bg-body-light")) {
            $(this).removeClass("bg-body-light");
        } else {
            $table.$("tr.bg-body-light").removeClass("bg-body-light");
            $(this).addClass("bg-body-light");

            var data = $table.rows(".bg-body-light").data();
            if (data.length>0)
                obtenRolesPermiso(data[0]);
        }
    });

    $table.draw();
}

function obtenPermisos() {
    var onFailII = function(err) {
        notify_class_error("Error al obtener la lista de registros ["+parametros.registro+";"+parametros.where+"].<br><br><b>("+
            err.status+") "+err.statusText+"</b>");
    };
    var onErrorII = function(response) {
        if (response.exception.indexOf("WebException")!==-1) {
            notify_class_warning(response.mensaje);
        } else {
            notify_class_error(response.exception);
        }
        var array = [];
        muestraPermisos(array);
    };
    var onCompleteII = function(response) {
        muestraPermisos(response);
        notify("Listo.");
    };
    notify("Buscando los permisos ...");
    lista("mx.intran.ecommerce.dao.entity.PermisoDAO", "compania = '"+usuario.compania+"'", "nombre",
        onCompleteII, onErrorII, onFailII);
}

function limpiaPermisos() {
    var array = [];
    muestraPermisos(array);
}

function muestraPermisos(response) {
    var $table = $("#table-permisos").DataTable();
    $table.clear();

    $table.rows.add(response);
    $table.draw();
}

function initTableRoles() {
    var $table = $("#table-roles").DataTable({
        data: [],
        columns: [
            {title: "Rol", data: "descripcion"}
        ],
        columnDefs: [
        ],
        scrollY: "400px",
        searching: false,
        paging: false
    });

    $("#table-roles tbody").on("click", "tr", function() {
        // multiple seleccion
        //$(this).toggleClass("bg-secondary");
        // single seleccion
        if ($(this).hasClass("bg-body-light")) {
            $(this).removeClass("bg-body-light");
        } else {
            $table.$("tr.bg-body-light").removeClass("bg-body-light");
            $(this).addClass("bg-body-light");
        }
    });

    $table.draw();
}

function obtenRolesPermiso(rowdata) {
    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al buscar los registros.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        notify_class_error(msg);
    };
    var onError = function(response) {
        if (response.exception.indexOf("WebException")!==-1) {
            notify_class_warning(response.mensaje);
        } else {
            notify_class_error(response.exception);
        }
        var array = [];
        muestraRoles(array);
    };
    var onComplete = function(response) {
        muestraRoles(response);
        notify("Listo.");
    };

    var where = "pp.compania = '"+usuario.compania+"' AND pp.permiso = "+rowdata.permiso;

    notify("Buscando los roles ...");
    coleccion("mx.intran.ecommerce.collection.PermisoPerfilCollection", where,
        onComplete, onError, onFail);
}

function muestraRoles(response) {
    var $table = $("#table-roles").DataTable();
    $table.clear();

    $table.rows.add(response);
    $table.draw();
}

function capturaPermiso(onComplete, onCancelar) {
    var onCompleteII = function(response) {
        var $content = $(response);

        var registro;

        var aceptar = function () {
            var $form = $("#permiso-datos");
            var pass = $form.valid();
            if (!pass) {
                notify("Hay errores con los datos, favor de corregirlos.", $notify);
                return;
            }

            registro = getFormValues($form);

            $modalDialogBusquedas.modal("hide");
        };

        var $buttonCancelar = $("#modalDialogBusquedasCancel");
        $buttonCancelar.unbind("click");
        $buttonCancelar.click(function() {
            notify("Listo.");
            registro = undefined;
            $modalDialogBusquedas.modal("hide");
        });
        var $buttonAceptar = $("#modalDialogBusquedasAccept");
        $buttonAceptar.unbind("click");
        $buttonAceptar.click(function() {
            aceptar();
        });

        var onReady = function() {
            $modalDialogBusquedas.focus();

            $input.select();
            $input.focus();
        };

        $("#modalDialogBusquedasTitle").html("Permiso");
        $("#modalDialogBusquedasDocument").addClass("modal-lg");
        $("#modalDialogBusquedasBody").empty();
        $("#modalDialogBusquedasBody").append($content);

        $("#permiso-datos").validate({
            errorElement: "em",
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            },
            rules: {
                nombre: {
                    required: !0, minlength: 3
                }
            },
            messages: {
                nombre: {
                    required: "Por favor ingrese el <b>nombre</b>.", minlength: "El <b>nombre</b> debe de tener por lo menos 3 caracteres."
                }
            }
        });

        var $input = $("#permiso-datos input[name=nombre]");
        var $notify = $("#modalDialogBusquedasNotify");

        $input.keypress(function(e) {
            if (e.keyCode===13) {
                aceptar();
                return false;
            }
        });

        notify("Listo.", $notify);

        $modalDialogBusquedas.unbind("shown.bs.modal");
        $modalDialogBusquedas.on("shown.bs.modal", function () {
            onReady();
        });
        $modalDialogBusquedas.unbind("hidden.bs.modal");
        $modalDialogBusquedas.on("hidden.bs.modal", function() {
            if (registro) {
                if (onComplete)
                    onComplete(registro);
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

    loadPage("assets/pages/permiso-captura.html", onCompleteII);
}

function agregaPermiso() {
    var onCancel = function() {
    };
    var onSelected = function(response) {
        if (!response)
            return;
        var onAceptar = function() {
            agregaPermisoConfirmado(response);
        };
        question("&iquest;Esta seguro de agregar el PERMISO <b>"+response.nombre+"<b>?", onAceptar);
    };
    capturaPermiso(onSelected, onCancel);
}

function agregaPermisoConfirmado(response) {
    var valores = {
        compania: usuario.compania,
        nombre: response.nombre
    };

    var $app = $("#app");
    valores["app"] = $app.val();

    var onFail = function(err) {
        var mensaje = "Error al guardar el registro.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        notify_class_error(mensaje);
    };
    var onError = function(response) {
        notify_class_error(response.mensaje);
    };
    var onComplete = function(response) {
        notify("Permiso agregado.");
        obtenPermisos();
    };
    notify("Agregando ...");
    accion("mx.intran.ecommerce.dao.entity.PermisoDAO", "add", JSON.stringify(valores),
        onComplete, onError, onFail);
}

function quitaPermiso() {
    var $table = $("#table-permisos").DataTable();

    var data = $table.rows(".bg-body-light").data();
    if (data.length===0) {
        notify_class_warning("Por favor seleccione un Permiso primero.");
        return;
    }

    var rowdata = data[0];

    var onAceptar = function() {
        quitaPermisoConfirmado(rowdata);
    };
    question("&iquest;Esta seguro de QUITAR el PERMISO <b>"+rowdata.nombre+"<b>?", onAceptar);
}

function quitaPermisoConfirmado(rowdata) {
    var valores = {
        compania: usuario.compania,
        permiso: rowdata.permiso
    };

    var $app = $("#app");
    valores["app"] = $app.val();

    var onFail = function(err) {
        var mensaje = "Error al borrar el registro.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        notify_class_error(mensaje);
    };
    var onError = function(response) {
        notify_class_error(response.mensaje);
    };
    var onComplete = function(response) {
        notify("Permiso eliminado.");
        obtenPermisos();
    };
    notify("Quitando ...");
    accion("mx.intran.ecommerce.dao.entity.PermisoDAO", "delete", JSON.stringify(valores),
        onComplete, onError, onFail);
}

function quitaPermisoPerfil() {
    var $table = $("#table-roles").DataTable();

    var data = $table.rows(".bg-body-light").data();
    if (data.length===0) {
        notify_class_warning("Por favor seleccione un Rol de Usuario primero.");
        return;
    }

    var rowdata = data[0];

    var valores = {
        compania: rowdata.compania,
        permiso: rowdata.permiso,
        perfil: rowdata.perfil
    };

    var onFail = function(err) {
        var mensaje = "Error al borrar el registro.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        notify_class_error(mensaje);
    };
    var onError = function(response) {
        notify_class_error(response.mensaje);
    };
    var onComplete = function(response) {
        notify_class_success("Rol eliminado.");
        obtenRolesPermiso(rowdata);
    };
    notify("Quitando ...");
    accion("mx.intran.ecommerce.dao.entity.PermisoPerfilDAO", "delete", JSON.stringify(valores),
        onComplete, onError, onFail);
}

function agregaPermisoPerfil() {
    var $table = $("#table-permisos").DataTable();

    var data = $table.rows(".bg-body-light").data();
    if (data.length===0) {
        notify_class_warning("Por favor seleccione un Permiso primero.");
        return;
    }

    var rowdata = data[0];

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var mensaje = "Error al buscar el registro.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        notify_class_error(mensaje);
    };
    var onError = function(response) {
        if (response.exception.indexOf("WebException")!==-1) {
            notify_class_warning(response.mensaje);
        } else {
            notify_class_error(response.exception);
        }
    };
    var onComplete = function(response) {
        agregaPermisoPerfilConfirmado(rowdata, response);
        notify("Listo.");
    };
    notify("Buscando ...");
    busquedaPerfiles("", onComplete, onError);
}

function agregaPermisoPerfilConfirmado(rowdata, response) {
    var valores = {
        compania: rowdata.compania,
        permiso: rowdata.permiso,
        perfil: response.perfil
    };

    var onFail = function(err) {
        var mensaje = "Error al borrar el registro.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        notify_class_error(mensaje);
    };
    var onError = function(response) {
        notify_class_error(response.mensaje);
    };
    var onComplete = function(response) {
        notify_class_success("Rol agregado.");
        obtenRolesPermiso(rowdata);
    };
    notify("Agregando ...");
    accion("mx.intran.ecommerce.dao.entity.PermisoPerfilDAO", "save", JSON.stringify(valores),
        onComplete, onError, onFail);
}
