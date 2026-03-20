
function initProductos() {
    ponSeleccionCuantos();
    busquedaProductos();
}

function busquedaProductos() {
    if (!pageModel["pagina"])
        pageModel["pagina"] = 0;
    if (!pageModel["valor"])
        pageModel["valor"] = "";
    if (!pageModel["noparte"])
        pageModel["noparte"] = "";
    if (!pageModel["anio"])
        pageModel["anio"] = "";
    if (!pageModel["marca"])
        pageModel["marca"] = "";
    if (!pageModel["modelo"])
        pageModel["modelo"] = "";
    if (!pageModel["motor"])
        pageModel["motor"] = "";
    if (!pageModel["linea"])
        pageModel["linea"] = "";

    busquedaAutopartes(pageModel.pagina, pageModel.noparte, pageModel.valor,
        pageModel.anio, pageModel.marca, pageModel.modelo, pageModel.motor, pageModel.linea);
}

function busquedaProductosPagina(pagina) {
    $(window).scrollTop(0);

    pageModel["pagina"] = pagina;
    busquedaProductos();
}

function productsView(mode) {
    var data = {
        mode: mode,
        id: "SetProductsView"
    };

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al ejecutar.<br><br><b>("+err.status+") "+err.statusText+"</b>";
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
        pageModel.productsView = mode;
        vistaProductos();
    };

    mvc(data, onComplete, onFail, onError);
}

function productsHowMany(howmany) {
    var data = {
        howmany: howmany,
        id: "SetProductsHowMany"
    };

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al ejecutar.<br><br><b>("+err.status+") "+err.statusText+"</b>";
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
        pageModel.productsHowMany = howmany;
        vistaProductos();
    };

    mvc(data, onComplete, onFail, onError);
}

function cambioSeleccionCuantos() {
    var $option = $("#select-cuantos option:selected");
    var cuantos = $option.val();
    productsHowMany(cuantos);
}

function ponSeleccionCuantos() {
    var $select = $("#select-cuantos");

    $("#select-cuantos option[value='"+pageModel.productsHowMany+"']").attr("selected", "selected");
    $select.trigger("change");

    $select.on("change", function() {
        cambioSeleccionCuantos();
    });
}

function busquedaAutopartes(pagina, noparte, valor, anio, marca, modelo, motor, linea) {
    if (anio!=="")
        busquedaAutopartesAplicacion(pagina, anio, marca, modelo, motor, linea);
    else
        busquedaAutopartesDescripcion(pagina, noparte, valor);
}

function busquedaAutopartesAplicacion(pagina, anio, marca, modelo, motor, linea) {
    var data = {
        compania: usuario.compania,
        usuario: usuario.usuario,
        pagina: pagina,
        cuantos: pageModel.productsHowMany,
        anio: anio,
        marca: marca,
        modelo: modelo,
        motor: motor,
        linea: linea,
        id: "AutopartesAplicacion"
    };

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al buscar las Autopartes.<br><br><b>("+err.status+") "+err.statusText+"</b>";
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
        dibujaProductos(response);
    };

    mvc(data, onComplete, onFail, onError);
}

function busquedaAutopartesDescripcion(pagina, noparte, valor) {
    var data = {
        compania: usuario.compania,
        usuario: usuario.usuario,
        pagina: pagina,
        cuantos: pageModel.productsHowMany,
        noparte: noparte,
        valor: valor,
        id: "AutopartesDescripcion"
    };

    var onAceptar = function() {
    };
    var onFail = function(err) {
        var msg = "Error al buscar las Autopartes.<br><br><b>("+err.status+") "+err.statusText+"</b>";
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
        dibujaProductos(response);
    };

    mvc(data, onComplete, onFail, onError);
}

function colocaValoresProducto(producto_forma, producto) {
    var cantidad = elCarrito.get(producto.noparte);
    if (!cantidad||cantidad===0)
        cantidad = 1;

    var productoHTML = producto_forma;
    productoHTML = replaceAll(productoHTML, "@disponibilidad@", producto.existencia>0 ? "En Inventario" : "N/D");
    productoHTML = replaceAll(productoHTML, "@noparte@", producto.noparte);
    productoHTML = replaceAll(productoHTML, "@descripcion@", producto.descripcion);
    productoHTML = replaceAll(productoHTML, "@cantidad@", cantidad);
    productoHTML = replaceAll(productoHTML, "@lista@", usuario.lista);
    productoHTML = replaceAll(productoHTML, "@precio@", formatMoney(producto[usuario.lista]));
    if (producto.pro_normal>0.0||producto.pro_especial>0.0) {
        productoHTML = replaceAll(productoHTML, "@promocionnormal@", formatMoney(producto.pro_normal));
        productoHTML = replaceAll(productoHTML, "@promocionespecial@", formatMoney(producto.pro_especial));
    } else {
        productoHTML = replaceAll(productoHTML, "promocion", "invisible");
    }
    productoHTML = replaceAll(productoHTML, "@sistema@", producto.sistema);
    productoHTML = replaceAll(productoHTML, "@familia@", producto.familia);
    productoHTML = replaceAll(productoHTML, "@linea@", producto.linea);
    productoHTML = replaceAll(productoHTML, "@oem@", producto.oem);

    return productoHTML;
}

