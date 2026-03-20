package mx.intran.ecommerce.command;

import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import com.atcloud.commerce.services.JSON;
import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.web.WebCommandInterface;
import com.atcloud.web.WebException;
import com.atcloud.to.ErrorTO;
import com.atcloud.util.Fecha;
import com.atcloud.util.Reflector;
import mx.intran.ecommerce.collection.PermisoPerfilCollection;
import mx.intran.ecommerce.dao.entity.ClienteDAO;
import mx.intran.ecommerce.dao.entity.CompaniaDAO;
import mx.intran.ecommerce.dao.entity.PerfilDAO;
import mx.intran.ecommerce.dao.entity.UsuarioDAO;
import mx.intran.ecommerce.to.PermisosTO;
import mx.intran.ecommerce.to.UsuarioTO;
import org.apache.log4j.Logger;

/**
 *
 * @author jbecerra
 */
public class IniciaSesionCommand implements WebCommandInterface {
    static Logger log = Logger.getLogger(IniciaSesionCommand.class.getName());

    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response, DatabaseServices ds) throws WebException {
        try {
            String compania = request.getParameter("compania");
            String usuario = request.getParameter("usuario");
            String password = request.getParameter("password");
            String cerrar = request.getParameter("cerrar");

            UsuarioTO usuarioTO = new UsuarioTO();

            if (cerrar!=null) {
                HttpSession sesion = request.getSession();
                sesion.invalidate();

            } else {
                if (usuario==null||password==null) {
                    throw new WebException("Debe de especificar el usuario y la contrase&ntilde;a");
                } else {
                    UsuarioDAO usuarioDAO = (UsuarioDAO)ds.first(new UsuarioDAO(), "usuario = '"+usuario+"'");
                    if (usuarioDAO==null) {
                        throw new WebException("No existe el Usuario ["+usuario+"] en esta Compa&ntilde;ia ["+compania+"].");
                    } else {
                        if (usuarioDAO.password.compareTo(password)!=0) {
                            throw new WebException("La contrase&ntilde;a no es correcta.");
                        } else {
                            if (usuarioDAO.estado.compareTo("A")!=0)
                                throw new WebException("El Usuario ["+usuarioDAO+"] no esta Activo.");

                            ClienteDAO clienteDAO = new ClienteDAO(usuarioDAO.compania, usuarioDAO.cliente);
                            if (!ds.exists(clienteDAO))
                                throw new WebException("El Cliente ["+clienteDAO+"] no existe.");

                            Reflector.copyAllFields(usuarioDAO, usuarioTO);
                            Reflector.copyAllFields(clienteDAO, usuarioTO);

                            usuarioTO.clientenombre = clienteDAO.nombre;

                            PerfilDAO perfilDAO = new PerfilDAO(compania, usuarioDAO.perfil);
                            if (!ds.exists(perfilDAO))
                                throw new WebException("No existe el Perfil ["+perfilDAO+"].");

                            usuarioTO.perfil = perfilDAO.perfil;
                            usuarioTO.descripcion = perfilDAO.descripcion;

                            if (usuarioDAO.cambiopassword!=null)
                                usuarioTO.fechapassword = Fecha.getFechaHora(usuarioDAO.cambiopassword);

                            CompaniaDAO companiaDAO = new CompaniaDAO(compania);
                            if (!ds.exists(companiaDAO))
                                throw new WebException("No existe la Compania ["+companiaDAO+"].");

                            usuarioTO.razonsocial = companiaDAO.razonsocial;
                            usuarioTO.companianombre = companiaDAO.nombre;

                            usuarioTO.permisos = null;

                            PermisoPerfilCollection permisoPerfilCollection = new PermisoPerfilCollection();
                            permisoPerfilCollection.compania = usuarioTO.compania;
                            permisoPerfilCollection.perfil = usuarioTO.perfil;

                            ArrayList<PermisoPerfilCollection> arrayPermisos = ds.collection(permisoPerfilCollection,
                                    permisoPerfilCollection.getSQL("pp.compania = '"+usuarioTO.compania+"' AND pp.perfil = '"+usuarioTO.perfil+"'"));
                            usuarioTO.permisos = new PermisosTO();
                            for(PermisoPerfilCollection permisoPerfilCollection1 : arrayPermisos)
                                usuarioTO.permisos.addPermiso(permisoPerfilCollection1.nombre);

                            response.setHeader("Pragma-directive", "no-cache");
                            response.setHeader("Cache-directive", "no-cache");
                            response.setHeader("Cache-control", "no-cache");
                            response.setHeader("Pragma", "no-cache");
                            response.setHeader("Expires", "0");

                            HttpSession sesion = request.getSession();
                            sesion.setMaxInactiveInterval(45 * 60);
                            sesion.setAttribute("usuario", usuarioTO);
                        }
                    }
                }
            }

            try (PrintWriter out = response.getWriter()) {
                JSON.writeObject(out, usuarioTO);
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