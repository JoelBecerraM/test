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
import mx.intran.ecommerce.dao.entity.AutoparteDAO;
import org.apache.log4j.Logger;

/**
 *
 * @author jbecerra
 */
public class AutoBusquedaAutopartesCommand implements WebCommandInterface {
    static Logger log = Logger.getLogger(AutoBusquedaAutopartesCommand.class.getName());

    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response, DatabaseServices ds) throws WebException {
        try {
            String compania = request.getParameter("compania");
            String valor = request.getParameter("valor");
            if (valor==null)
                valor = "";

            StringBuilder sql = new StringBuilder();
            sql.append("SELECT * ")
                .append("FROM Autoparte a ");
            sql.append("WHERE a.compania = '")
                .append(compania).append("' AND (1 = 1 ");
            String[] words = valor.split(" ");
            for (String word : words) {
                sql.append("OR a.descripcionlarga LIKE '%")
                    .append(word).append("%' ");
            }
            sql.append(") ");
            sql.append("ORDER BY a.descripcionlarga");

            ArrayList autopartes = ds.collection(new AutoparteDAO(), sql.toString());

            try (PrintWriter out = response.getWriter()) {
                JSON.writeArrayOfObjects(out, autopartes);
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
