package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;
import com.atcloud.dao.engine.DatabaseRecordABC;
import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.util.ServletUtilities;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class PerfilDAO implements DatabaseRecord, DatabaseRecordABC, java.io.Serializable {
    public String compania = "";
    public String perfil = "";
    public String descripcion = "";

    public PerfilDAO() {
    }

    public PerfilDAO(String compania, String perfil) {
        this.compania = compania;
        this.perfil = perfil;
    }

    @Override
    public String getTable() {
        return "Perfil";
    }

    @Override
    public String getOrder() {
        return "compania, perfil";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND perfil = '"+perfil+"'";
    }

    @Override
    public String getWhereFirst() {
        return "compania = '"+compania+"' AND perfil = '"+perfil+"'";
    }

    @Override
    public String getWhereNext() {
        return "compania = '"+compania+"' AND perfil > '"+perfil+"'";
    }

    @Override
    public String getWherePrev() {
        return "compania = '"+compania+"' AND perfil < '"+perfil+"'";
    }

    @Override
    public String getWhereLast() {
        return "compania = '"+compania+"' AND perfil = '"+perfil+"'";
    }

    @Override
    public String getOrderFirst() {
        return "compania, perfil";
    }

    @Override
    public String getOrderLast() {
        return "compania, perfil DESC";
    }

    @Override
    public void setKey(String[] values) throws Exception {
        compania = values[0];
        perfil = values[1];
    }

    @Override
    public void setValues(String[] values) throws Exception {
        compania = values[0];
        perfil = values[1];
    }

    @Override
    public String toString() {
        return compania+";"+perfil;
    }

    public void save(DatabaseServices ds, String[] valores) throws Exception {
        JSONObject json = (JSONObject)JSONValue.parse(valores[0]);

        this.compania = (String)json.get("compania");
        this.perfil = (String)json.get("perfil");
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
        this.perfil = (String)json.get("perfil");
        boolean existe = ds.exists(this);

        ServletUtilities.fromJSON(this, json);

        if (existe) {
            ds.delete(this);
        }
    }
}
