package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;
import com.atcloud.dao.engine.DatabaseRecordABC;
import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.util.ServletUtilities;
import java.util.Date;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class UsuarioDAO implements DatabaseRecord, DatabaseRecordABC, java.io.Serializable {
    public String compania = "";
    public String usuario = "";
    public String password = "";
    public String perfil = "";
    public String estado = "";
    public String nombre = "";
    public String email = "";
    public Date cambiopassword = null;
    public String avatar = "";
    public String cliente = "";

    public UsuarioDAO() {
    }

    public UsuarioDAO(String compania, String usuario) {
        this.compania = compania;
        this.usuario = usuario;
    }

    @Override
    public String getTable() {
        return "Usuario";
    }

    @Override
    public String getOrder() {
        return "compania, usuario";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND usuario = '"+usuario+"'";
    }

    @Override
    public String getWhereFirst() {
        return "compania = '"+compania+"' AND usuario = '"+usuario+"'";
    }

    @Override
    public String getWhereNext() {
        return "compania = '"+compania+"' AND usuario > '"+usuario+"'";
    }

    @Override
    public String getWherePrev() {
        return "compania = '"+compania+"' AND usuario < '"+usuario+"'";
    }

    @Override
    public String getWhereLast() {
        return "compania = '"+compania+"' AND usuario = '"+usuario+"'";
    }

    @Override
    public String getOrderFirst() {
        return "compania, usuario";
    }

    @Override
    public String getOrderLast() {
        return "compania, usuario DESC";
    }

    @Override
    public void setKey(String[] values) throws Exception {
        compania = values[0];
        usuario = values[1];
    }

    @Override
    public void setValues(String[] values) throws Exception {
        compania = values[0];
        usuario = values[1];
    }

    @Override
    public String toString() {
        return compania+";"+usuario;
    }

    public void save(DatabaseServices ds, String[] valores) throws Exception {
        JSONObject json = (JSONObject)JSONValue.parse(valores[0]);

        this.compania = (String)json.get("compania");
        this.usuario = (String)json.get("usuario");
        boolean existe = ds.exists(this);

        ServletUtilities.fromJSON(this, json);

        if (existe) {
            ds.update(this);

            if (!json.containsKey("cambiopassword"))
                ds.updateNULL(this, "cambiopassword");
        } else {
            ds.insert(this);
        }
    }

    public void delete(DatabaseServices ds, String[] valores) throws Exception {
        JSONObject json = (JSONObject)JSONValue.parse(valores[0]);

        this.compania = (String)json.get("compania");
        this.usuario = (String)json.get("usuario");
        boolean existe = ds.exists(this);

        ServletUtilities.fromJSON(this, json);

        if (existe) {
            ds.delete(this);
        }
    }
}
