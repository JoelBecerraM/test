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
import mx.intran.ecommerce.to.AutoparteTO;
import mx.intran.ecommerce.util.QueryFactory;
import org.apache.log4j.Logger;

/**
 *
 * @author jbecerra
 */
public class AutoparteCommand implements WebCommandInterface {
    static Logger log = Logger.getLogger(AutoparteCommand.class.getName());

    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response, DatabaseServices ds) throws WebException {
        try {
            String compania = request.getParameter("compania");
            String usuario = request.getParameter("usuario");
            String noparte = request.getParameter("noparte");

            QueryFactory queryFactory = new QueryFactory();

            ArrayList<AutoparteTO> autopartes = ds.collection(new AutoparteTO(), queryFactory.getQueryAutoparte(compania, noparte));
            if (autopartes.isEmpty())
                throw new WebException("No existe esta Autoparte ["+compania+";"+noparte+"]");

            ArrayList<AutoparteTO> relacionados = ds.collection(new AutoparteTO(), queryFactory.getQueryRelacionados(compania, noparte));

            //ActividadFactory actividadFactory = new ActividadFactory();
            //actividadFactory.makeActividad(ds, compania, usuario, this.getClass().getSimpleName(), compania+";"+noparte);

            try (PrintWriter out = response.getWriter()) {
                out.write("{");
                out.write("\"autoparte\": ");
                JSON.writeObject(out, autopartes.get(0));
                out.write(", \"relacionados\": ");
                JSON.writeArrayOfObjects(out, relacionados);
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
}
