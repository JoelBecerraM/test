
function initAdminPerfiles() {
    var _catalogo;
    var catalogo = new catalogoABC();
    catalogo.registroCatalogo = "mx.intran.ecommerce.dao.entity.PerfilDAO";

    catalogo.initialize = function() {
        $("#form-datos").validate({
            errorElement: "em",
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            },
            rules: {
                compania: {
                    required: !0
                },
                perfil: {
                    required: !0
                },
                descripcion: {
                    required: !0, minlength: 3
                }
            },
            messages: {
                compania: {
                    required: "Por favor ingrese la <b>compa&ntilde;&iacute;a</b>."
                },
                perfil: {
                    required: "Por favor ingrese el <b>perfil</b>."
                },
                descripcion: {
                    required: "Por favor ingrese la <b>descripci&oacute;n</b>.", minlength: "La <b>descripci&oacute;n</b> debe de tener por lo menos 3 caracteres."
                }
            }
        });

        var $compania = $("#form-datos [name=compania]");
        $compania.val(usuario.compania);
        var onComplete = function(response) {
            var $razonsocial = $("#form-datos [name=razonsocial]");
            $razonsocial.val(response.razonsocial);
        };
        buscarCompania(onComplete);

        $("#buscar-span").click(function(e) {
            _catalogo.buscarRegistros();
        });
        var $perfil = $("#form-datos [name=perfil]");
        $perfil.keypress(function(e) {
            if (e.keyCode===13) {
                _catalogo.buscarRegistros();
            }
        });
        $perfil.focus();

        notify("Listo.");
    };

    catalogo.buscarRegistrosValores = function() {
        var $compania = $("#form-datos [name=compania]");
        var compania = $compania.val();
        if (compania==="") {
            $compania.focus();
            return;
        }
        var $perfil = $("#form-datos [name=perfil]");
        var perfil = $perfil.val();

        return compania+"|"+perfil;
    };

    catalogo.buscarRegistrosBusqueda = function(complete, error) {
        var $perfil = $("#form-datos [name=perfil]");

        busquedaPerfiles($perfil.val(), complete, error);
    };

    catalogo.buscarRegistrosOnAceptar = function() {
        var $perfil = $("#form-datos [name=perfil]");
        $perfil.select();
        $perfil.focus();
    };

    catalogo.guardarRegistroOnComplete = function(response) {
        var msg = "Registro guardado correctamente.";
        notify_class_success(msg);
    };

    catalogo.borrarRegistroConfirmadoOnComplete = function(response) {
        var msg = "Registro borrado correctamente.";
        notify_class_success(msg);

        _catalogo.limpiarRegistro();
    };

    catalogo.limpiarRegistroInit = function() {
        var $perfil = $("#form-datos [name=perfil]");
        $perfil.focus();
    };

    catalogo.initCaptura();

    _catalogo = catalogo;
}
