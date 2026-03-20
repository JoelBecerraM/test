package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class RelacionadoDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public String noparte = "";
    public String noparterel = "";

    public RelacionadoDAO() {
    }

    public RelacionadoDAO(String compania, String noparte) {
        this.compania = compania;
        this.noparte = noparte;
    }

    @Override
    public String getTable() {
        return "Relacionado";
    }

    @Override
    public String getOrder() {
        return "compania, noparte, noparterel";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND noparte = '"+noparte+"' AND noparterel = '"+noparterel+"'";
    }

    @Override
    public String toString() {
        return compania+";"+noparte+";"+noparterel;
    }
}
