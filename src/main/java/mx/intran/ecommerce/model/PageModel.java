package mx.intran.ecommerce.model;

import java.io.Serializable;

/**
 *
 * @author joelbecerramiranda
 */
public class PageModel implements Serializable {
    public static int PRODUCTS_VIEW_LIST = 0;
    public static int PRODUCTS_VIEW_GRID = 1;

    public int productsView = PRODUCTS_VIEW_LIST;
    public int productsHowMany = 10;
    public boolean selectPromotions = false;
}
