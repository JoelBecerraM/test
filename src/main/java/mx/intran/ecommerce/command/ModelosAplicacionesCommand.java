package mx.intran.ecommerce.command;

import com.atcloud.commerce.services.JSON;
import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.to.ErrorTO;
import com.atcloud.web.WebCommandInterface;
import com.atcloud.web.WebException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mx.intran.ecommerce.dao.entity.ModeloDAO;
import org.apache.log4j.Logger;

/**
 *
 * @author jbecerra
 */
public class ModelosAplicacionesCommand implements WebCommandInterface {
    static Logger log = Logger.getLogger(ModelosAplicacionesCommand.class.getName());

    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response, DatabaseServices ds) throws WebException {
        try {
            String compania = request.getParameter("compania");
            String usuario = request.getParameter("usuario");
            String anio = request.getParameter("anio");
            String marca = request.getParameter("marca");

            ArrayList modelos = getModelosAplicaciones(ds, compania, anio, marca);

            //ActividadFactory actividadFactory = new ActividadFactory();
            //actividadFactory.makeActividad(ds, compania, usuario, this.getClass().getSimpleName(), compania+";"+anio+";"+marca);

            try (PrintWriter out = response.getWriter()) {
                JSON.writeArrayOfObjects(out, modelos);
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

    private ArrayList getModelosAplicaciones(DatabaseServices ds, String compania, String anio, String marca) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT m.* ")
            .append("FROM Aplicacion a INNER JOIN Modelo m ON a.compania = m.compania AND a.modelo = m.modelo ")
            .append("WHERE a.compania = '").append(compania).append("' ")
            .append("AND a.periodoini <= ").append(anio).append(" AND a.periodofin >= ").append(anio).append(" ")
            .append("AND a.armadora = ").append(marca).append(" ")
            .append("GROUP BY m.compania, m.modelo, m.descripcion ")
            .append("ORDER BY m.descripcion;");

        ArrayList modelos = ds.collection(new ModeloDAO(), sql.toString());
        return modelos;
    }
}
