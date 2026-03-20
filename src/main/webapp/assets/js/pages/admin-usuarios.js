
function initAdminUsuarios() {
    var _catalogo;
    var catalogo = new catalogoABC();
    catalogo.registroCatalogo = "mx.intran.ecommerce.dao.entity.UsuarioDAO";

    catalogo.initialize = function() {
        $(".js-select2").select2();

        $(".js-select2-multiple").select2({
            placeholder: "Seleccione las opciones",
            allowClear: true
        });

        $("#form-datos").validate({
            errorElement: "em",
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            },
            rules: {
                compania: {
                    required: !0
                },
                usuario: {
                    required: !0
                },
                nombre: {
                    required: !0, minlength: 3
                },
                password: {
                    required: !0, minlength: 8, maxlength: 20
                },
                email: {
                    required: !0,
                    email: true
                },
                perfil: {
                    required: !0
                },
                estado: {
                    required: !0
                },
                cliente: {
                    required: !0
                },
                avatar: {
                    required: !0
                }
            },
            messages: {
                compania: {
                    required: "Por favor ingrese la <b>compa&ntilde;&iacute;a</b>."
                },
                usuario: {
                    required: "Por favor ingrese el <b>usuario</b>."
                },
                nombre: {
                    required: "Por favor ingrese el <b>nombre</b>.", minlength: "El <b>nombre</b> debe de tener por lo menos 3 caracteres."
                },
                password: {
                    required: "Por favor ingrese la nueva <b>contrase&ntilde;a</b>.",
                    minlength: "La nueva <b>contrase&ntilde;a</b> debe de tener por lo menos 8 caracteres.", maxlength: "La nueva <b>contrase&ntilde;a</b> debe de tener hasta 20 caracteres."
                },
                email: {
                    required: "Por favor ingrese el <b>correo electr&oacute;nico</b>.", email: "Por favor escriba un <b>correo electr&oacute;nico</b> v&aacute;lido."
                },
                perfil: {
                    required: "Por favor elija el <b>perfil</b>."
                },
                estado: {
                    required: "Por favor elija el <b>estado</b>."
                },
                estado: {
                    required: "Por favor ingrese el <b>cliente</b>."
                },
                avatar: {
                    required: "Por favor elija el <b>avatar</b>."
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

        var $perfil = $("#form-datos [name=perfil]");
        comboRegistros("mx.intran.ecommerce.dao.entity.PerfilDAO", "compania = '"+usuario.compania+"'", "descripcion",
            $perfil, "perfil", "descripcion");

        $("#buscar-span").click(function(e) {
            _catalogo.buscarRegistros();
        });
        var $usuario = $("#form-datos [name=usuario]");
        $usuario.keypress(function(e) {
            if (e.keyCode===13) {
                _catalogo.buscarRegistros();
            }
        });
        $usuario.focus();

        notify("Listo.");
    };

    catalogo.buscarRegistrosValores = function() {
        var $compania = $("#form-datos [name=compania]");
        var compania = $compania.val();
        if (compania==="") {
            $compania.focus();
            return;
        }
        var $usuario = $("#form-datos [name=usuario]");
        var usuario = $usuario.val();

        return compania+"|"+usuario;
    };

    catalogo.buscarRegistrosBusqueda = function(complete, error) {
        var $usuario = $("#form-datos [name=usuario]");

        busquedaUsuarios($usuario.val(), complete, error);
    };

    catalogo.buscarRegistrosOnAceptar = function() {
        var $usuario = $("#form-datos [name=usuario]");
        $usuario.select();
        $usuario.focus();
    };

    catalogo.buscarRegistrosOnComplete = function(response) {
        var $form = $("#form-datos");
        setFormValues($form, response);

        $("#avatar-img").attr("src", response.avatar);

        notify("Listo.");
    };

    catalogo.getValoresRegistro = function() {
        var $form = $("#form-datos");
        var valores = getFormValues($form);

        if (valores["cambiopassword"]==="")
            delete valores["cambiopassword"];

        return JSON.stringify(valores);
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
        var $usuario = $("#form-datos [name=usuario]");
        $usuario.focus();
    };

    catalogo.initCaptura();

    _catalogo = catalogo;
}
