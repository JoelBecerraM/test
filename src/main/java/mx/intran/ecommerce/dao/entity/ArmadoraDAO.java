package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class ArmadoraDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public int armadora = 0;
    public String descripcion = "";

    public ArmadoraDAO() {
    }

    public ArmadoraDAO(String compania, int armadora) {
        this.compania = compania;
        this.armadora = armadora;
    }

    @Override
    public String getTable() {
        return "Armadora";
    }

    @Override
    public String getOrder() {
        return "compania, armadora";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND armadora = "+armadora;
    }

    @Override
    public String toString() {
        return compania+";"+armadora+";"+descripcion;
    }
}
