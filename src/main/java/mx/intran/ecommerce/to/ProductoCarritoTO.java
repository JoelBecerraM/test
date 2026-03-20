package mx.intran.ecommerce.to;

import com.atcloud.util.Numero;
import com.atcloud.util.Sorteable;
import java.io.Serializable;

public class ProductoCarritoTO extends Sorteable implements Serializable {
    public long agregado = 0l;
    public String noparte = "";
    public String descripcion = "";
    public int cantidad = 0;
    public int multiplominvta = 0;
    public int existencia = 0;
    public int surtida = 0;
    public double n_precio = 0.0;
    public double n_importe = 0.0;
    public double n_iva = 0.0;
    public double n_total = 0.0;
    public double precio = 0.0;
    public double importe = 0.0;
    public double priva = 0.0;
    public double iva = 0.0;
    public double total = 0.0;
    public double ahorro = 0.0;

    public void calculaNota() {
        precio = Numero.redondea(precio);
        importe = Numero.redondea(precio * cantidad);
        iva = Numero.redondea(importe * priva);
        total = Numero.redondea(importe + iva);

        n_precio = Numero.redondea(n_precio);
        n_importe = Numero.redondea(n_precio * cantidad);
        n_iva = Numero.redondea(n_importe * priva);
        n_total = Numero.redondea(n_importe + n_iva);

        ahorro = Numero.redondea(n_total- total);
    }

    @Override
    public int compareObject(Sorteable object) {
        long diferencia = agregado - ((ProductoCarritoTO)object).agregado;
        if (diferencia==0)
            return descripcion.compareTo(((ProductoCarritoTO)object).descripcion);
        return diferencia > 0l ? 0 : 1;
    }

    @Override
    public String toString() {
        return noparte+";"+descripcion+";"+cantidad+";"+total;
    }
}
