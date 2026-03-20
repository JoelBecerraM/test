package mx.intran.ecommerce.to;

import com.atcloud.to.ErrorTO;
import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author joelbecerramiranda
 */
public class CargaInformacionTO {
    public int registros = 0;
    public int registrosErroneos = 0;
    public int registrosActualizados = 0;
    public int registrosNuevos = 0;
    public int registrosExcluidos = 0;
    public String archivoLog;

    public ArrayList<ErrorTO> errores = new ArrayList<>();

    public void agregaExcluido(String msg) {
        ErrorTO errorTO = new ErrorTO();
        errorTO.fecha = new Date();
        errorTO.mensaje = msg;

        registrosExcluidos ++;
        errores.add(errorTO);
    }

    public void agregaMensaje(String msg) {
        ErrorTO errorTO = new ErrorTO();
        errorTO.fecha = new Date();
        errorTO.mensaje = msg;
        errorTO.exception = null;

        errores.add(errorTO);
    }

    public void agregaError(String msg) {
        ErrorTO errorTO = new ErrorTO();
        errorTO.fecha = new Date();
        errorTO.mensaje = msg;

        registrosErroneos ++;
        errores.add(errorTO);
    }

    public void agregaError(Exception e) {
        ErrorTO errorTO = new ErrorTO();
        errorTO.fromException(e);

        registrosErroneos ++;
        errores.add(errorTO);
    }
}

