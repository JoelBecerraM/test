package mx.intran.ecommerce.command;

import com.atcloud.commerce.services.JSON;
import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.to.ErrorTO;
import com.atcloud.util.Sort;
import com.atcloud.web.WebCommandInterface;
import com.atcloud.web.WebException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import mx.intran.ecommerce.commerce.CalculaTotalesCarritoCompras;
import mx.intran.ecommerce.to.TotalesCarritoComprasTO;
import mx.intran.ecommerce.to.UsuarioTO;

/**
 *
 * @author jbecerra
 */
public class ObtenCarritoCommand implements WebCommandInterface {
    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response, DatabaseServices ds) throws WebException {
        try {
            HttpSession sesion = request.getSession();

            UsuarioTO usuarioTO = (UsuarioTO)sesion.getAttribute("usuario");
            if (usuarioTO==null)
                throw new WebException("No hay sesion del usuario.");

            HashMap carrito = (HashMap)sesion.getAttribute("carrito");
            if (carrito==null)
                carrito = new HashMap();

            TotalesCarritoComprasTO totales = CalculaTotalesCarritoCompras.calculaTotalesCarrito(carrito);
            ArrayList productos = new ArrayList(carrito.values());
            Sort.sort(productos);

            try (PrintWriter out = response.getWriter()) {
                out.write("{");
                out.write("\"totales\": ");
                JSON.writeObject(out, totales);
                out.write(", \"productos\": ");
                JSON.writeArrayOfObjects(out, productos);
                out.write("}");
            }

        } catch(WebException e) {
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
            e.printStackTrace();

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
