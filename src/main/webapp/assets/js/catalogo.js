
function catalogoABC() {
}

catalogoABC.prototype.initialize = function() {
};

catalogoABC.prototype.initCaptura = function() {
    var _this = this;

    $("#btn-buscar").click(function() {
        _this.buscarRegistros();
    });
    $("#btn-nuevo").click(function() {
        _this.nuevoRegistro();
    });
    $("#btn-limpiar").click(function() {
        _this.limpiarRegistro();
    });
    $("#btn-guardar").click(function() {
        _this.guardarRegistro();
    });
    $("#btn-borrar").click(function() {
        _this.borrarRegistro();
    });
    $("#btn-reportes").click(function() {
        _this.reportesRegistro();
    });

    _this.initialize();
};

catalogoABC.prototype.validaDatosRegistro = function() {
    var $form = $("#form-datos");
    var pass = $form.valid();
    if (!pass)
        notify_class_error("Hay errores con los datos, favor de corregirlos.");
    return pass;
};

catalogoABC.prototype.getValoresRegistro = function() {
    var $form = $("#form-datos");
    var valores = getFormValues($form);
    return JSON.stringify(valores);
};

catalogoABC.prototype.guardarRegistroOnComplete = function(response) {
};

catalogoABC.prototype.guardarRegistro = function() {
    var _this = this;

    if (!_this.validaDatosRegistro())
        return;

    var valores = _this.getValoresRegistro();

    var onFail = function(err) {
        var mensaje = "Error al guardar el registro.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        notify_class_error(mensaje);
    };
    var onError = function(response) {
        //error(response.mensaje);
        notify_class_error(response.mensaje);
    };
    notify("Guardando el registro ...");
    accion(_this.registroCatalogo, "save", valores,
        _this.guardarRegistroOnComplete, onError, onFail);
};

catalogoABC.prototype.limpiarRegistroInit = function() {
};

catalogoABC.prototype.limpiarRegistro = function() {
    var _this = this;

    var $form = $("#form-datos");
    emptyFormValues($form);

    _this.limpiarRegistroInit();

    //$(window).scrollTop($form.offset().top);

    notify("Listo.");
};

catalogoABC.prototype.nuevoRegistroOnComplete = function(response) {
    var $form = $("#form-datos");
    setFormValues($form, response);
    notify("Listo.");
};

catalogoABC.prototype.nuevoRegistro = function() {
    var _this = this;

    var valores = _this.getValoresRegistro();

    var onFail = function(err) {
        var mensaje = "Error al crear el registro.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        notify_class_error(mensaje);
    };
    var onError = function(response) {
        if (response.exception.indexOf("WebException")!==-1) {
            //warning(response.mensaje, _this.buscarRegistrosOnAceptar);
            notify_class_warning(response.mensaje);
        } else {
            //error(response.exception, _this.buscarRegistrosOnAceptar);
            notify_class_error(response.exception);
        }
    };
    notify("Creando el registro ...");
    accion(_this.registroCatalogo, "add", valores,
        _this.nuevoRegistroOnComplete, onError, onFail);
};

catalogoABC.prototype.borrarRegistro = function() {
    var _this = this;

    var onAceptar = function() {
        _this.borrarRegistroConfirmado();
    };
    question("&iquest;Esta seguro de borrar el registro?", onAceptar);
};

catalogoABC.prototype.borrarRegistroConfirmadoOnComplete = function(response) {
};

catalogoABC.prototype.borrarRegistroConfirmado = function() {
    var _this = this;

    var valores = _this.getValoresRegistro();

    var onFail = function(err) {
        var mensaje = "Error al borrar el registro.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        notify_class_error(mensaje);
    };
    var onError = function(response) {
        error(response.mensaje);
        notify_class_error(response.mensaje);
    };
    notify("Borrando el registro ...");
    accion(_this.registroCatalogo, "delete", valores,
        _this.borrarRegistroConfirmadoOnComplete, onError, onFail);
};

catalogoABC.prototype.buscarRegistrosOnAceptar = function() {
};

catalogoABC.prototype.buscarRegistrosValores = function() {
};

catalogoABC.prototype.buscarRegistrosBusqueda = function(complete, error) {
};

