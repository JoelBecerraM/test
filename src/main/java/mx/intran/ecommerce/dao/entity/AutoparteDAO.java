package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class AutoparteDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public String noparte = "";
    public String descripcion = "";
    public String descripcionlarga = "";
    public String codigos = "";
    public String familia = "";
    public String linea = "";
    public String sistema = "";
    public String resistencia = "";
    public String otros = "";
    public String oem = "";
    public String presion = "";
    public String litros = "";
    public String volts = "";
    public String amperaje = "";

    public AutoparteDAO() {
    }

    public AutoparteDAO(String compania, String noparte) {
        this.compania = compania;
        this.noparte = noparte;
    }

    @Override
    public String getTable() {
        return "Autoparte";
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
