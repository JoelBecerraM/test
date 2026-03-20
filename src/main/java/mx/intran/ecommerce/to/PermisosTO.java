package mx.intran.ecommerce.to;

import java.util.ArrayList;

public class PermisosTO {
    private ArrayList<String> permisos = new ArrayList<>();

    public void addPermiso(String permiso) {
        permisos.add(permiso);
    }

    public boolean hasPermiso(String _permiso) {
        if (permisos==null)
            return false;
        for (String permiso : permisos)
            if (permiso.compareTo(_permiso)==0)
                return true;
        return false;
    }

    @Override
    public String toString() {
        StringBuilder ret = new StringBuilder();
        ret.append("[");
        for(String permiso : permisos) {
            ret.append("\"").append(permiso).append("\",");
        }
        if (ret.length()>1)
            ret.deleteCharAt(ret.length() - 1);
        ret.append("]");
        return ret.toString();
    }
}
