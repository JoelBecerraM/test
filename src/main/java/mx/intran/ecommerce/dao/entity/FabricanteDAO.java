package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class FabricanteDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public int fabricante = 0;
    public String descripcion = "";

    public FabricanteDAO() {
    }

    public FabricanteDAO(String compania, int fabricante) {
        this.compania = compania;
        this.fabricante = fabricante;
    }

    @Override
    public String getTable() {
        return "Fabricante";
    }

    @Override
    public String getOrder() {
        return "compania, fabricante";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND fabricante = "+fabricante;
    }

    @Override
    public String toString() {
        return compania+";"+fabricante+";"+descripcion;
    }
}
