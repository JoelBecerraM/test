package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class MotorDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public int motor = 0;
    public String descripcion = "";

    public MotorDAO() {
    }

    public MotorDAO(String compania, int motor) {
        this.compania = compania;
        this.motor = motor;
    }

    @Override
    public String getTable() {
        return "Motor";
    }

    @Override
    public String getOrder() {
        return "compania, motor";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND motor = "+motor;
    }

    @Override
    public String toString() {
        return compania+";"+motor+";"+descripcion;
    }
}
