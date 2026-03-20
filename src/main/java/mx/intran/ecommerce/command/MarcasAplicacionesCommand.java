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
import mx.intran.ecommerce.dao.entity.ArmadoraDAO;
import org.apache.log4j.Logger;

/**
 *
 * @author jbecerra
 */
public class MarcasAplicacionesCommand implements WebCommandInterface {
    static Logger log = Logger.getLogger(MarcasAplicacionesCommand.class.getName());

    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response, DatabaseServices ds) throws WebException {
        try {
            String compania = request.getParameter("compania");
            String usuario = request.getParameter("usuario");
            String anio = request.getParameter("anio");

            ArrayList marcas = getMarcasAplicaciones(ds, compania, anio);

            //ActividadFactory actividadFactory = new ActividadFactory();
            //actividadFactory.makeActividad(ds, compania, usuario, this.getClass().getSimpleName(), compania+";"+anio);

            try (PrintWriter out = response.getWriter()) {
                JSON.writeArrayOfObjects(out, marcas);
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

    private ArrayList getMarcasAplicaciones(DatabaseServices ds, String compania, String anio) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT ar.* ")
            .append("FROM Aplicacion a INNER JOIN Armadora ar ON a.compania = ar.compania AND a.armadora = ar.armadora ")
            .append("WHERE a.compania = '").append(compania).append("' ")
            .append("AND a.periodoini <= ").append(anio).append(" AND a.periodofin >= ").append(anio).append(" ")
            .append("GROUP BY ar.compania, ar.armadora, ar.descripcion ")
            .append("ORDER BY ar.descripcion;");

        ArrayList armadoras = ds.collection(new ArmadoraDAO(), sql.toString());
        return armadoras;
    }
}
