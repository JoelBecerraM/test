
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

function buscaMotoresAplicaciones(anio, marca, modelo) {
    console.log("buscaMotoresAplicaciones()", anio, marca, modelo);

    /*
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
     */
}

function buscaModelosAplicaciones(anio, marca) {
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

function inicializaBusquedaModelo(response) {
    var $select = $("#select-modelo");
    $select.empty();
    $select.append($("<option></option>").attr("value","").text(""));
    for (var i=0; i<response.length; i++) {
        $select.append($("<option></option>").attr("value",""+response[i].modelo).text(response[i].descripcion));
    }
    $select.select2({placeholder: "Modelo", allowClear: true});
    $select.trigger("change");
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
    pageModel["pagina"] = 0;
    pageModel["noparte"] = "";
    pageModel["valor"] = "";

    var $select = $("#select-anio");
    pageModel["anio"] = $select.val();
    var $select = $("#select-marca");
    pageModel["marca"] = $select.val();
    var $select = $("#select-modelo");
    pageModel["modelo"] = $select.val();
    var $select = $("#select-motor");
    pageModel["motor"] = $select.val();
    var $select = $("#select-linea");
    pageModel["linea"] = $select.val();

    vistaProductos();
}
