
function initProductoDetalle() {
    busquedaProducto();
}

function busquedaProducto() {
    if (!pageModel["noparte"])
        pageModel["noparte"] = "";

    busquedaAutoparte(pageModel.noparte);
}

function busquedaAutoparte(noparte) {
    var data = {
        compania: usuario.compania,
        usuario: usuario.usuario,
        noparte: noparte,
        id: "Autoparte"
    };

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al buscar la Autoparte.<br><br><b>("+err.status+") "+err.statusText+"</b>";
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
        dibujaProducto(response);
    };

    mvc(data, onComplete, onFail, onError);
}

function dibujaProducto(response) {
    var autoparte = response.autoparte;

    var $images = $("#images");
    $images.append($(replaceAll(images_producto, "@noparte@", autoparte.noparte)));

    var $descripcion = $("#descripcion");
    $descripcion.html(autoparte.descripcion);
    var $descripcionlarga = $("#descripcionlarga");
    $descripcionlarga.html(autoparte.descripcionlarga);

    var $disponibilidad = $("#disponibilidad");
    $disponibilidad.html(autoparte.existencia>0 ? "En Inventario" : "N/D");
    var $noparte = $("#noparte");
    $noparte.html(autoparte.noparte);
    var $familia = $("#familia");
    $familia.html(autoparte.familia);
    var $linea = $("#linea");
    $linea.html(autoparte.linea);
    var $sistema = $("#sistema");
    $sistema.html(autoparte.sistema);

    var cantidad = elCarrito.get(autoparte.noparte);
    if (!cantidad||cantidad===0)
        cantidad = 1;

    var $cantidad = $("#cantidad");
    $cantidad.val(cantidad);
    var $precio = $("#precio");
    $precio.html(formatMoney(autoparte[usuario.lista]));
    $precio.addClass(usuario.lista);
    if (autoparte.pro_normal>0.0||autoparte.pro_especial>0.0) {
        var $preciopromocion = $("#preciopromocion");
        $preciopromocion.html(formatMoney(autoparte[usuario.lista]));
        var $promocionnormal = $("#promocionnormal");
        $promocionnormal.html(formatMoney(autoparte.pro_normal));
        var $promocionespecial = $("#promocionespecial");
        $promocionespecial.html(formatMoney(autoparte.pro_especial));
    } else {
        var $promocion = $("#promocion");
        $promocion.addClass("invisible");
    }

    var precios = ["pre_naranja", "pre_verde", "pre_morada", "pre_azul",
        "pre_roja", "pre_cafe", "pre_rosa", "pre_amarilla", "pre_azulmarino"];

    var $div = $("#precios");
    var $divPrecios = undefined;
    var no = 0;
    for (var indx=0; indx<precios.length; indx++) {
        var namePrecio = precios[indx];
        var valuePrecio = autoparte[namePrecio];

        if ((no%3)==0) {
            if ($divPrecios) {
                $div.append($divPrecios);
            }
            $divPrecios = $('<div class="row" style="border-top: 1px solid #e1e1e1;">');
        }

        var $divPrecio = $('<div class="col-lg-4 col-md-4"><span class="'+namePrecio+'_background">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br><span>'
                +replaceAll(namePrecio.toUpperCase(), "PRE_", "LISTA ")+'</span><br><span><b>'
                +formatMoney(valuePrecio)+'</b></span></div>');
        $divPrecios.append($divPrecio);

        no++;
    }
    if ($divPrecios)
        $div.append($divPrecios);

    var codigos = [
        "auteria", "spectra", "airtex", "carter", "kem", "performance", "beru", "uniflow", "cartek", "wells",
        "standard", "tomco", "ds", "indebrass", "jinjia", "bosch", "delphi", "acdelco", "walbro", "zhz",
        "wincan_achr", "serva", "injetech_ciosa", "apymsa"
    ];
    var acodigos = autoparte.codigos.split("@");
    for (var indx=0; indx<acodigos.length; indx++) {
        autoparte[codigos[indx]] = acodigos[indx];
    }

    var especificaciones = [
        "resistencia", "otros", "oem", "presion", "litros", "volts", "amperaje"
    ];
    especificaciones = especificaciones.concat(codigos);

    var $div = $("#especificaciones");
    var $divEspecificaciones = undefined;
    var no = 0;
    for (var indx=0; indx<especificaciones.length; indx++) {
        var nameEspecificacion = especificaciones[indx];
        var valueEspecificacion = autoparte[nameEspecificacion];
        if (!valueEspecificacion)
            continue;

        if ((no%3)==0) {
            if ($divEspecificaciones) {
                $div.append($divEspecificaciones);
            }
            $divEspecificaciones = $('<div class="row" style="border-top: 1px solid #e1e1e1;">');
        }

        var $divEspecificacion = $('<div class="col-lg-4 col-md-4"><span>'
                +nameEspecificacion.toUpperCase()+'</span><br><a onclick="return false;">'
                +valueEspecificacion+'</a></div>');
        $divEspecificaciones.append($divEspecificacion);

        no++;
    }
    if ($divEspecificaciones)
        $div.append($divEspecificaciones);

    dibujaRelacionados(response);

    if (!loggeado)
        $(".loggeado").addClass("invisible");
    if (!usuario.permisos.includes("verPrecios"))
        $(".ver-precios").addClass("invisible");
}

