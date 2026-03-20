package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;

public class ListaPreciosDAO implements DatabaseRecord, java.io.Serializable {
    public String compania = "";
    public String noparte = "";
    public double pre_naranja = 0.0d;
    public double pre_verde = 0.0d;
    public double pre_morada = 0.0d;
    public double pre_azul = 0.0d;
    public double pre_roja = 0.0d;
    public double pre_cafe = 0.0d;
    public double pre_rosa = 0.0d;
    public double pre_amarilla = 0.0d;
    public double pre_azulmarino = 0.0d;
    public double pro_normal = 0.0d;
    public double pro_especial = 0.0d;

    public ListaPreciosDAO() {
    }

    public ListaPreciosDAO(String compania, String noparte) {
        this.compania = compania;
        this.noparte = noparte;
    }

    @Override
    public String getTable() {
        return "ListaPrecios";
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
