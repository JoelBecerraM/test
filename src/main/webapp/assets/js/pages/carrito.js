
function initCarrito() {
    var $form = $("#form-subir");
    $("#form-subir input[name=compania]").val(usuario.compania);
    $("#form-subir input[name=usuario]").val(usuario.usuario);

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
        $("#msgSubmit").removeClass().addClass(msgClasses).html(msg);
    }
    var submitForm = function() {
        submitMessage(true, "Subiendo Pedido ...");

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

                    var msg = "Error al procesar el Archivo de Pedido.<br><br><b>("+jqXHR.status+") "+jqXHR.statusText+"</b>";

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

    var onComplete = function(response) {
        dibujaCarrito(response);
    };
    obtenCarrito(onComplete);
    ponSeleccionPromociones();
}

function productsPromotions(checked) {
    var data = {
        checked: checked,
        id: "SetSelectPromotions"
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
        pageModel.selectPromotions = checked;
    };

    mvc(data, onComplete, onFail, onError);
}

function cambioSeleccionPromociones() {
    var $switch = $("#switch-promociones");
    var checked = $switch.is(":checked");
    productsPromotions(checked);
}

function ponSeleccionPromociones() {
    var $switch = $("#switch-promociones");

    $switch.prop("checked", pageModel.selectPromotions);

    $switch.on("change", function() {
        cambioSeleccionPromociones();
    });
}

var tr_producto =
    '<tr class="top-class" id="@noparte@tr"> \
        <td class="product-thumbnail"> \
            <a href="#" onclick="borraProductoDelCarrito(\'@noparte@\'); return false;" class="remove"><i class="bx bx-x"></i></a> \
            <a href="#" onclick="pageModel[\'noparte\'] = \'@noparte@\'; vistaProductoDetalle(); return false;"> \
                <img src="/intran/fotos/chicas/@noparte@.png" onerror="this.src=\'/ecommerce/assets/img/shop/shop-0.png\'" alt="image"> \
            </a> \
        </td> \
        <td class="product-name" style="width: 40px; text-align: left; overflow-x: hidden;"> \
            <a href="#" onclick="pageModel[\'noparte\'] = \'@noparte@\';vistaProductoDetalle(); return false;">@descripcion@</a> \
        </td> \
        <td class="product-price"> \
            <span class="unit-amount">@precio@</span> \
        </td> \
        <td class="product-quantity"> \
            <div class="input-counter mb-2"> \
                <span class="minus-btn" onclick="agregaCantidad(\'@noparte@\', -1); return false;"> \
                    <i class="bx bx-minus"></i> \
                </span> \
                <input type="text" value="@cantidad@" id="@noparte@cantidad"> \
                <span class="plus-btn" onclick="agregaCantidad(\'@noparte@\', 1); return false;"> \
                    <i class="bx bx-plus"></i> \
                </span> \
            </div> \
            <div class="product-add-to-cart"> \
                <button class="default-btn" \
                        onclick="agregaProductoAlCarrito(\'@noparte@\', \'@noparte@\', actualizaTotalesCarrito); return false;"> \
                    <i class="flaticon-shopping-cart"></i> Modificar \
                </button> \
            </div> \
        </td> \
        <td class="product-subtotal"> \
            <span class="subtotal-amount">@total@</span> \
        </td> \
    </tr>';

function trProductoCarrito(producto) {
    var precioExistencia = "";
    if (producto.n_precio!=producto.precio) {
        precioExistencia = "<span style=\"text-decoration: line-through;\">"+formatMoney(producto.n_precio)+"</span><br>";
    }
    precioExistencia += formatMoney(producto.precio)+"<br>";
    if (!producto.existencia) {
        precioExistencia += "<span class=\"color-secundario\">N/D</span>";
    } else {
        precioExistencia += producto.existencia>=producto.cantidad
            ? "<span class=\"color-principal\">Disponible</span>" : "<span class=\"color-principal\">P/Disponible</span>";
    }

    var productoHTML = tr_producto;
    productoHTML = replaceAll(productoHTML, "@noparte@", producto.noparte);
    productoHTML = replaceAll(productoHTML, "@descripcion@", producto.descripcion);
    productoHTML = replaceAll(productoHTML, "@cantidad@", producto.cantidad);
    productoHTML = replaceAll(productoHTML, "@precio@", precioExistencia);
    productoHTML = replaceAll(productoHTML, "@total@", formatMoney(producto.total));

    var $trProducto = $(productoHTML);
    return $trProducto;
}

function dibujaCarrito(response) {
    var $tbody = $("#products");
    $tbody.empty();

    var productos = response.productos;

    for (var indx=0; indx<productos.length; indx++) {
        var $trProducto = trProductoCarrito(productos[indx]);
        $tbody.append($trProducto);
    }

    actualizaTotalesCarrito(response);
}

function actualizaTotalesCarrito(response) {
    $("#subtotal").html(formatMoney(response.totales.totImporte));
    $("#iva").html(formatMoney(response.totales.totIva));
    $("#total").html(formatMoney(response.totales.totTotal));
    $("#ahorro").html(formatMoney(response.totales.totAhorro));

    if (response.pc) {
        var $trProducto = trProductoCarrito(response.pc);

        var $trActualizar = $("#"+response.pc.noparte+"tr");
        $trActualizar.html($trProducto.html());
    }
}

function borraTrProducto(id) {
    var $tr = $("#"+id+"tr");
    $tr.fadeOut();
}

function borraProductoDelCarrito(noparte) {
    var $cantidad = $("#"+noparte+"cantidad");
    $cantidad.val("0");

    var onComplete = function(response) {
        borraTrProducto(noparte);
        actualizaTotalesCarrito(response);
    };
    agregaProductoAlCarrito(noparte, noparte, onComplete);
}

function subirCarrito() {
    var $div = $("#div-subir");
    if ($div.hasClass("invisible"))
        $div.removeClass("invisible");
    else
        $div.addClass("invisible");
}
