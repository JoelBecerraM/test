package mx.intran.ecommerce.dao.entity;

import com.atcloud.dao.engine.DatabaseRecord;
import com.atcloud.dao.engine.DatabaseRecordABC;
import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.util.ServletUtilities;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class ClienteDAO implements DatabaseRecord, DatabaseRecordABC, java.io.Serializable {
    public String compania = "";
    public String cliente = "";
    public String nombre = "";
    public String lista = "";
    public String vendedor = "";
    public String idvendedor = "";
    public String gerenteregional = "";
    public String idgerenteregional = "";
    public String gerentenacional = "";
    public String entidadfederativa = "";
    public String codigopostal = "";
    public String correoelectronico = "";

    public ClienteDAO() {
    }

    public ClienteDAO(String compania, String cliente) {
        this.compania = compania;
        this.cliente = cliente;
    }

    @Override
    public String getTable() {
        return "Cliente";
    }

    @Override
    public String getOrder() {
        return "compania, cliente";
    }

    @Override
    public String getWhere() {
        return "compania = '"+compania+"' AND cliente = '"+cliente+"'";
    }

    @Override
    public String getWhereFirst() {
        return "compania = '"+compania+"' AND cliente = '"+cliente+"'";
    }

    @Override
    public String getWhereNext() {
        return "compania = '"+compania+"' AND cliente > '"+cliente+"'";
    }

    @Override
    public String getWherePrev() {
        return "compania = '"+compania+"' AND cliente < '"+cliente+"'";
    }

    @Override
    public String getWhereLast() {
        return "compania = '"+compania+"' AND cliente = '"+cliente+"'";
    }

    @Override
    public String getOrderFirst() {
        return "compania, cliente";
    }

    @Override
    public String getOrderLast() {
        return "compania, cliente DESC";
    }

    @Override
    public void setKey(String[] values) throws Exception {
        compania = values[0];
        cliente = values[1];
    }

    @Override
    public void setValues(String[] values) throws Exception {
        compania = values[0];
        cliente = values[1];
    }

    @Override
    public String toString() {
        return compania+";"+cliente;
    }

    public void save(DatabaseServices ds, String[] valores) throws Exception {
        JSONObject json = (JSONObject)JSONValue.parse(valores[0]);

        this.compania = (String)json.get("compania");
        this.cliente = (String)json.get("cliente");
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
        this.cliente = (String)json.get("cliente");
        boolean existe = ds.exists(this);

        ServletUtilities.fromJSON(this, json);

        if (existe) {
            ds.delete(this);
        }
    }
}
