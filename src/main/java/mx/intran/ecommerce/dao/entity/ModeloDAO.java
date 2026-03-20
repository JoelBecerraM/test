package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class ModeloDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public int modelo = 0;
    public String descripcion = "";

    public ModeloDAO() {
    }

    public ModeloDAO(String compania, int modelo) {
        this.compania = compania;
        this.modelo = modelo;
    }

    @Override
    public String getTable() {
        return "Modelo";
    }

    @Override
    public String getOrder() {
        return "compania, modelo";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND modelo = "+modelo;
    }

    @Override
    public String toString() {
        return compania+";"+modelo+";"+descripcion;
    }
}
