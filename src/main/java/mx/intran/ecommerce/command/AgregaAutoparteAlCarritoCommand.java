package mx.intran.ecommerce.command;

import com.atcloud.commerce.services.JSON;
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
import javax.servlet.http.HttpSession;
import mx.intran.ecommerce.commerce.CalculaTotalesCarritoCompras;
import mx.intran.ecommerce.to.AutoparteTO;
import mx.intran.ecommerce.to.ProductoCarritoTO;
import mx.intran.ecommerce.to.TotalesCarritoComprasTO;
import mx.intran.ecommerce.to.UsuarioTO;
import mx.intran.ecommerce.util.QueryFactory;
import org.apache.log4j.Logger;

/**
 *
 * @author jbecerra
 */
public class AgregaAutoparteAlCarritoCommand implements WebCommandInterface {
    static Logger log = Logger.getLogger(AgregaAutoparteAlCarritoCommand.class.getName());

    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response, DatabaseServices ds) throws WebException {
        try {
            String compania = request.getParameter("compania");
            String usuario = request.getParameter("usuario");
            String noparte = request.getParameter("noparte");
            String cantidad = request.getParameter("cantidad");
            String promocion = request.getParameter("promocion");

            QueryFactory queryFactory = new QueryFactory();

            ArrayList<AutoparteTO> autopartes = ds.collection(new AutoparteTO(), queryFactory.getQueryAutoparte(compania, noparte));
            if (autopartes.isEmpty())
                throw new WebException("No existe esta Autoparte ["+compania+";"+noparte+"]");

            AutoparteTO autoparteTO = autopartes.get(0);

            HttpSession sesion = request.getSession();

            UsuarioTO usuarioTO = (UsuarioTO)sesion.getAttribute("usuario");
            if (usuarioTO==null)
                throw new WebException("No hay sesion del usuario.");

            HashMap carrito = (HashMap)sesion.getAttribute("carrito");
            if (carrito==null)
                carrito = new HashMap();

            ProductoCarritoTO pc = new ProductoCarritoTO();
            pc.agregado = System.currentTimeMillis();
            pc.noparte = noparte;
            pc.descripcion = autoparteTO.descripcion;
            pc.cantidad = Numero.getIntFromString(cantidad, 0);
            pc.multiplominvta = 1; //autoparteDAO.multiplominvta;
            pc.existencia = autoparteTO.existencia==null ?
                    0 : autoparteTO.existencia.intValue();
            pc.surtida = pc.cantidad;
            pc.priva = 0.16;

            Double precio = null;
            switch(usuarioTO.lista) {
                default:
                case "pre_naranja":
                    precio = autoparteTO.pre_naranja;
                    break;
                case "pre_verde":
                    precio = autoparteTO.pre_verde;
                    break;
                case "pre_morada":
                    precio = autoparteTO.pre_morada;
                    break;
                case "pre_azul":
                    precio = autoparteTO.pre_azul;
                    break;
                case "pre_roja":
                    precio = autoparteTO.pre_roja;
                    break;
                case "pre_cafe":
                    precio = autoparteTO.pre_cafe;
                    break;
                case "pre_rosa":
                    precio = autoparteTO.pre_rosa;
                    break;
                case "pre_amarilla":
                    precio = autoparteTO.pre_amarilla;
                    break;
                case "pre_azulmarino":
                    precio = autoparteTO.pre_azulmarino;
                    break;
            }
            if (precio==null)
                throw new WebException("Esta Autoparte ["+compania+";"+noparte+"] no tiene Lista de Precios");

            pc.precio = Numero.redondea(precio.doubleValue());
            pc.n_precio = pc.precio;

            if (promocion.compareTo("true")==0) {
                // Falta seleccionar la Especial
                if (autoparteTO.pro_normal>0.0d) {
                    pc.precio = Numero.redondea(autoparteTO.pro_normal);
                }
            }

            pc.calculaNota();

            if (pc.cantidad==0)
                carrito.remove(noparte);
            else
                carrito.put(noparte, pc);

            TotalesCarritoComprasTO totales = CalculaTotalesCarritoCompras.calculaTotalesCarrito(carrito);
            ArrayList productos = new ArrayList();
            productos.add(pc);

            sesion.setAttribute("carrito", carrito);
            sesion.setAttribute("carrito_modificado", String.valueOf(System.currentTimeMillis()));

            //ActividadFactory actividadFactory = new ActividadFactory();
            //actividadFactory.makeActividad(ds, compania, usuario, this.getClass().getSimpleName(), compania+";"+noparte+";"+cantidad);

            try (PrintWriter out = response.getWriter()) {
                out.write("{");
                out.write("\"totales\": ");
                JSON.writeObject(out, totales);
                out.write(", \"productos\": ");
                JSON.writeArrayOfObjects(out, productos);
                out.write(", \"pc\": ");
                JSON.writeObject(out, pc);
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