function dibujaRelacionados(response) {
    var $div = $("#products");
    $div.empty();

    var productos = response.relacionados;

    var $rowProductos = undefined;
    for (var indx=0; indx<productos.length; indx++) {
        var cantidad = elCarrito.get(productos[indx].noparte);
        if (!cantidad||cantidad===0)
            cantidad = 1;

        var producto = producto_grid;
        producto = replaceAll(producto, '<div class="col-lg-4 col-sm-4">', '<div class="col-lg-3 col-sm-3">');
        producto = replaceAll(producto, "@disponibilidad@", productos[indx].existencia>0 ? "En Inventario" : "N/D");
        producto = replaceAll(producto, "@noparte@", productos[indx].noparte);
        producto = replaceAll(producto, "@descripcion@", productos[indx].descripcion);
        producto = replaceAll(producto, "@cantidad@", cantidad);
        producto = replaceAll(producto, "@lista@", usuario.lista);
        producto = replaceAll(producto, "@precio@", formatMoney(productos[indx][usuario.lista]));
        if (producto.pro_normal>0.0||producto.pro_especial>0.0) {
            productoHTML = replaceAll(productoHTML, "@promocionnormal@", formatMoney(producto.pro_normal));
            productoHTML = replaceAll(productoHTML, "@promocionespecial@", formatMoney(producto.pro_especial));
        } else {
            productoHTML = replaceAll(productoHTML, "promocion", "invisible");
        }
        producto = replaceAll(producto, "@sistema@", productos[indx].sistema);
        producto = replaceAll(producto, "@familia@", productos[indx].familia);
        producto = replaceAll(producto, "@linea@", productos[indx].linea);
        producto = replaceAll(producto, "@oem@", productos[indx].oem);

        if ((indx%4)==0) {
            if ($rowProductos) {
                $div.append($rowProductos);
            }
            $rowProductos = $('<div class="row mb-2"></div>');
        }

        var $divProducto = $(producto);
        $rowProductos.append($divProducto);
    }
    if ($rowProductos)
        $div.append($rowProductos);
}

function buscaAplicaciones(noparte) {
    var data = {
        compania: usuario.compania,
        usuario: usuario.usuario,
        noparte: noparte,
        id: "AutoparteAplicaciones"
    };

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al buscar la Autoparte.<br><br><b>("+err.status+") "+err.statusText+"</b>";
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
        dibujaAplicaciones(response);
    };

    mvc(data, onComplete, onFail, onError);
}

function dibujaAplicaciones(response) {
    var $div = $("#aplicaciones");
    $div.empty();

    var $divAplicacion = $('<div class="row" style="border-top: 1px solid #e1e1e1;">');
    $divAplicacion.append($('<div class="col-lg-2 col-md-4 col-sm-6"><span><b>Armadora</b></span></div>'));
    $divAplicacion.append($('<div class="col-lg-2 col-md-4 col-sm-6"><span><b>Fabricante</b></span></div>'));
    $divAplicacion.append($('<div class="col-lg-2 col-md-4 col-sm-6"><span><b>Modelo</b></span></div>'));
    $divAplicacion.append($('<div class="col-lg-2 col-md-4 col-sm-6"><span><b>Motor</b></span></div>'));
    $divAplicacion.append($('<div class="col-lg-2 col-md-4 col-sm-6"><span><b>Cilindro</b></span></div>'));
    $divAplicacion.append($('<div class="col-lg-1 col-md-2 col-sm-3"><span><b>Inicio</b></span></div>'));
    $divAplicacion.append($('<div class="col-lg-1 col-md-2 col-sm-3"><span><b>Fin</b></span></div>'));
    $div.append($divAplicacion);

    for (var indx=0; indx<response.length; indx++) {
        $divAplicacion = $('<div class="row" style="border-top: 1px solid #e1e1e1;">');

        $divAplicacion.append($('<div class="col-lg-2 col-md-4 col-sm-6">'+response[indx].dsarmadora+'</div>'));
        $divAplicacion.append($('<div class="col-lg-2 col-md-4 col-sm-6">'+response[indx].dsfabricante+'</div>'));
        $divAplicacion.append($('<div class="col-lg-2 col-md-4 col-sm-6">'+response[indx].dsmodelo+'</div>'));
        $divAplicacion.append($('<div class="col-lg-2 col-md-4 col-sm-6">'+response[indx].dsmotor+'</div>'));
        $divAplicacion.append($('<div class="col-lg-2 col-md-4 col-sm-6">'+response[indx].dscilindro+'</div>'));
        $divAplicacion.append($('<div class="col-lg-1 col-md-2 col-sm-3">'+response[indx].periodoini+'</div>'));
        $divAplicacion.append($('<div class="col-lg-1 col-md-2 col-sm-3">'+response[indx].periodofin+'</div>'));

        $div.append($divAplicacion);
    }

    $(window).scrollTop($div.parent().position().top);
}
