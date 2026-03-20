package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class CilindroDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public int cilindro = 0;
    public String descripcion = "";

    public CilindroDAO() {
    }

    public CilindroDAO(String compania, int cilindro) {
        this.compania = compania;
        this.cilindro = cilindro;
    }

    @Override
    public String getTable() {
        return "Cilindro";
    }

    @Override
    public String getOrder() {
        return "compania, cilindro";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND cilindro = "+cilindro;
    }

    @Override
    public String toString() {
        return compania+";"+cilindro+";"+descripcion;
    }
}