catalogoABC.prototype.buscarRegistrosOnComplete = function(response) {
    var $form = $("#form-datos");
    setFormValues($form, response);
    notify("Listo.");
};

catalogoABC.prototype.buscarRegistros = function() {
    var _this = this;

    var onFail = function(err) {
        var mensaje = "Error al buscar el registro.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        notify_class_error(mensaje);
    };
    var onError = function(response) {
        if (response.exception.indexOf("No existe este registro")!==-1) {
            _this.buscarRegistrosBusqueda(_this.buscarRegistrosOnComplete, onError);
        } else if (response.exception.indexOf("WebException")!==-1) {
            //warning(response.mensaje, _this.buscarRegistrosOnAceptar);
            notify_class_warning(response.mensaje);
        } else {
            //error(response.exception, _this.buscarRegistrosOnAceptar);
            notify_class_error(response.exception);
        }
    };
    notify("Buscando el registro ...");
    registro(_this.registroCatalogo, _this.buscarRegistrosValores(),
        _this.buscarRegistrosOnComplete, onError, onFail);
};

catalogoABC.prototype.reportesRegistro = function() {
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function direccionABC() {
}

direccionABC.prototype.modificaDireccion = function() {
    var $direccion = $("#form-datos [name=direccion]");
    var direccion = $direccion.val();
    if (direccion==="")
        return;

    catalogoDirecciones(direccion);
};

direccionABC.prototype.buscarDireccion = function() {
    var _this = this;

    var $compania = $("#form-datos [name=compania]");
    var compania = $compania.val();
    if (compania==="")
        return;
    var $direccion = $("#form-datos [name=direccion]");
    var direccion = $direccion.val();
    if (direccion==="")
        return;

    var onAceptar = function() {
        $direccion.select();
        $direccion.focus();
    };
    var onFail = function(err) {
        var mensaje = "Error al buscar el registro.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        notify_class_error(mensaje);
    };
    var onError = function(response) {
        if (response.exception.indexOf("WebException")!==-1) {
            //warning(response.mensaje, onAceptar);
            notify_class_warning(response.mensaje);
        } else {
            //error(response.exception, onAceptar);
            notify_class_error(response.exception);
        }
    };
    var onComplete = function(response) {
        _this.buscarColonia(response);
        notify("Listo.");
    };
    notify("Buscando el registro ...");
    registro("mx.intran.ecommerce.dao.entity.DireccionDAO", compania+"|"+direccion,
        onComplete, onError, onFail);
};

direccionABC.prototype.buscarColonia = function(direccion) {
    var _this = this;

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var mensaje = "Error al buscar el registro.<br><br><b>("+err.status+") "+err.statusText+"</b>";
        notify_class_error(mensaje);
    };
    var onError = function(response) {
        if (response.exception.indexOf("WebException")!==-1) {
            precaucion(response.mensaje, onAceptar);
            notify_class_warning(response.mensaje);
        } else {
            error(response.exception, onAceptar);
            notify_class_error(response.exception);
        }
    };
    var onComplete = function(colonias) {
        _this.pasaValoresDireccion(direccion, colonias[0]);
        notify("Listo.");
    };
    notify("Buscando el registro ...");
    coleccion("mx.com.laeuropea.cfdi.collection.ColoniasCollection", "c.colonia = '"+direccion.colonia+"'",
        onComplete, onError, onFail);
};

direccionABC.prototype.pasaValoresDireccion = function(direccion, colonia) {
    var $descripcion_direccion = $("#form-datos [name=descripcion_direccion]");
    //$descripcion_direccion.val(JSON.stringify(response));
    var direccion_descripcion = direccion.calle
        +(direccion.noexterior==="" ? "" : " No. Ext. "+direccion.noexterior)
        +(direccion.nointerior==="" ? "" : " No. Int. "+direccion.nointerior);
    if (colonia) {
        direccion_descripcion = direccion_descripcion
            +"\n"+colonia.dscolonia+", "+colonia.dspoblacion
            +"\n"+colonia.dsentidadfederativa+", "+colonia.dspais;
    }
    direccion_descripcion = direccion_descripcion+"\nC.P.: "+direccion.codigopostal;

    $descripcion_direccion.val(direccion_descripcion);
};
