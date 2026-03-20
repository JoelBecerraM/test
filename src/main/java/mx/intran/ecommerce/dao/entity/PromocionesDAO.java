package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class PromocionesDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public String noparte = "";
    public double pro_normal = 0.0d;
    public double pro_especial = 0.0d;

    public PromocionesDAO() {
    }

    public PromocionesDAO(String compania, String noparte) {
        this.compania = compania;
        this.noparte = noparte;
    }

    @Override
    public String getTable() {
        return "Promociones";
    }

    @Override
    public String getOrder() {
        return "compania, noparte";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND noparte = '"+noparte+"'";
    }

    @Override
    public String toString() {
        return compania+";"+noparte;
    }
}
