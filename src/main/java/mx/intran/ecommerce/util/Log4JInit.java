package mx.intran.ecommerce.util;

import com.atcloud.util.Fecha;
import java.io.File;
import javax.servlet.ServletException;
import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.PropertyConfigurator;

public class Log4JInit {
    
    public void init(String log4jLocation) throws ServletException {
        String date = Fecha.getFecha();
        System.setProperty("date", date);
        System.out.println("Log4JInitServlet is initializing log4j");

        if (log4jLocation == null) {
            System.err.println("*** No log4j-properties-location init param, so initializing log4j with BasicConfigurator");
            BasicConfigurator.configure();
        } else {
            File file = new File(log4jLocation);
            if (file.exists()) {
                System.out.println("Initializing log4j with: " + log4jLocation);
                PropertyConfigurator.configure(log4jLocation);
            } else {
                System.err.println("*** "+log4jLocation+" file not found, so initializing log4j with BasicConfigurator");
                BasicConfigurator.configure();
            }
        }
    }
}
