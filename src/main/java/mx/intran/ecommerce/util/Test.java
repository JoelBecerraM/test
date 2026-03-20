package mx.intran.ecommerce.util;

import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.util.CommonServices;
import com.atcloud.util.Reflector;
import java.io.File;
import java.nio.file.Files;
import java.sql.Connection;
import mx.intran.ecommerce.business.CargaCatalogoBusiness;
import mx.intran.ecommerce.to.CargaInformacionTO;
import org.apache.log4j.Logger;


/**
 *
 * @author joelbecerramiranda
 */
public class Test {
    static Logger log = Logger.getLogger(Test.class.getName());

    public static void main(String[] args) throws Exception {
        Log4JInit log4JInit = new Log4JInit();
        log4JInit.init(System.getProperty("log4j"));
        try {
            new Test(args);
        } catch(Exception e) {
            log.error(e.getMessage(), e);
        }
    }

    private String command = null;
    private String command2 = null;
    private String compania = null;

    public void parseArgs(String[] args) {
        for(int i=0; i<args.length; i++) {
            if (args[i].compareTo("--command")==0) {
                command = args[i+1];
                command2 = args[i+2];
            }
            else if (args[i].compareTo("--compania")==0)
                compania = args[i+1];
        }
    }

    public Test(String[] args) throws Exception {
        parseArgs(args);

        if (command!=null) {
            log.debug(command);

            log.debug("Connectando ...");
            CommonServices cs = new CommonServices();
            Connection connection = cs.getConnection("intran");
            DatabaseServices ds = new DatabaseServices(connection);

            try {
                // <editor-fold defaultstate="collapsed" desc="cargaCatalogo. Click on the + sign on the left to edit the code.">
                if (command.compareTo("cargaCatalogo")==0) {
                    File file = new File(command2);
                    byte[] fileContent = Files.readAllBytes(file.toPath());

                    CargaCatalogoBusiness business = new CargaCatalogoBusiness();
                    CargaInformacionTO cargaInformacionTO = business.cargaCatalogo(ds, compania, "SYSTEM", fileContent);

                    log.debug(Reflector.toStringAllFields(cargaInformacionTO));
                }
                // </editor-fold>
                // <editor-fold defaultstate="collapsed" desc="cargaPrecios. Click on the + sign on the left to edit the code.">
                else if (command.compareTo("cargaPrecios")==0) {
                    File file = new File(command2);
                    byte[] fileContent = Files.readAllBytes(file.toPath());

                    CargaCatalogoBusiness business = new CargaCatalogoBusiness();
                    CargaInformacionTO cargaInformacionTO = business.cargaPrecios(ds, compania, "SYSTEM", fileContent);

                    log.debug(Reflector.toStringAllFields(cargaInformacionTO));
                }
                // </editor-fold>
                // <editor-fold defaultstate="collapsed" desc="cargaPromociones. Click on the + sign on the left to edit the code.">
                else if (command.compareTo("cargaPromociones")==0) {
                    File file = new File(command2);
                    byte[] fileContent = Files.readAllBytes(file.toPath());

                    CargaCatalogoBusiness business = new CargaCatalogoBusiness();
                    CargaInformacionTO cargaInformacionTO = business.cargaPromociones(ds, compania, "SYSTEM", fileContent);

                    log.debug(Reflector.toStringAllFields(cargaInformacionTO));
                }
                // </editor-fold>
                // <editor-fold defaultstate="collapsed" desc="cargaInventario. Click on the + sign on the left to edit the code.">
                else if (command.compareTo("cargaInventario")==0) {
                    File file = new File(command2);
                    byte[] fileContent = Files.readAllBytes(file.toPath());

                    CargaCatalogoBusiness business = new CargaCatalogoBusiness();
                    CargaInformacionTO cargaInformacionTO = business.cargaInventario(ds, compania, "SYSTEM", fileContent);

                    log.debug(Reflector.toStringAllFields(cargaInformacionTO));
                }
                // </editor-fold>
                // <editor-fold defaultstate="collapsed" desc="cargaClientes. Click on the + sign on the left to edit the code.">
                else if (command.compareTo("cargaClientes")==0) {
                    File file = new File(command2);
                    byte[] fileContent = Files.readAllBytes(file.toPath());

                    CargaCatalogoBusiness business = new CargaCatalogoBusiness();
                    CargaInformacionTO cargaInformacionTO = business.cargaClientes(ds, compania, "SYSTEM", fileContent);

                    log.debug(Reflector.toStringAllFields(cargaInformacionTO));
                }
                // </editor-fold>
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            } finally {
                log.debug("Cierro conexiones ...");
                connection.close();
            }
        }
    }

}
