package mx.intran.ecommerce.to;

import com.atcloud.to.TransferObject;
import java.io.Serializable;

/**
 *
 * @author joelbecerramiranda
 */
public class MensajeTO implements TransferObject, Serializable {
    public String wrn = "";
    public String msg = "";
}
