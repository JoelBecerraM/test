
function initAdminClientes() {
    var _catalogo;
    var catalogo = new catalogoABC();
    catalogo.registroCatalogo = "mx.intran.ecommerce.dao.entity.ClienteDAO";

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
                cliente: {
                    required: !0
                },
                nombre: {
                    required: !0, minlength: 3
                },
                lista: {
                    required: !0
                },
                activo: {
                    required: !0
                },
                idvendedor: {
                    required: !0
                },
                vendedor: {
                    required: !0
                },
                idgerenteregional: {
                    required: !0
                },
                gerenteregional: {
                    required: !0
                },
                gerentenacional: {
                    required: !0
                },
                entidadfederativa: {
                    required: !0
                },
                codigopostal: {
                    required: !0
                }
            },
            messages: {
                compania: {
                    required: "Por favor ingrese la <b>compa&ntilde;&iacute;a</b>."
                },
                cliente: {
                    required: "Por favor ingrese el <b>cliente</b>."
                },
                nombre: {
                    required: "Por favor ingrese el <b>nombre</b>.", minlength: "El <b>nombre</b> debe de tener por lo menos 3 caracteres."
                },
                lista: {
                    required: "Por favor elija la <b>lista de precio</b>."
                },
                activo: {
                    required: "Por favor elija la <b>lista de precio</b>."
                },
                idvendedor: {
                    required: "Por favor ingrese el <b>id del vendedor</b>."
                },
                vendedor: {
                    required: "Por favor ingrese el <b>vendedor</b>."
                },
                idgerenteregional: {
                    required: "Por favor ingrese el <b>id del gerente regional</b>."
                },
                gerenteregional: {
                    required: "Por favor ingrese el <b>gerente regional</b>."
                },
                gerentenacional: {
                    required: "Por favor ingrese el <b>gerente nacional</b>."
                },
                entidadfederativa: {
                    required: "Por favor ingrese la <b>entidad federativa</b>."
                },
                codigopostal: {
                    required: "Por favor ingrese el <b>c&oacute;digo postal</b>."
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
        var $cliente = $("#form-datos [name=cliente]");
        $cliente.keypress(function(e) {
            if (e.keyCode===13) {
                _catalogo.buscarRegistros();
            }
        });
        $cliente.focus();

        notify("Listo.");
    };

    catalogo.buscarRegistrosValores = function() {
        var $compania = $("#form-datos [name=compania]");
        var compania = $compania.val();
        if (compania==="") {
            $compania.focus();
            return;
        }
        var $cliente = $("#form-datos [name=cliente]");
        var cliente = $cliente.val();

        return compania+"|"+cliente;
    };

    catalogo.buscarRegistrosBusqueda = function(complete, error) {
        var $cliente = $("#form-datos [name=cliente]");

        busquedaClientes($cliente.val(), complete, error);
    };

    catalogo.buscarRegistrosOnAceptar = function() {
        var $cliente = $("#form-datos [name=cliente]");
        $cliente.select();
        $cliente.focus();
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
        var $cliente = $("#form-datos [name=cliente]");
        $cliente.focus();
    };

    catalogo.initCaptura();

    _catalogo = catalogo;
}