function dibujaProductos(response) {
    var $div = $("#products");
    $div.empty();

    var productos = response.productos;

    // List View
    if (pageModel.productsView==0) {
        for (var indx=0; indx<productos.length; indx++) {
            var productoHTML = colocaValoresProducto(producto_lista, productos[indx]);

            var $divProducto = $(productoHTML);
            $div.append($divProducto);
        }
    }
    // Grid View
    else if (pageModel.productsView==1) {
        var $rowProductos = undefined;
        for (var indx=0; indx<productos.length; indx++) {
            var productoHTML = colocaValoresProducto(producto_grid, productos[indx]);

            if ((indx%3)==0) {
                if ($rowProductos) {
                    $div.append($rowProductos);
                }
                $rowProductos = $('<div class="row mb-2"></div>');
            }

            var $divProducto = $(productoHTML);
            $rowProductos.append($divProducto);
        }
        if ($rowProductos)
            $div.append($rowProductos);
    }

    dibujaCategorias(response.categorias);
    dibujaLineas(response.lineas);
    dibujaSistemas(response.sistemas);
    dibujaPaginas(response.paginas);

    if (!loggeado)
        $(".loggeado").addClass("invisible");
}

function dibujaCategorias(response) {
    var $ul = $("#ul-categorias");
    $ul.empty();
    for (var indx=0; indx<response.length; indx++) {
        var categoria = categoria_li;
        categoria = replaceAll(categoria, "@clave@", response[indx].familia);
        categoria = replaceAll(categoria, "@descripcion@", response[indx].descripcion);

        var $li = $(categoria);
        $ul.append($li);
    }
    var height = $ul.height();
    if (height>300) {
        $ul.css("height", "300px");
        $ul.css("overflow-y", "scroll");
    }
}

function dibujaLineas(response) {
    var $ul = $("#ul-lineas");
    $ul.empty();
    for (var indx=0; indx<response.length; indx++) {
        var categoria = categoria_li;
        categoria = replaceAll(categoria, "@clave@", response[indx].linea);
        categoria = replaceAll(categoria, "@descripcion@", response[indx].descripcion);

        var $li = $(categoria);
        $ul.append($li);
    }
    var height = $ul.height();
    if (height>300) {
        $ul.css("height", "300px");
        $ul.css("overflow-y", "scroll");
    }
}

function dibujaSistemas(response) {
    var $ul = $("#ul-sistemas");
    $ul.empty();
    for (var indx=0; indx<response.length; indx++) {
        var categoria = categoria_li;
        categoria = replaceAll(categoria, "@clave@", response[indx].sistema);
        categoria = replaceAll(categoria, "@descripcion@", response[indx].descripcion);

        var $li = $(categoria);
        $ul.append($li);
    }
    var height = $ul.height();
    if (height>300) {
        $ul.css("height", "300px");
        $ul.css("overflow-y", "scroll");
    }
}

function dibujaPaginas(response) {
    var $div = $("#pagination");
    $div.empty();

    if (response.pagina>3) {
        $div.append('<a href="#" onclick="busquedaProductosPagina(0); return false;" class="prev page-numbers"><i class="bx bxs-chevron-left"></i></a>');
    }
    for (var indx=response.pagina-3; indx<response.pagina; indx++) {
        if (indx>-1)
            $div.append('<a href="#" onclick="busquedaProductosPagina('+indx+'); return false;" class="page-numbers">'+(indx+1)+'</a>');
    }
    $div.append('<span class="page-numbers current" aria-current="page">'+(response.pagina+1)+'</span>');
    for (var indx=response.pagina+1; indx<response.pagina+4; indx++) {
        if (indx<response.totalPaginas)
            $div.append('<a href="#" onclick="busquedaProductosPagina('+indx+'); return false;" class="page-numbers">'+(indx+1)+'</a>');
    }
    if (response.pagina<response.totalPaginas-3) {
        $div.append('<a href="#" onclick="busquedaProductosPagina('+(response.totalPaginas-1)+'); return false;" class="prev page-numbers"><i class="bx bxs-chevron-right"></i></a>');
    }
}