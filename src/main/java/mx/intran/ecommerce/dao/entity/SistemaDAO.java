package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class SistemaDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public int sistema = 0;
    public String descripcion = "";

    public SistemaDAO() {
    }

    public SistemaDAO(String compania, int sistema) {
        this.compania = compania;
        this.sistema = sistema;
    }

    @Override
    public String getTable() {
        return "Sistema";
    }

    @Override
    public String getOrder() {
        return "compania, sistema";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND sistema = "+sistema;
    }

    @Override
    public String toString() {
        return compania+";"+sistema+";"+descripcion;
    }
}
