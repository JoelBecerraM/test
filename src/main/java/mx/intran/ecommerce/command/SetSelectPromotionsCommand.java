package mx.intran.ecommerce.command;

import com.atcloud.commerce.services.JSON;
import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.to.ErrorTO;
import com.atcloud.util.Numero;
import com.atcloud.web.WebCommandInterface;
import com.atcloud.web.WebException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import mx.intran.ecommerce.model.PageModel;
import mx.intran.ecommerce.to.MensajeTO;
import org.apache.log4j.Logger;

/**
 *
 * @author joelbecerramiranda
 */
public class SetSelectPromotionsCommand implements WebCommandInterface {
    static Logger log = Logger.getLogger(SetSelectPromotionsCommand.class.getName());

    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response, DatabaseServices ds) throws WebException {
        try {
            String checked = request.getParameter("checked");

            HttpSession sesion = request.getSession();

            PageModel pageModel = (PageModel)sesion.getAttribute("pageModel");
            if (pageModel==null)
                pageModel = new PageModel();

            pageModel.selectPromotions = checked.compareTo("true")==0;

            sesion.setAttribute("pageModel", pageModel);

            MensajeTO mensajeTO = new MensajeTO();
            mensajeTO.msg = "OK";

            try (PrintWriter out = response.getWriter()) {
                JSON.writeObject(out, mensajeTO);
            }

            /*} catch(WebException e) {
            log.error(e.getMessage(), e);

            ErrorTO errorTO = new ErrorTO();
            errorTO.fromException(e);

            try {
                PrintWriter out = response.getWriter();
                JSON.writeObject(out, errorTO);
                out.close();

            } catch(Exception ex) {
                throw new WebException(ex.getMessage());
            }*/

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
