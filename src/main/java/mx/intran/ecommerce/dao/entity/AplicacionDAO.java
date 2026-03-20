package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class AplicacionDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public int idaplicacion = 0;
    public int familia = 0;
    public int linea = 0;
    public int sistema = 0;
    public int armadora = 0;
    public int fabricante = 0;
    public int modelo = 0;
    public String noparte = "";
    public int motor = 0;
    public int cilindro = 0;
    public int periodoini = 0;
    public int periodofin = 0;

    public AplicacionDAO() {
    }

    public AplicacionDAO(String compania, int idaplicacion) {
        this.compania = compania;
        this.idaplicacion = idaplicacion;
    }

    @Override
    public String getTable() {
        return "Aplicacion";
    }

    @Override
    public String getOrder() {
        return "compania, idaplicacion";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND idaplicacion = "+idaplicacion;
    }

    @Override
    public String toString() {
        return compania+";"+idaplicacion;
    }
}
