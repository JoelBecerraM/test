package mx.intran.ecommerce.commerce;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import mx.intran.ecommerce.to.ProductoCarritoTO;
import mx.intran.ecommerce.to.TotalesCarritoComprasTO;
import org.apache.log4j.Logger;

public class CalculaTotalesCarritoCompras {
    static Logger log = Logger.getLogger(CalculaTotalesCarritoCompras.class.getName());

    public static TotalesCarritoComprasTO calculaTotalesCarrito(HashMap carrito) {
        return calculaTotalesCarrito(carrito.values());
    }

    public static TotalesCarritoComprasTO calculaTotalesCarrito(Collection carrito) {
        TotalesCarritoComprasTO totales = new TotalesCarritoComprasTO();

        Iterator it = carrito.iterator();
        while(it.hasNext()) {
            ProductoCarritoTO pc = (ProductoCarritoTO)it.next();

            totales.totAutopartes ++;
            totales.totCantidad += pc.cantidad;
            totales.totSurtida += pc.surtida;
            totales.totImporte += pc.importe;
            totales.totIva += pc.iva;
            totales.totTotal += pc.total;
            totales.totAhorro += pc.ahorro;
        }

        return totales;
    }
}
