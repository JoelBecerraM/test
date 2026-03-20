package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;
import com.atcloud.dao.engine.DatabaseRecordABC;
import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.util.Numero;
import com.atcloud.util.ServletUtilities;
import com.atcloud.web.WebException;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class PermisoDAO implements DatabaseRecord, DatabaseRecordABC, java.io.Serializable {
    public String compania = "";
    public int permiso = 0;
    public String nombre = "";

    public PermisoDAO() {
    }

    public PermisoDAO(String compania, int permiso) {
        this.compania = compania;
        this.permiso = permiso;
    }

    @Override
    public String getTable() {
        return "Permiso";
    }

    @Override
    public String getOrder() {
        return "compania, permiso";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND permiso = "+permiso;
    }

    @Override
    public String toString() {
        return compania+";"+permiso+";"+nombre;
    }

    @Override
    public String getWhereFirst() {
        return "compania = '"+compania+"'";
    }

    @Override
    public String getWhereNext() {
        return "compania = '"+compania+"' AND permiso > "+permiso;
    }

    @Override
    public String getWherePrev() {
        return "compania = '"+compania+"' AND permiso < "+permiso;
    }

    @Override
    public String getWhereLast() {
        return "compania = '"+compania+"'";
    }

    @Override
    public String getOrderFirst() {
        return "compania, permiso";
    }

    @Override
    public String getOrderLast() {
        return "compania, permiso DESC";
    }

    @Override
    public void setKey(String[] values) throws Exception {
        compania = values[0];
        permiso = Numero.getIntFromString(values[1]);
    }

    @Override
    public void setValues(String[] values) throws Exception {
        compania = values[0];
        permiso = Numero.getIntFromString(values[1]);
        nombre = values[2];
    }

    public void delete(DatabaseServices ds, String[] valores) throws Exception {
        JSONObject json = (JSONObject)JSONValue.parse(valores[0]);

        this.compania = json.get("compania").toString();
        this.permiso = Numero.getIntFromString(json.get("permiso").toString());
        boolean existe = ds.exists(this);

        ServletUtilities.fromJSON(this, json);

        if (existe) {
            ds.delete(this);
            ds.delete(new PermisoPerfilDAO(), "compania = '"+this.compania+"' AND permiso = "+this.permiso);
        }
    }

    public void add(DatabaseServices ds, String[] valores) throws Exception {
        JSONObject json = (JSONObject)JSONValue.parse(valores[0]);

        this.compania = json.get("compania").toString();
        this.nombre = json.get("nombre").toString();
        this.permiso = (Integer)ds.aggregate(this, "max", "permiso", "compania = '"+compania+"'") + 1;

        PermisoDAO permisoDAO1 = (PermisoDAO)ds.first(this, "compania = '"+this.compania+"' AND nombre = '"+this.nombre+"'");
        if (permisoDAO1!=null)
            throw new WebException("Este Permiso ["+this.compania+";"+this.nombre+"] ya existe.");

        ds.insert(this);
    }
}
