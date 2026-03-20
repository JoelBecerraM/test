package mx.intran.ecommerce.business;

import com.atcloud.dao.engine.DatabaseServices;
import com.atcloud.util.Numero;
import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpSession;
import mx.intran.ecommerce.commerce.CalculaTotalesCarritoCompras;
import mx.intran.ecommerce.dao.entity.AplicacionDAO;
import mx.intran.ecommerce.dao.entity.ArmadoraDAO;
import mx.intran.ecommerce.dao.entity.AutoparteDAO;
import mx.intran.ecommerce.dao.entity.CilindroDAO;
import mx.intran.ecommerce.dao.entity.ClienteDAO;
import mx.intran.ecommerce.dao.entity.FabricanteDAO;
import mx.intran.ecommerce.dao.entity.FamiliaDAO;
import mx.intran.ecommerce.dao.entity.InventarioDAO;
import mx.intran.ecommerce.dao.entity.LineaDAO;
import mx.intran.ecommerce.dao.entity.ListaPreciosDAO;
import mx.intran.ecommerce.dao.entity.ModeloDAO;
import mx.intran.ecommerce.dao.entity.MotorDAO;
import mx.intran.ecommerce.dao.entity.PromocionesDAO;
import mx.intran.ecommerce.dao.entity.SistemaDAO;
import mx.intran.ecommerce.model.PageModel;
import mx.intran.ecommerce.to.AutoparteTO;
import mx.intran.ecommerce.to.CargaInformacionTO;
import mx.intran.ecommerce.to.ProductoCarritoTO;
import mx.intran.ecommerce.to.TotalesCarritoComprasTO;
import mx.intran.ecommerce.to.UsuarioTO;
import mx.intran.ecommerce.util.QueryFactory;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

/**
 *
 * @author joelbecerramiranda
 */
public class CargaCatalogoBusiness {
    static Logger log = Logger.getLogger(CargaCatalogoBusiness.class.getName());

    public CargaInformacionTO cargaPedido(HttpSession sesion, UsuarioTO usuarioTO, DatabaseServices ds, String compania, String usuario, byte[] data) throws Exception {
        log.debug("Cargando Pedido ...");

        CargaInformacionTO cargaInformacionTO = new CargaInformacionTO();

        // Limpia antes de cargar la hoja de excel
        //   Por el momento no limpio el carrito antes de cargar

        ByteArrayInputStream bis = new ByteArrayInputStream(data);

        Workbook workBook = WorkbookFactory.create(bis);
        Sheet sheet = workBook.getSheetAt(0);

        int lastRowNum = sheet.getLastRowNum();
        Row row0 = sheet.getRow(0);

        for (int i=1; i<=lastRowNum; i++) {
            Row row = sheet.getRow(i);
            if (row==null)
                continue;

            cargaInformacionTO.registros ++;

            int indx=0;
            String noparte = getCellValue(row.getCell(indx++));
            if (noparte==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] noparte no tiene valor.");
                continue;
            }
            String cantidad = getCellValue(row.getCell(indx++));
            if (cantidad==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] cantidad no tiene valor.");
                continue;
            }

            //
            //
            //
            QueryFactory queryFactory = new QueryFactory();

