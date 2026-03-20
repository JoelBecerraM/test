package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;
import com.atcloud.dao.engine.DatabaseRecordABC;
import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.util.Numero;
import com.atcloud.util.ServletUtilities;
import com.atcloud.web.WebException;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class PermisoPerfilDAO implements DatabaseRecord, DatabaseRecordABC, java.io.Serializable {
    public String compania = "";
    public int permiso = 0;
    public String perfil = "";

    public PermisoPerfilDAO() {
    }

    public PermisoPerfilDAO(String compania, int permiso, String perfil) {
        this.compania = compania;
        this.permiso = permiso;
        this.perfil = perfil;
    }

    @Override
    public String getTable() {
        return "PermisoPerfil";
    }

    @Override
    public String getOrder() {
        return "compania, permiso, perfil";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND permiso = "+permiso+" AND perfil = '"+perfil+"'";
    }

    @Override
    public String getWhereFirst() {
        return "compania = '"+compania+"' AND permiso = "+permiso+" AND perfil = '"+perfil+"'";
    }

    @Override
    public String getWhereNext() {
        return "compania = '"+compania+"' AND permiso = "+permiso+" AND perfil > '"+perfil+"'";
    }

    @Override
    public String getWherePrev() {
        return "compania = '"+compania+"' AND permiso = "+permiso+" AND perfil < '"+perfil+"'";
    }

    @Override
    public String getWhereLast() {
        return "compania = '"+compania+"' AND permiso = "+permiso+" AND perfil = '"+perfil+"'";
    }

    @Override
    public String getOrderFirst() {
        return "permiso, perfil";
    }

    @Override
    public String getOrderLast() {
        return "compania, permiso, perfil DESC";
    }

    @Override
    public void setKey(String[] values) throws Exception {
        compania = values[0];
        permiso = Numero.getIntFromString(values[1]);
        perfil = values[2];
    }

    @Override
    public void setValues(String[] values) throws Exception {
        compania = values[0];
        permiso = Numero.getIntFromString(values[1]);
        perfil = values[2];
    }

    @Override
    public String toString() {
        return compania+";"+permiso+";"+perfil;
    }

    public void save(DatabaseServices ds, String[] valores) throws Exception {
        JSONObject json = (JSONObject)JSONValue.parse(valores[0]);

        this.compania = json.get("compania").toString();
        this.permiso = Numero.getIntFromString(json.get("permiso").toString());
        this.perfil = json.get("perfil").toString();
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

        this.compania = json.get("compania").toString();
        this.permiso = Numero.getIntFromString(json.get("permiso").toString());
        this.perfil = json.get("perfil").toString();
        boolean existe = ds.exists(this);

        ServletUtilities.fromJSON(this, json);

        if (existe) {
            ds.delete(this);
        }
    }

    public void permisos(DatabaseServices ds, String[] valores) throws Exception {
        JSONObject json = (JSONObject)JSONValue.parse(valores[0]);

        this.compania = (String)json.get("compania");
        String nombre = (String)json.get("nombre");

        PermisoDAO permisoDAO = (PermisoDAO)ds.first(new PermisoDAO(), "compania = '"+this.compania+"' AND nombre = '"+nombre+"'");
        if (permisoDAO==null)
            throw new WebException("Este Permiso ["+nombre+"] no existe.");

        this.permiso = permisoDAO.permiso;

        ds.delete(this, "compania = '"+this.compania+"' AND permiso = "+this.permiso);

        for(Object object : json.keySet()) {
            String key = (String)object;
            if (key.startsWith("perfil_")) {
                String value = (String)json.get(key);
                if (value.compareTo("0")==0)
                    continue;

                this.perfil = key.substring(key.indexOf("_")+1);

                ds.insert(this);
            }
        }
    }

    public void permiso(DatabaseServices ds, String[] valores) throws Exception {
        JSONObject json = (JSONObject)JSONValue.parse(valores[0]);

        this.compania = (String)json.get("compania");
        String usuario = (String)json.get("usuario");
        String password = (String)json.get("password");

        UsuarioDAO usuarioDAO = new UsuarioDAO(this.compania, usuario);
        if (!ds.exists(usuarioDAO))
            throw new WebException("No existe este Usuario ["+usuarioDAO+"].");
        if (usuarioDAO.password.compareTo(password)!=0)
            throw new WebException("La contrase&ntilde;a no es correcta.");

        String nombre = (String)json.get("nombre");

        PermisoDAO permisoDAO = (PermisoDAO)ds.first(new PermisoDAO(), "compania = '"+this.compania+"' AND nombre = '"+nombre+"'");
        if (permisoDAO==null)
            throw new WebException("Este Permiso ["+nombre+"] no existe.");

        this.permiso = permisoDAO.permiso;
        this.perfil = usuarioDAO.perfil;
        if (!ds.exists(this))
            throw new Exception("El Usuario ["+usuarioDAO.nombre+"] no tiene este Permiso ["+nombre+"].");
    }
}
