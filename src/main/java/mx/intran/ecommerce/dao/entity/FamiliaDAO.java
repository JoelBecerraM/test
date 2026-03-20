package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class FamiliaDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public int familia = 0;
    public String descripcion = "";

    public FamiliaDAO() {
    }

    public FamiliaDAO(String compania, int familia) {
        this.compania = compania;
        this.familia = familia;
    }

    @Override
    public String getTable() {
        return "Familia";
    }

    @Override
    public String getOrder() {
        return "compania, familia";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND familia = "+familia;
    }

    @Override
    public String toString() {
        return compania+";"+familia+";"+descripcion;
    }
}
