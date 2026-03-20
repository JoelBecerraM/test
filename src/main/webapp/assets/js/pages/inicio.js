
function initInicio() {
    inicializaBusqueda();
    inicializaBusquedaAplicaciones();
    if (loggeado) {
        var onComplete = function(response) {
            armaMapaCarrito(response);
            dibujaTotalesCarrito(response);
        };
        obtenCarrito(onComplete);
    }
}

function inicializaBusquedaAplicaciones() {
    inicializaBusquedaAño();
    limpiaSeleccion($("#select-marca"), "Marca");
    limpiaSeleccion($("#select-modelo"), "Modelo");
    limpiaSeleccion($("#select-motor"), "Motor");
    limpiaSeleccion($("#select-linea"), "Linea");
}

function limpiaSeleccion($select, placeholder) {
    $select.empty();
    $select.append($("<option></option>").attr("value","").text(""));
    if (placeholder)
        $select.select2({placeholder: placeholder, allowClear: true});
}

function cambioSeleccionLinea() {
    var $select = $("#select-anio");
    var anio = $select.val();
    var $select = $("#select-marca");
    var marca = $select.val();
    var $select = $("#select-modelo");
    var modelo = $select.val();
    var $select = $("#select-motor");
    var motor = $select.val();
    var $select = $("#select-linea");
    var linea = $select.val();

    if (anio!==""&&marca!=""&&modelo!==""&&motor!==""&&linea!=="")
        busquedaAutopartesAplicacionesII(anio, marca, modelo, motor, linea);
}

function cambioSeleccionMotor() {
    var $select = $("#select-anio");
    var anio = $select.val();
    var $select = $("#select-marca");
    var marca = $select.val();
    var $select = $("#select-modelo");
    var modelo = $select.val();
    var $select = $("#select-motor");
    var motor = $select.val();

    limpiaSeleccion($("#select-linea"));

    if (anio!==""&&marca!=""&&modelo!==""&&motor!=="")
        buscaLineasAplicaciones(anio, marca, modelo, motor);
}

function cambioSeleccionModelo() {
    var $select = $("#select-anio");
    var anio = $select.val();
    var $select = $("#select-marca");
    var marca = $select.val();
    var $select = $("#select-modelo");
    var modelo = $select.val();

    limpiaSeleccion($("#select-motor"));
    limpiaSeleccion($("#select-linea"));

    if (anio!==""&&marca!=""&&modelo!=="")
        buscaMotoresAplicaciones(anio, marca, modelo);
}

function cambioSeleccionMarca() {
    var $select = $("#select-anio");
    var anio = $select.val();
    var $select = $("#select-marca");
    var marca = $select.val();

    limpiaSeleccion($("#select-modelo"));
    limpiaSeleccion($("#select-motor"));
    limpiaSeleccion($("#select-linea"));

    if (anio!==""&&marca!="")
        buscaModelosAplicaciones(anio, marca);
}

function cambioSeleccionAnio() {
    var $select = $("#select-anio");
    var anio = $select.val();

    limpiaSeleccion($("#select-marca"));
    limpiaSeleccion($("#select-modelo"));
    limpiaSeleccion($("#select-motor"));
    limpiaSeleccion($("#select-linea"));

    if (anio!=="")
        buscaMarcasAplicaciones(anio);
}

function buscaLineasAplicaciones(anio, marca, modelo, motor) {
    var $select = $("#select-linea");
    $select.parent().attr("inert", true);

    var data = {
        compania: usuario.compania,
        usuario: usuario.usuario,
        anio: anio,
        marca: marca,
        modelo: modelo,
        motor: motor,
        id: "LineasAplicaciones"
    };

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al buscar los Lineas.<br><br><b>("+err.status+") "+err.statusText+"</b>";
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
        inicializaBusquedaLinea(response);
    };

    mvc_wwm(data, onComplete, onFail, onError);
}

function buscaMotoresAplicaciones(anio, marca, modelo) {
    var $select = $("#select-motor");
    $select.parent().attr("inert", true);

    var data = {
        compania: usuario.compania,
        usuario: usuario.usuario,
        anio: anio,
        marca: marca,
        modelo: modelo,
        id: "MotoresAplicaciones"
    };

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al buscar los Motores.<br><br><b>("+err.status+") "+err.statusText+"</b>";
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
        inicializaBusquedaMotor(response);
    };

    mvc_wwm(data, onComplete, onFail, onError);
}

