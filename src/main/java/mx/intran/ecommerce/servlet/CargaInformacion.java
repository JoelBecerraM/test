package mx.intran.ecommerce.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.atcloud.commerce.services.JSON;
import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.web.WebException;
import com.atcloud.to.ErrorTO;
import com.atcloud.util.Reflector;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import javax.naming.InitialContext;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import mx.intran.ecommerce.business.CargaCatalogoBusiness;
import mx.intran.ecommerce.to.CargaInformacionTO;
import mx.intran.ecommerce.to.UsuarioTO;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class CargaInformacion extends HttpServlet {
    static Logger log = Logger.getLogger(CargaInformacion.class.getName());

    public Connection getConnection() throws Exception {
        InitialContext ic = new InitialContext();
        DataSource ds = (DataSource)ic.lookup("java:comp/env/jdbc/intran");
        return ds.getConnection();
    }

    public void processRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        response.setContentType("application/json");
        response.setHeader("Cache-Control", "no-cache");

        Connection connection = getConnection();
        DatabaseServices ds = new DatabaseServices(connection);

        try {
            log.debug("CargaInformacion processRequest() ...");

            ds.beginTransaction();

            HttpSession sesion = request.getSession();
            UsuarioTO usuarioTO = (UsuarioTO)sesion.getAttribute("usuario");
            if (usuarioTO==null)
                throw new WebException("No existe el usuario en la sesion.");

            HashMap<String, String> parameters = new HashMap<>();
            byte[] data = new byte[0];

            boolean isMultipart = ServletFileUpload.isMultipartContent(request);
            if (!isMultipart) {
            } else {

                // Create a factory for disk-based file items
                FileItemFactory factory = new DiskFileItemFactory();
                // Create a new file upload handler
                ServletFileUpload upload = new ServletFileUpload(factory);

                // Parse the request
                List items = upload.parseRequest(request);

                // Process the uploaded items
                Iterator iterator = items.iterator();
                while (iterator.hasNext()) {
                    FileItem item = (FileItem)iterator.next();

                    if (item.isFormField()) {
                        String name = item.getFieldName();
                        String value = item.getString();

                        log.debug("parameter ["+name+"] = "+value);

                        parameters.put(name, value);

                    } else {
                        String fieldName = item.getFieldName();
                        String fileName = item.getName();
                        String contentType = item.getContentType();
                        //boolean isInMemory = item.isInMemory();
                        long sizeInBytes = item.getSize();

                        log.debug("file ["+fieldName+"] = "+fileName+" "+contentType+" len "+sizeInBytes);

                        InputStream uploadedStream = item.getInputStream();
                        data = new byte[(int)sizeInBytes];
                        uploadedStream.read(data);
                        uploadedStream.close();
                    }
                }
            }

            CargaInformacionTO cargaInformacionTO = new CargaInformacionTO();

            String compania = parameters.get("compania");
            if (compania==null||compania.isEmpty())
                throw new WebException("Debe de especificar la compania.");
            String usuario = parameters.get("usuario");
            if (usuario==null||usuario.isEmpty())
                throw new WebException("Debe de especificar el usuario.");
            String tipo = parameters.get("tipo");
            if (tipo==null||tipo.isEmpty())
                throw new WebException("Debe de especificar el tipo.");

            CargaCatalogoBusiness cargaInformacionBusiness = new CargaCatalogoBusiness();
            if (tipo.compareTo("cargaPedido")==0)
                cargaInformacionTO = cargaInformacionBusiness.cargaPedido(sesion, usuarioTO, ds, compania, usuario, data);

            log.debug(Reflector.toStringAllFields(cargaInformacionTO));

            String filename = "/tmp/CargaInformacion_"+compania+"_"+System.currentTimeMillis()+".txt";
            File file = new File(filename);
            FileOutputStream fos = new FileOutputStream(file);
            for(ErrorTO errorTO : cargaInformacionTO.errores)
                fos.write((errorTO.toString()+"\n").getBytes());
            fos.close();

            cargaInformacionTO.archivoLog = filename;

            PrintWriter out = response.getWriter();
            out.write("{");
            out.write("\"registros\": "+cargaInformacionTO.registros);
            out.write(",\"registrosErroneos\": "+cargaInformacionTO.registrosErroneos);
            out.write(",\"registrosActualizados\": "+cargaInformacionTO.registrosActualizados);
            out.write(",\"registrosNuevos\": "+cargaInformacionTO.registrosNuevos);
            out.write(",\"archivoLog\": \""+cargaInformacionTO.archivoLog+"\"");

            JSONArray errores = new JSONArray();
            for(ErrorTO errorTO : cargaInformacionTO.errores) {
                JSONObject jsonMensaje = JSON.jsonObject(errorTO);
                errores.add(jsonMensaje);
            }

            out.write(",\"errores\": ");
            out.write(errores.toJSONString());
            out.write("}");
            out.close();

            ds.commit();

        } catch(WebException e) {
            log.error(e.getMessage(), e);

            ErrorTO errorTO = new ErrorTO();
            errorTO.fromException(e);

            try {
                ds.rollback();
            } catch(SQLException SQLe) {
            }

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
                ds.rollback();
            } catch(SQLException SQLe) {
            }

            try {
                PrintWriter out = response.getWriter();
                JSON.writeObject(out, errorTO);
                out.close();

            } catch(Exception ex) {
                throw new WebException(ex.getMessage());
            }
        }

        connection.close();
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch(Exception e) {
            e.printStackTrace();
            throw new ServletException(e.getMessage());
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch(Exception e) {
            e.printStackTrace();
            throw new ServletException(e.getMessage());
        }
    }
}
