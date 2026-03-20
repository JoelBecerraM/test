package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class LineaDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public int linea = 0;
    public String descripcion = "";

    public LineaDAO() {
    }

    public LineaDAO(String compania, int linea) {
        this.compania = compania;
        this.linea = linea;
    }

    @Override
    public String getTable() {
        return "Linea";
    }

    @Override
    public String getOrder() {
        return "compania, linea";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND linea = "+linea;
    }

    @Override
    public String toString() {
        return compania+";"+linea+";"+descripcion;
    }
}
