package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class InventarioDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public String noparte = "";
    public int existencia = 0;

    public InventarioDAO() {
    }

    public InventarioDAO(String compania, String noparte) {
        this.compania = compania;
        this.noparte = noparte;
    }

    @Override
    public String getTable() {
        return "Inventario";
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
