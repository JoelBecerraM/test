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
import mx.intran.ecommerce.to.AplicacionTO;
import org.apache.log4j.Logger;

/**
 *
 * @author jbecerra
 */
public class AutoparteAplicacionesCommand implements WebCommandInterface {
    static Logger log = Logger.getLogger(AutoparteAplicacionesCommand.class.getName());

    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response, DatabaseServices ds) throws WebException {
        try {
            String compania = request.getParameter("compania");
            String usuario = request.getParameter("usuario");
            String noparte = request.getParameter("noparte");

            ArrayList aplicaciones = getAplicaciones(ds, compania, noparte);

            //ActividadFactory actividadFactory = new ActividadFactory();
            //actividadFactory.makeActividad(ds, compania, usuario, this.getClass().getSimpleName(), compania+";"+noparte);

            try (PrintWriter out = response.getWriter()) {
                JSON.writeArrayOfObjects(out, aplicaciones);
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


    private ArrayList getAplicaciones(DatabaseServices ds, String compania, String noparte) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT a.*, ar.descripcion AS dsarmadora, f.descripcion AS dsfabricante, m.descripcion AS dsmodelo, ")
            .append("COALESCE(mo.descripcion, '') AS dsmotor, COALESCE(c.descripcion, '') AS dscilindro ")
            .append("FROM Aplicacion a ")
            .append("LEFT JOIN Armadora ar ON a.compania = ar.compania AND a.armadora = ar.armadora ")
            .append("LEFT JOIN Fabricante f ON a.compania = f.compania AND a.fabricante = f.fabricante ")
            .append("LEFT JOIN Modelo m ON a.compania = m.compania AND a.modelo = m.modelo ")
            .append("LEFT JOIN Motor mo ON a.compania = mo.compania AND a.motor = mo.motor ")
            .append("LEFT JOIN Cilindro c ON a.compania = c.compania AND a.cilindro = c.cilindro ")
            .append("WHERE a.compania = '").append(compania).append("' ")
            .append("AND a.noparte = '").append(noparte).append("' ")
            .append("ORDER BY a.idaplicacion;");

        ArrayList aplicaciones = ds.collection(new AplicacionTO(), sql.toString());
        return aplicaciones;
    }
}
