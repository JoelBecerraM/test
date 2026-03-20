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
public class AutopartesDescripcionCommand implements WebCommandInterface {
    static Logger log = Logger.getLogger(AutopartesDescripcionCommand.class.getName());

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
            String noparte = request.getParameter("noparte");
            if (noparte==null)
                noparte = "";
            String valor = request.getParameter("valor");
            if (valor==null)
                valor = "";

            HashMap keyCache = new HashMap();
            keyCache.put("metodo", "AutopartesDescripcionCommand");
            keyCache.put("argumentos", compania+";"+noparte+";"+valor+";"+cuantos);

            if(!keyCache.equals(Cache.getInstance().getCacheCriteria())) {
                Listado listado = Paginador.paginar(getAutopartes(ds, compania, noparte, valor),
                        Numero.getIntFromString(cuantos, Constantes.REGISTROS_POR_PAGINA));
                Cache.getInstance().setCache(listado);
                Cache.getInstance().setCacheCriteria(keyCache);
            }

            Listado cache = Cache.getInstance().getCache();
            ArrayList<AutoparteTO> autopartes = cache==null? null: cache.getPagina(Numero.getIntFromString(pagina));
            ArrayList categorias = getCategorias(ds, compania, noparte, valor);
            ArrayList lineas = getLineas(ds, compania, noparte, valor);
            ArrayList sistemas = getSistemas(ds, compania, noparte, valor);

            //ActividadFactory actividadFactory = new ActividadFactory();
            //actividadFactory.makeActividad(ds, compania, usuario, this.getClass().getSimpleName(), compania+";"+noparte+";"+valor);

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

    public ArrayList<AutoparteTO> getAutopartes(DatabaseServices ds, String compania, String noparte, String valor) throws Exception {
        QueryFactory queryFactory = new QueryFactory();

        ArrayList<AutoparteTO> autopartes = ds.collection(new AutoparteTO(),
                queryFactory.getQueryAutopartesValor(compania, noparte, valor));
        return autopartes;
    }

    private ArrayList getCategorias(DatabaseServices ds, String compania, String noparte, String valor) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT f.* ")
            .append("FROM Autoparte a ")
            .append("INNER JOIN Aplicacion ap ON a.compania = ap.compania AND a.noparte = ap.noparte ")
            .append("INNER JOIN Familia f ON ap.compania = f.compania AND ap.familia = f.familia ")
            .append("WHERE a.compania = '").append(compania).append("' ");
        if (noparte.isEmpty()) {
            String[] words = valor.split(" ");
            for (String word : words)
                sql.append("AND a.descripcionlarga LIKE '%").append(word).append("%' ");
        } else {
            sql.append("AND a.noparte = '").append(noparte).append("' ");
        }
        sql.append("GROUP BY f.compania, f.familia, f.descripcion ")
            .append("ORDER BY f.descripcion");

        ArrayList categorias = ds.collection(new FamiliaDAO(), sql.toString());
        return categorias;
    }

    private ArrayList getLineas(DatabaseServices ds, String compania, String noparte, String valor) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT l.* ")
            .append("FROM Autoparte a ")
            .append("INNER JOIN Aplicacion ap ON a.compania = ap.compania AND a.noparte = ap.noparte ")
            .append("INNER JOIN Linea l ON ap.compania = l.compania AND ap.linea = l.linea ")
            .append("WHERE a.compania = '").append(compania).append("' ");
        if (noparte.isEmpty()) {
            String[] words = valor.split(" ");
            for (String word : words)
                sql.append("AND a.descripcionlarga LIKE '%").append(word).append("%' ");
        } else {
            sql.append("AND a.noparte = '").append(noparte).append("' ");
        }
        sql.append("GROUP BY l.compania, l.linea, l.descripcion ")
            .append("ORDER BY l.descripcion");

        ArrayList lineas = ds.collection(new LineaDAO(), sql.toString());
        return lineas;
    }

    private ArrayList getSistemas(DatabaseServices ds, String compania, String noparte, String valor) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT s.* ")
            .append("FROM Autoparte a ")
            .append("INNER JOIN Aplicacion ap ON a.compania = ap.compania AND a.noparte = ap.noparte ")
            .append("INNER JOIN Sistema s ON ap.compania = s.compania AND ap.sistema = s.sistema ")
            .append("WHERE a.compania = '").append(compania).append("' ");
        if (noparte.isEmpty()) {
            String[] words = valor.split(" ");
            for (String word : words)
                sql.append("AND a.descripcionlarga LIKE '%").append(word).append("%' ");
        } else {
            sql.append("AND a.noparte = '").append(noparte).append("' ");
        }
        sql.append("GROUP BY s.compania, s.sistema, s.descripcion ")
            .append("ORDER BY s.descripcion");

        ArrayList sistemas = ds.collection(new SistemaDAO(), sql.toString());
        return sistemas;
    }
}
