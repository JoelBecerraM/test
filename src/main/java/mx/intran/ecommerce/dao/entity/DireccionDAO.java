package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;
import com.atcloud.dao.engine.DatabaseRecordABC;
import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.util.ServletUtilities;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class DireccionDAO implements DatabaseRecord, DatabaseRecordABC, java.io.Serializable {
    public String compania = "";
    public String direccion = "";
    public String calle = "";
    public String noexterior = "";
    public String nointerior = "";
    public String colonia = "";
    public String poblacion = "";
    public String entidadfederativa = "";
    public String pais = "";
    public String codigopostal = "";
    public String localidad = "";
    public String referencia = "";

    public DireccionDAO() {
    }

    public DireccionDAO(String compania, String direccion) {
        this.compania = compania;
        this.direccion = direccion;
    }
    @Override
    public String getTable() {
        return "Direccion";
    }

    @Override
    public String getOrder() {
        return "compania, direccion";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND direccion = '"+direccion+"'";
    }

    @Override
    public String getWhereFirst() {
        return "compania = '"+compania+"' AND direccion = '"+direccion+"'";
    }

    @Override
    public String getWhereNext() {
        return "compania = '"+compania+"' AND direccion > '"+direccion+"'";
    }

    @Override
    public String getWherePrev() {
        return "compania = '"+compania+"' AND direccion < '"+direccion+"'";
    }

    @Override
    public String getWhereLast() {
        return "compania = '"+compania+"' AND direccion = '"+direccion+"'";
    }

    @Override
    public String getOrderFirst() {
        return "compania, direccion";
    }

    @Override
    public String getOrderLast() {
        return "compania, direccion DESC";
    }

    @Override
    public void setKey(String[] values) throws Exception {
        compania = values[0];
        direccion = values[1];
    }

    @Override
    public void setValues(String[] values) throws Exception {
        compania = values[0];
        direccion = values[1];
    }

    @Override
    public String toString() {
        return compania+";"+direccion;
    }

    public void save(DatabaseServices ds, String[] valores) throws Exception {
        JSONObject json = (JSONObject)JSONValue.parse(valores[0]);

        this.compania = (String)json.get("compania");
        this.direccion = (String)json.get("direccion");
        boolean existe = ds.exists(this);

        ServletUtilities.fromJSON(this, json);

        if (existe) {
            ds.update(this);
        } else {
            ds.insert(this);
        }
    }

    public void delete(DatabaseServices ds, String[] valores) throws Exception {
        JSONObject json = (JSONObject)JSONValue.parse(valores[0]);

        this.compania = (String)json.get("compania");
        this.direccion = (String)json.get("direccion");
        boolean existe = ds.exists(this);

        ServletUtilities.fromJSON(this, json);

        if (existe) {
            ds.delete(this);
        }
    }
}
