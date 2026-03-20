package mx.intran.ecommerce.command;

import com.atcloud.commerce.services.Cache;
import com.atcloud.commerce.services.JSON;
import com.atcloud.commerce.services.Listado;
import com.atcloud.commerce.services.Paginador;
import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.to.ErrorTO;
import com.atcloud.util.Numero;
import com.atcloud.web.WebCommandInterface;
import com.atcloud.web.WebException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mx.intran.ecommerce.dao.entity.FamiliaDAO;
import mx.intran.ecommerce.dao.entity.LineaDAO;
import mx.intran.ecommerce.dao.entity.SistemaDAO;
import mx.intran.ecommerce.to.AutoparteTO;
import mx.intran.ecommerce.util.Constantes;
import mx.intran.ecommerce.util.QueryFactory;
import org.apache.log4j.Logger;

/**
 *
 * @author jbecerra
 */
public class AutopartesAplicacionCommand implements WebCommandInterface {
    static Logger log = Logger.getLogger(AutopartesAplicacionCommand.class.getName());

    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response, DatabaseServices ds) throws WebException {
        try {
            String compania = request.getParameter("compania");
            String usuario = request.getParameter("usuario");
            String pagina = request.getParameter("pagina");
            if (pagina==null)
                pagina = "1";
            String cuantos = request.getParameter("cuantos");
            if (cuantos==null)
                cuantos = "10";
            String anio = request.getParameter("anio");
            if (anio==null)
                anio = "";
            String marca = request.getParameter("marca");
            if (marca==null)
                marca = "";
            String modelo = request.getParameter("modelo");
            if (modelo==null)
                modelo = "";
            String motor = request.getParameter("motor");
            if (motor==null)
                motor = "";
            String linea = request.getParameter("linea");
            if (linea==null)
                linea = "";

            HashMap keyCache = new HashMap();
            keyCache.put("metodo", "AutopartesAplicacionCommand");
            keyCache.put("argumentos", compania+";"+anio+";"+marca+";"+modelo+";"+motor+";"+linea+";"+cuantos);

            if(!keyCache.equals(Cache.getInstance().getCacheCriteria())) {
                Listado listado = Paginador.paginar(getAutopartes(ds, compania, anio, marca, modelo, motor, linea),
                        Numero.getIntFromString(cuantos, Constantes.REGISTROS_POR_PAGINA));
                Cache.getInstance().setCache(listado);
                Cache.getInstance().setCacheCriteria(keyCache);
            }

            Listado cache = Cache.getInstance().getCache();
            ArrayList<AutoparteTO> autopartes = cache==null? null: cache.getPagina(Numero.getIntFromString(pagina));
            ArrayList categorias = getCategorias(ds, compania, anio, marca, modelo, motor, linea);
            ArrayList lineas = getLineas(ds, compania, anio, marca, modelo, motor, linea);
            ArrayList sistemas = getSistemas(ds, compania, anio, marca, modelo, motor, linea);

            //ActividadFactory actividadFactory = new ActividadFactory();
            //actividadFactory.makeActividad(ds, compania, usuario, this.getClass().getSimpleName(), compania+";"+anio+";"+marca+";"+modelo+";"+motor+";"+linea);

            try (PrintWriter out = response.getWriter()) {
                out.write("{");
                out.write("\"paginas\": ");
                JSON.writeObject(out, cache);
                out.write(", \"productos\": ");
                JSON.writeArrayOfObjects(out, autopartes);
                out.write(", \"categorias\": ");
                JSON.writeArrayOfObjects(out, categorias);
                out.write(", \"lineas\": ");
                JSON.writeArrayOfObjects(out, lineas);
                out.write(", \"sistemas\": ");
                JSON.writeArrayOfObjects(out, sistemas);
                out.write("}");
            }

        } catch(WebException e) {
            log.error(e.getMessage(), e);

            ErrorTO errorTO = new ErrorTO();
            errorTO.fromException(e);

            try {
                PrintWriter out = response.getWriter();
                JSON.writeObject(out, errorTO);
                out.close();

            } catch(Exception ex) {
                throw new WebException(ex.getMessage());
            }
        } catch(Exception e) {
            log.error(e.getMessage(), e);

            ErrorTO errorTO = new ErrorTO();
            errorTO.fromException(e);

            try {
                PrintWriter out = response.getWriter();
                JSON.writeObject(out, errorTO);
                out.close();

            } catch(Exception ex) {
                throw new WebException(ex.getMessage());
            }
        }
    }

    public ArrayList<AutoparteTO> getAutopartes(DatabaseServices ds, String compania, String anio, String marca, String modelo, String motor, String linea) throws Exception {
        QueryFactory queryFactory = new QueryFactory();
        // Elimina los repetidos
        ArrayList<AutoparteTO> autopartesArray = ds.collection(new AutoparteTO(),
                queryFactory.getQueryAutopartesAplicacion(compania, anio, marca, modelo, motor, linea));
        HashMap<String, Boolean> autopartesHash = new HashMap<>();
        ArrayList<AutoparteTO> autopartes = new ArrayList();
        for (AutoparteTO autoparteTO : autopartesArray) {
            if (!autopartesHash.containsKey(autoparteTO.noparte)) {
                autopartesHash.put(autoparteTO.noparte, Boolean.TRUE);
                autopartes.add(autoparteTO);
            }
        }

        return autopartes;
    }

    private ArrayList getCategorias(DatabaseServices ds, String compania, String anio, String marca, String modelo, String motor, String linea) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT f.* ")
            .append("FROM Aplicacion a INNER JOIN Familia f ON a.compania = f.compania AND a.familia = f.familia ")
            .append("WHERE a.compania = '").append(compania).append("' ");
        if (!anio.isEmpty())
            sql.append("AND a.periodoini <= ").append(anio).append(" AND a.periodofin >= ").append(anio).append(" ");
        if (!marca.isEmpty())
            sql.append("AND a.armadora = ").append(marca).append(" ");
        if (!modelo.isEmpty())
            sql.append("AND a.modelo = ").append(modelo).append(" ");
        if (!motor.isEmpty())
            sql.append("AND a.motor = ").append(motor).append(" ");
        if (!linea.isEmpty())
            sql.append("AND a.linea = ").append(linea).append(" ");
        sql.append("GROUP BY f.compania, f.familia, f.descripcion ")
            .append("ORDER BY f.descripcion");

        ArrayList categorias = ds.collection(new FamiliaDAO(), sql.toString());
        return categorias;
    }

    private ArrayList getLineas(DatabaseServices ds, String compania, String anio, String marca, String modelo, String motor, String linea) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT l.* ")
            .append("FROM Aplicacion a INNER JOIN Linea l ON a.compania = l.compania AND a.linea = l.linea ")
            .append("WHERE a.compania = '").append(compania).append("' ");
        if (!anio.isEmpty())
            sql.append("AND a.periodoini <= ").append(anio).append(" AND a.periodofin >= ").append(anio).append(" ");
        if (!marca.isEmpty())
            sql.append("AND a.armadora = ").append(marca).append(" ");
        if (!modelo.isEmpty())
            sql.append("AND a.modelo = ").append(modelo).append(" ");
        if (!motor.isEmpty())
            sql.append("AND a.motor = ").append(motor).append(" ");
        if (!linea.isEmpty())
            sql.append("AND a.linea = ").append(linea).append(" ");
        sql.append("GROUP BY l.compania, l.linea, l.descripcion ")
            .append("ORDER BY l.descripcion");

        ArrayList lineas = ds.collection(new LineaDAO(), sql.toString());
        return lineas;
    }

    private ArrayList getSistemas(DatabaseServices ds, String compania, String anio, String marca, String modelo, String motor, String linea) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT s.* ")
            .append("FROM Aplicacion a INNER JOIN Sistema s ON a.compania = s.compania AND a.sistema = s.sistema ")
            .append("WHERE a.compania = '").append(compania).append("' ");
        if (!anio.isEmpty())
            sql.append("AND a.periodoini <= ").append(anio).append(" AND a.periodofin >= ").append(anio).append(" ");
        if (!marca.isEmpty())
            sql.append("AND a.armadora = ").append(marca).append(" ");
        if (!modelo.isEmpty())
            sql.append("AND a.modelo = ").append(modelo).append(" ");
        if (!motor.isEmpty())
            sql.append("AND a.motor = ").append(motor).append(" ");
        if (!linea.isEmpty())
            sql.append("AND a.linea = ").append(linea).append(" ");
        sql.append("GROUP BY s.compania, s.sistema, s.descripcion ")
            .append("ORDER BY s.descripcion");

        ArrayList sistemas = ds.collection(new SistemaDAO(), sql.toString());
        return sistemas;
    }
}