function buscaModelosAplicaciones(anio, marca) {
    var $select = $("#select-modelo");
    $select.parent().attr("inert", true);

    var data = {
        compania: usuario.compania,
        usuario: usuario.usuario,
        anio: anio,
        marca: marca,
        id: "ModelosAplicaciones"
    };

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al buscar los Modelos.<br><br><b>("+err.status+") "+err.statusText+"</b>";
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
        inicializaBusquedaModelo(response);
    };

    mvc_wwm(data, onComplete, onFail, onError);
}

function buscaMarcasAplicaciones(anio) {
    var $select = $("#select-marca");
    $select.parent().attr("inert", true);

    var data = {
        compania: usuario.compania,
        usuario: usuario.usuario,
        anio: anio,
        id: "MarcasAplicaciones"
    };

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al buscar las Marcas.<br><br><b>("+err.status+") "+err.statusText+"</b>";
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
        inicializaBusquedaMarca(response);
    };

    mvc_wwm(data, onComplete, onFail, onError);
}

function inicializaBusquedaLinea(response) {
    var $select = $("#select-linea");
    $select.empty();
    $select.append($("<option></option>").attr("value","").text(""));
    for (var i=0; i<response.length; i++) {
        $select.append($("<option></option>").attr("value",""+response[i].linea).text(response[i].descripcion));
    }
    $select.select2({placeholder: "Linea", allowClear: true});
    $select.trigger("change");

    $select.parent().removeAttr("inert");
}

function inicializaBusquedaMotor(response) {
    var $select = $("#select-motor");
    $select.empty();
    $select.append($("<option></option>").attr("value","").text(""));
    for (var i=0; i<response.length; i++) {
        $select.append($("<option></option>").attr("value",""+response[i].motor).text(response[i].descripcion));
    }
    $select.select2({placeholder: "Motor", allowClear: true});
    $select.trigger("change");

    $select.parent().removeAttr("inert");
}

function inicializaBusquedaModelo(response) {
    var $select = $("#select-modelo");
    $select.empty();
    $select.append($("<option></option>").attr("value","").text(""));
    for (var i=0; i<response.length; i++) {
        $select.append($("<option></option>").attr("value",""+response[i].modelo).text(response[i].descripcion));
    }
    $select.select2({placeholder: "Modelo", allowClear: true});
    $select.trigger("change");

    $select.parent().removeAttr("inert");
}

function inicializaBusquedaMarca(response) {
    var $select = $("#select-marca");
    $select.empty();
    $select.append($("<option></option>").attr("value","").text(""));
    for (var i=0; i<response.length; i++) {
        $select.append($("<option></option>").attr("value",""+response[i].armadora).text(response[i].descripcion));
    }
    $select.select2({placeholder: "Marca", allowClear: true});
    $select.trigger("change");

    $select.parent().removeAttr("inert");
}

function inicializaBusquedaAño() {
    var currentTime = new Date();
    var year = currentTime.getFullYear();

    var $select = $("#select-anio");
    $select.empty();
    $select.append($("<option></option>").attr("value","").text(""));
    for (var i=year; i>1980; i--) {
        $select.append($("<option></option>").attr("value",""+i).text(""+i));
    }
    $select.select2({placeholder: "Año", allowClear: true});
}

function busquedaAutopartesAplicaciones() {
    var $select = $("#select-anio");
    var anio = $select.val();
    var $select = $("#select-marca");
    var marca = $select.val();
    var $select = $("#select-modelo");
    var modelo = $select.val();
    var $select = $("#select-motor");
    var motor = $select.val();
    var $select = $("#select-linea");
    var linea = $select.val();

    busquedaAutopartesAplicacionesII(anio, marca, modelo, motor, linea);
}

function busquedaAutopartesAplicacionesII(anio, marca, modelo, motor, linea) {
    pageModel["pagina"] = 0;
    pageModel["noparte"] = "";
    pageModel["valor"] = "";

    pageModel["anio"] = anio;
    pageModel["marca"] = marca;
    pageModel["modelo"] = modelo;
    pageModel["motor"] = motor;
    pageModel["linea"] = linea;

    vistaProductos();
}