            ArrayList<AutoparteTO> autopartes = ds.collection(new AutoparteTO(), queryFactory.getQueryAutoparte(compania, noparte));
            if (autopartes.isEmpty()) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] este Autoparte ["+compania+";"+noparte+"] no existe.");
                continue;
            }

            AutoparteTO autoparteTO = autopartes.get(0);

            HashMap carrito = (HashMap)sesion.getAttribute("carrito");
            if (carrito==null)
                carrito = new HashMap();

            PageModel pageModel = (PageModel)sesion.getAttribute("pageModel");
            if (pageModel==null)
                pageModel = new PageModel();

            ProductoCarritoTO pc = new ProductoCarritoTO();
            pc.agregado = System.currentTimeMillis();
            pc.noparte = noparte;
            pc.descripcion = autoparteTO.descripcion;
            pc.cantidad = (int)Numero.getDoubleFromString(cantidad, 0);
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
            if (precio==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] esta Autoparte ["+compania+";"+noparte+"] no tiene Lista de Precios.");
                continue;
            }

            pc.precio = Numero.redondea(precio.doubleValue());
            pc.n_precio = pc.precio;

            if (pageModel.selectPromotions) {
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
            //
            //
            //

            cargaInformacionTO.registrosActualizados ++;
        }

        return cargaInformacionTO;
    }

    public CargaInformacionTO cargaClientes(DatabaseServices ds, String compania, String usuario, byte[] data) throws Exception {
        log.debug("Cargando Clientes ...");

        CargaInformacionTO cargaInformacionTO = new CargaInformacionTO();

        // Limpia antes de cargar la hoja de excel
        ds.delete(new ClienteDAO(), null);

        ByteArrayInputStream bis = new ByteArrayInputStream(data);

        Workbook workBook = WorkbookFactory.create(bis);
        Sheet sheet = workBook.getSheetAt(0);

        int lastRowNum = sheet.getLastRowNum();
        Row row0 = sheet.getRow(0);

        for (int i=1; i<=lastRowNum; i++) {
            Row row = sheet.getRow(i);
            if (row==null)
                continue;

            cargaInformacionTO.registros ++;

            int indx=0;
            String cliente = getCellValue(row.getCell(indx++));
            if (cliente==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] cliente no tiene valor.");
                continue;
            }
            String nombre = getCellValue(row.getCell(indx++));
            if (nombre==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] nombre no tiene valor.");
                continue;
            }
            String lista = getCellValue(row.getCell(indx++));
            if (lista==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] lista no tiene valor.");
                continue;
            }
            String vendedor = getCellValue(row.getCell(indx++));
            if (vendedor==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] vendedor no tiene valor.");
                continue;
            }
            String idvendedor = getCellValue(row.getCell(indx++));
            if (idvendedor==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] idvendedor no tiene valor.");
                continue;
            }
            String gerenteregional = getCellValue(row.getCell(indx++));
            if (gerenteregional==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] gerenteregional no tiene valor.");
                continue;
            }
            String idgerenteregional = getCellValue(row.getCell(indx++));
            if (idgerenteregional==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] idgerenteregional no tiene valor.");
                continue;
            }
            String gerentenacional = getCellValue(row.getCell(indx++));
            if (gerentenacional==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] gerentenacional no tiene valor.");
                continue;
            }
            String entidadfederativa = getCellValue(row.getCell(indx++));
            if (entidadfederativa==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] entidadfederativa no tiene valor.");
                continue;
            }
            String codigopostal = getCellValue(row.getCell(indx++));
            if (codigopostal==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] codigopostal no tiene valor.");
                continue;
            }
            String correoelectronico = getCellValue(row.getCell(indx++));

            if (cliente.endsWith(".0"))
                cliente = String.valueOf((int)Double.parseDouble(cliente));
            lista = lista.toUpperCase();
            if (correoelectronico==null)
                correoelectronico = "";

            ClienteDAO clienteDAO = new ClienteDAO();
            clienteDAO.compania = compania;
            clienteDAO.cliente = cliente;

            boolean existe = ds.exists(clienteDAO);

            switch(lista) {
                default:
                case "LISTA NARANJA":
                    lista = "pre_naranja";
                    break;
                case "LISTA VERDE":
                    lista = "pre_verde";
                    break;
                case "LISTA MORADA":
                    lista = "pre_morada";
                    break;
                case "LISTA AZUL":
                    lista = "pre_azul";
                    break;
                case "LISTA ROJA":
                    lista = "pre_roja";
                    break;
                case "LISTA CAFÉ":
                    lista = "pre_cafe";
                    break;
                case "LISTA ROSA":
                    lista = "pre_rosa";
                    break;
                case "LISTA AMARILLA":
                    lista = "pre_amarilla";
                    break;
                case "LISTA AZUL MARINO":
                    lista = "pre_azulmarino";
                    break;
            }

            clienteDAO.nombre = nombre;
            clienteDAO.lista = lista;
            clienteDAO.vendedor = vendedor;
            clienteDAO.idvendedor = idvendedor;
            clienteDAO.gerenteregional = gerenteregional;
            clienteDAO.idgerenteregional = idgerenteregional;
            clienteDAO.gerentenacional = gerentenacional;
            clienteDAO.entidadfederativa = entidadfederativa;
            clienteDAO.codigopostal = codigopostal;
            clienteDAO.correoelectronico = correoelectronico;

            if (existe)
                ds.update(clienteDAO);
            else
                ds.insert(clienteDAO);
            //

            cargaInformacionTO.registrosActualizados ++;

        }

        return cargaInformacionTO;
    }

    public CargaInformacionTO cargaInventario(DatabaseServices ds, String compania, String usuario, byte[] data) throws Exception {
        log.debug("Cargando Inventario ...");

        CargaInformacionTO cargaInformacionTO = new CargaInformacionTO();

        // Limpia antes de cargar la hoja de excel
        ds.delete(new InventarioDAO(), null);

        ByteArrayInputStream bis = new ByteArrayInputStream(data);

        Workbook workBook = WorkbookFactory.create(bis);
        Sheet sheet = workBook.getSheetAt(0);

        int lastRowNum = sheet.getLastRowNum();
        Row row0 = sheet.getRow(0);

        for (int i=1; i<=lastRowNum; i++) {
            Row row = sheet.getRow(i);
            if (row==null)
                continue;

            cargaInformacionTO.registros ++;

            int indx=0;
            String noparte = getCellValue(row.getCell(indx++));
            if (noparte==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] noparte no tiene valor.");
                continue;
            }
            String existencia = getCellValue(row.getCell(indx++));
            if (existencia==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] existencia no tiene valor.");
                continue;
            }

            InventarioDAO inventarioDAO = new InventarioDAO();
            inventarioDAO.compania = compania;
            inventarioDAO.noparte = noparte;

            boolean existe = ds.exists(inventarioDAO);

            inventarioDAO.existencia = (int)Numero.getDoubleFromString(existencia);

            if (existe)
                ds.update(inventarioDAO);
            else
                ds.insert(inventarioDAO);
            //

            cargaInformacionTO.registrosActualizados ++;

        }

        return cargaInformacionTO;
    }

    public CargaInformacionTO cargaPromociones(DatabaseServices ds, String compania, String usuario, byte[] data) throws Exception {
        log.debug("Cargando Promociones ...");

        CargaInformacionTO cargaInformacionTO = new CargaInformacionTO();

        // Limpia antes de cargar la hoja de excel
        ds.delete(new PromocionesDAO(), null);

        ByteArrayInputStream bis = new ByteArrayInputStream(data);

        Workbook workBook = WorkbookFactory.create(bis);
        Sheet sheet = workBook.getSheetAt(0);

        int lastRowNum = sheet.getLastRowNum();
        Row row0 = sheet.getRow(0);

        for (int i=1; i<=lastRowNum; i++) {
            Row row = sheet.getRow(i);
            if (row==null)
                continue;

            cargaInformacionTO.registros ++;

            int indx=0;
            String noparte = getCellValue(row.getCell(indx++));
            if (noparte==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] noparte no tiene valor.");
                continue;
            }
            String pro_normal = getCellValue(row.getCell(indx++));
            if (pro_normal==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] pro_normal no tiene valor.");
                continue;
            }
            String pro_especial = getCellValue(row.getCell(indx++));
            if (pro_especial==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] pro_especial no tiene valor.");
                continue;
            }

            PromocionesDAO promocionesDAO = new PromocionesDAO();
            promocionesDAO.compania = compania;
            promocionesDAO.noparte = noparte;

            boolean existe = ds.exists(promocionesDAO);

            promocionesDAO.pro_normal = Numero.redondea(Numero.getDoubleFromString(pro_normal));
            promocionesDAO.pro_especial = Numero.redondea(Numero.getDoubleFromString(pro_especial));

            if (existe)
                ds.update(promocionesDAO);
            else
                ds.insert(promocionesDAO);
            //

            cargaInformacionTO.registrosActualizados ++;

        }

        // Tomo las Promociones existentes y las actualizo en los registros de ListaPrecios
        ds.update("UPDATE ListaPrecios lp SET lp.pro_normal = 0, lp.pro_especial = 0");
        ds.update("UPDATE ListaPrecios lp, Promociones p SET lp.pro_normal = p.pro_normal, lp.pro_especial = p.pro_especial "
            +"WHERE lp.compania = p.compania AND lp.noparte = p.noparte");

        return cargaInformacionTO;
    }

    public CargaInformacionTO cargaPrecios(DatabaseServices ds, String compania, String usuario, byte[] data) throws Exception {
        log.debug("Cargando Precios ...");

        CargaInformacionTO cargaInformacionTO = new CargaInformacionTO();

        // Limpia antes de cargar la hoja de excel
        ds.delete(new ListaPreciosDAO(), null);

        ByteArrayInputStream bis = new ByteArrayInputStream(data);

        Workbook workBook = WorkbookFactory.create(bis);
        Sheet sheet = workBook.getSheetAt(0);

        int lastRowNum = sheet.getLastRowNum();
        Row row0 = sheet.getRow(0);

        for (int i=1; i<=lastRowNum; i++) {
            Row row = sheet.getRow(i);
            if (row==null)
                continue;

            cargaInformacionTO.registros ++;

            int indx=0;
            String noparte = getCellValue(row.getCell(indx++));
            if (noparte==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] noparte no tiene valor.");
                continue;
            }
            String lista_naranja = getCellValue(row.getCell(indx++));
            if (lista_naranja==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] lista_naranja no tiene valor.");
                continue;
            }
            String lista_verde = getCellValue(row.getCell(indx++));
            if (lista_verde==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] lista_verde no tiene valor.");
                continue;
            }
            String lista_morada = getCellValue(row.getCell(indx++));
            if (lista_morada==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] lista_morada no tiene valor.");
                continue;
            }
            String lista_azul = getCellValue(row.getCell(indx++));
            if (lista_azul==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] lista_azul no tiene valor.");
                continue;
            }
            String lista_roja = getCellValue(row.getCell(indx++));
            if (lista_roja==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] lista_roja no tiene valor.");
                continue;
            }
            String lista_cafe = getCellValue(row.getCell(indx++));
            if (lista_cafe==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] lista_cafe no tiene valor.");
                continue;
            }
            String lista_rosa = getCellValue(row.getCell(indx++));
            if (lista_rosa==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] lista_rosa no tiene valor.");
                continue;
            }
            String lista_amarilla = getCellValue(row.getCell(indx++));
            if (lista_amarilla==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] lista_amarilla no tiene valor.");
                continue;
            }
            String lista_azulmarino = getCellValue(row.getCell(indx++));
            if (lista_azulmarino==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] lista_azulmarino no tiene valor.");
                continue;
            }

            ListaPreciosDAO listaPreciosDAO = new ListaPreciosDAO();
            listaPreciosDAO.compania = compania;
            listaPreciosDAO.noparte = noparte;

            boolean existe = ds.exists(listaPreciosDAO);

            listaPreciosDAO.pre_naranja = Numero.redondea(Numero.getDoubleFromString(lista_naranja));
            listaPreciosDAO.pre_verde = Numero.redondea(Numero.getDoubleFromString(lista_verde));
            listaPreciosDAO.pre_morada = Numero.redondea(Numero.getDoubleFromString(lista_morada));
            listaPreciosDAO.pre_azul = Numero.redondea(Numero.getDoubleFromString(lista_azul));
            listaPreciosDAO.pre_roja = Numero.redondea(Numero.getDoubleFromString(lista_roja));
            listaPreciosDAO.pre_cafe = Numero.redondea(Numero.getDoubleFromString(lista_cafe));
            listaPreciosDAO.pre_rosa = Numero.redondea(Numero.getDoubleFromString(lista_rosa));
            listaPreciosDAO.pre_amarilla = Numero.redondea(Numero.getDoubleFromString(lista_amarilla));
            listaPreciosDAO.pre_azulmarino = Numero.redondea(Numero.getDoubleFromString(lista_azulmarino));
            listaPreciosDAO.pro_normal = 0.0d;
            listaPreciosDAO.pro_especial = 0.0d;

            if (existe)
                ds.update(listaPreciosDAO);
            else
                ds.insert(listaPreciosDAO);
            //

            cargaInformacionTO.registrosActualizados ++;

        }

        // Tomo las Promociones existentes y las actualizo en los registros de ListaPrecios
        ds.update("UPDATE ListaPrecios lp, Promociones p SET lp.pro_normal = p.pro_normal, lp.pro_especial = p.pro_especial "
            +"WHERE lp.compania = p.compania AND lp.noparte = p.noparte");

        return cargaInformacionTO;
    }

    public CargaInformacionTO cargaCatalogo(DatabaseServices ds, String compania, String usuario, byte[] data) throws Exception {
        log.debug("Cargando Catalogo ...");

        CargaInformacionTO cargaInformacionTO = new CargaInformacionTO();

        // Limpia antes de cargar la hoja de excel
        ds.delete(new AutoparteDAO(), null);
        ds.delete(new AplicacionDAO(), null);

        ByteArrayInputStream bis = new ByteArrayInputStream(data);

        Workbook workBook = WorkbookFactory.create(bis);
        Sheet sheet = workBook.getSheetAt(0);

        int lastRowNum = sheet.getLastRowNum();
        Row row0 = sheet.getRow(0);

        for (int i=1; i<=lastRowNum; i++) {
            Row row = sheet.getRow(i);
            if (row==null)
                continue;

            cargaInformacionTO.registros ++;

            int indx=0;
            String family = getCellValue(row.getCell(indx++));
            if (family==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] family no tiene valor.");
                continue;
            }
            String line = getCellValue(row.getCell(indx++));
            if (line==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] line no tiene valor.");
                continue;
            }
            String make = getCellValue(row.getCell(indx++));
            if (make==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] make no tiene valor.");
                continue;
            }
            String manufacturer = getCellValue(row.getCell(indx++));
            if (manufacturer==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] manufacturer no tiene valor.");
                continue;
            }
            String partnum = getCellValue(row.getCell(indx++));
            if (partnum==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] partnum no tiene valor.");
                continue;
            }
            String application = getCellValue(row.getCell(indx++));
            if (application==null) {
                cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] application no tiene valor.");
                continue;
            }
            String engine = getCellValue(row.getCell(indx++));
            //if (engine==null) {
            //    cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] engine no tiene valor.");
            //    continue;
            //}
            String cylinders = getCellValue(row.getCell(indx++));
            //if (cylinders==null) {
            //    cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] cylinders no tiene valor.");
            //    continue;
            //}
            String year = getCellValue(row.getCell(indx++));
            //if (year==null) {
            //    cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] year no tiene valor.");
            //    continue;
            //}
            String system = getCellValue(row.getCell(indx++));
            if (system==null) {
                system = "";
            //    cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] system no tiene valor.");
            //    continue;
            }
            String resistance = getCellValue(row.getCell(indx++));
            String others = getCellValue(row.getCell(indx++));
            String oem = getCellValue(row.getCell(indx++));
            if (oem==null) {
                oem = "";
            //    cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] oem no tiene valor.");
            //    continue;
            }
            String presion = getCellValue(row.getCell(indx++));
            String litros = getCellValue(row.getCell(indx++));
            String volts = getCellValue(row.getCell(indx++));
            String amperaje = getCellValue(row.getCell(indx++));

            String agrupador = getCellValue(row.getCell(indx++));
            if (agrupador==null) {
                agrupador = "";
            //    cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] agrupador no tiene valor.");
            //    continue;
            }
            String origen = getCellValue(row.getCell(indx++));
            if (origen==null) {
                origen = "";
            //    cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] origen no tiene valor.");
            //    continue;
            }
            String buscador = getCellValue(row.getCell(indx++));
            if (buscador==null) {
                buscador = "";
            //    cargaInformacionTO.agregaError("En el renglon ["+(row.getRowNum()+1)+"] buscador no tiene valor.");
            //    continue;
            }

            ArrayList<String> codigos = new ArrayList();
            for (int k=0; k<24; k++) {
                String codigo = emptyIsNull(getCellValue(row.getCell(indx++)));
                codigos.add(codigo);
            }

            //
            FamiliaDAO familiaDAO = (FamiliaDAO)ds.first(new FamiliaDAO(), "compania = '"+compania+"' AND descripcion = '"+family+"'");
            if (familiaDAO==null) {
                familiaDAO = new FamiliaDAO();
                familiaDAO.compania = compania;
                Integer id = (Integer)ds.aggregate(familiaDAO, "MAX", "familia");
                familiaDAO.familia = (id==null? 0 : id.intValue()) + 1;
                familiaDAO.descripcion = family;

                ds.insert(familiaDAO);
            }

            LineaDAO lineaDAO = (LineaDAO)ds.first(new LineaDAO(), "compania = '"+compania+"' AND descripcion = '"+line+"'");
            if (lineaDAO==null) {
                lineaDAO = new LineaDAO();
                lineaDAO.compania = compania;
                Integer id = (Integer)ds.aggregate(lineaDAO, "MAX", "linea");
                lineaDAO.linea = (id==null? 0 : id.intValue()) + 1;
                lineaDAO.descripcion = line;

                ds.insert(lineaDAO);
            }

            SistemaDAO sistemaDAO = (SistemaDAO)ds.first(new SistemaDAO(), "compania = '"+compania+"' AND descripcion = '"+system+"'");
            if (sistemaDAO==null) {
                sistemaDAO = new SistemaDAO();
                sistemaDAO.compania = compania;
                Integer id = (Integer)ds.aggregate(sistemaDAO, "MAX", "sistema");
                sistemaDAO.sistema = (id==null? 0 : id.intValue()) + 1;
                sistemaDAO.descripcion = system;

                ds.insert(sistemaDAO);
            }

            ArmadoraDAO armadoraDAO = (ArmadoraDAO)ds.first(new ArmadoraDAO(), "compania = '"+compania+"' AND descripcion = '"+make+"'");
            if (armadoraDAO==null) {
                armadoraDAO = new ArmadoraDAO();
                armadoraDAO.compania = compania;
                Integer id = (Integer)ds.aggregate(armadoraDAO, "MAX", "armadora");
                armadoraDAO.armadora = (id==null? 0 : id.intValue()) + 1;
                armadoraDAO.descripcion = make;

                ds.insert(armadoraDAO);
            }

            FabricanteDAO fabricanteDAO = (FabricanteDAO)ds.first(new FabricanteDAO(), "compania = '"+compania+"' AND descripcion = '"+manufacturer+"'");
            if (fabricanteDAO==null) {
                fabricanteDAO = new FabricanteDAO();
                fabricanteDAO.compania = compania;
                Integer id = (Integer)ds.aggregate(fabricanteDAO, "MAX", "fabricante");
                fabricanteDAO.fabricante = (id==null? 0 : id.intValue()) + 1;
                fabricanteDAO.descripcion = manufacturer;

                ds.insert(fabricanteDAO);
            }

            ModeloDAO modeloDAO = (ModeloDAO)ds.first(new ModeloDAO(), "compania = '"+compania+"' AND descripcion = '"+application+"'");
            if (modeloDAO==null) {
                modeloDAO = new ModeloDAO();
                modeloDAO.compania = compania;
                Integer id = (Integer)ds.aggregate(modeloDAO, "MAX", "modelo");
                modeloDAO.modelo = (id==null? 0 : id.intValue()) + 1;
                modeloDAO.descripcion = application;

                ds.insert(modeloDAO);
            }

            int motor = 0;
            if (engine!=null&&!engine.isEmpty()) {
                MotorDAO motorDAO = (MotorDAO)ds.first(new MotorDAO(), "compania = '"+compania+"' AND descripcion = '"+engine+"'");
                if (motorDAO==null) {
                    motorDAO = new MotorDAO();
                    motorDAO.compania = compania;
                    Integer id = (Integer)ds.aggregate(motorDAO, "MAX", "motor");
                    motorDAO.motor = (id==null? 0 : id.intValue()) + 1;
                    motorDAO.descripcion = engine;

                    ds.insert(motorDAO);
                }
                motor = motorDAO.motor;
            }

            int cilindro = 0;
            if (cylinders!=null&&!cylinders.isEmpty()) {
                CilindroDAO cilindroDAO = (CilindroDAO)ds.first(new CilindroDAO(), "compania = '"+compania+"' AND descripcion = '"+cylinders+"'");
                if (cilindroDAO==null) {
                    cilindroDAO = new CilindroDAO();
                    cilindroDAO.compania = compania;
                    Integer id = (Integer)ds.aggregate(cilindroDAO, "MAX", "cilindro");
                    cilindroDAO.cilindro = (id==null? 0 : id.intValue()) + 1;
                    cilindroDAO.descripcion = cylinders;

                    ds.insert(cilindroDAO);
                }
                cilindro = cilindroDAO.cilindro;
            }

            int periodoini = 0;
            int periodofin = 0;
            if (year==null||year.isEmpty())
                year = "0";
            String tyear[] = year.split("-");
            if (tyear.length==2) {
                try {
                    periodoini = Integer.parseInt(tyear[0]);
                    periodofin = Integer.parseInt(tyear[1]);

                    if (periodoini<100)
                        periodoini += periodoini>50 ? 1900 : 2000;
                    if (periodofin<100)
                        periodofin += periodofin>50 ? 1900 : 2000;
                } catch(Exception e) {
                }
            } else {
                try {
                    periodoini = (int)Double.parseDouble(year);
                    periodofin = periodoini;

                    if (periodoini<100)
                        periodoini += periodoini>50 ? 1900 : 2000;
                    if (periodofin<100)
                        periodofin += periodofin>50 ? 1900 : 2000;
                } catch(Exception e) {
                }
            }

            partnum = partnum.toUpperCase();

            AplicacionDAO aplicacionDAO = new AplicacionDAO();
            aplicacionDAO.compania = compania;
            aplicacionDAO.idaplicacion = i;
            aplicacionDAO.familia = familiaDAO.familia;
            aplicacionDAO.linea = lineaDAO.linea;
            aplicacionDAO.sistema = sistemaDAO.sistema;
            aplicacionDAO.armadora = armadoraDAO.armadora;
            aplicacionDAO.fabricante = fabricanteDAO.fabricante;
            aplicacionDAO.modelo = modeloDAO.modelo;
            aplicacionDAO.noparte = partnum;
            aplicacionDAO.motor = motor;
            aplicacionDAO.cilindro = cilindro;
            aplicacionDAO.periodoini = periodoini;
            aplicacionDAO.periodofin = periodofin;

            ds.insert(aplicacionDAO);

            AutoparteDAO autoparteDAO = new AutoparteDAO();
            autoparteDAO.compania = compania;
            autoparteDAO.noparte = partnum;

            boolean existe = ds.exists(autoparteDAO);

            autoparteDAO.familia = emptyIsNull(family);
            autoparteDAO.linea = emptyIsNull(line);
            autoparteDAO.sistema = emptyIsNull(system);
            autoparteDAO.resistencia = emptyIsNull(resistance);
            autoparteDAO.otros = emptyIsNull(others);
            autoparteDAO.oem = emptyIsNull(oem);
            autoparteDAO.presion = emptyIsNull(presion);
            autoparteDAO.litros = emptyIsNull(litros);
            autoparteDAO.volts = emptyIsNull(volts);
            autoparteDAO.amperaje = emptyIsNull(amperaje);

            autoparteDAO.descripcion =
                    familiaDAO.descripcion
                    +" "+lineaDAO.descripcion
                    +" "+armadoraDAO.descripcion
                    //+" "+fabricanteDAO.descripcion
                    +" "+modeloDAO.descripcion
                    +(autoparteDAO.sistema.length()>0 ? " "+autoparteDAO.sistema : "")
                    +(autoparteDAO.resistencia.length()>0 ? " "+autoparteDAO.resistencia : "")
                    +(autoparteDAO.otros.length()>0 ? " "+autoparteDAO.otros : "")
                    +(autoparteDAO.oem.length()>0 ? " "+autoparteDAO.oem : "")
                    +(autoparteDAO.presion.length()>0 ? " "+autoparteDAO.presion : "")
                    +(autoparteDAO.litros.length()>0 ? " "+autoparteDAO.litros : "")
                    +(autoparteDAO.volts.length()>0 ? " "+autoparteDAO.volts : "")
                    +(autoparteDAO.amperaje.length()>0 ? " "+autoparteDAO.amperaje : "")
                    ;
            autoparteDAO.descripcionlarga =
                    autoparteDAO.noparte
                    +" "+autoparteDAO.descripcion
                    +(buscador.length()>0 ? " "+buscador : "")
                    +" "+String.join(" ", codigos);
                    ;

            autoparteDAO.codigos = String.join("@", codigos);

            if (existe)
                ds.update(autoparteDAO);
            else
                ds.insert(autoparteDAO);
            //

            cargaInformacionTO.registrosActualizados ++;
        }

        return cargaInformacionTO;
    }

    private String emptyIsNull(String value) {
        if (value==null)
            return "";
        return value;
    }

    private String getCellValue(Cell cell) {
        String value = null;
        if (cell==null)
            return value;
        switch (cell.getCellType()) {
            case Cell.CELL_TYPE_NUMERIC:
                value = String.valueOf(cell.getNumericCellValue());
                break;
            case Cell.CELL_TYPE_FORMULA:
                value = String.valueOf(cell.getCellFormula());
                break;
            case Cell.CELL_TYPE_STRING:
                value = String.valueOf(cell.getRichStringCellValue().getString());
                break;
            default:
                value = cell.toString();
                break;
        }
        log.debug("Cell ["+cell.getRowIndex()+","+cell.getColumnIndex()+"] "+value);
        return value.trim();
    }
}

