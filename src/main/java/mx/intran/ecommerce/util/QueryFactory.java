package mx.intran.ecommerce.util;

/**
 *
 * @author joelbecerramiranda
 */
public class QueryFactory {

    public String getQueryAutopartesValor(String compania, String noparte, String valor) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT a.compania, a.noparte, a.descripcion, a.descripcionlarga, a.codigos, a.familia, a.linea, a.sistema, ")
            .append("a.resistencia, a.otros, a.oem, a.presion, a.litros, a.volts, a.amperaje, a.agrupador, a.origen, ")
            .append("lp.pre_naranja, lp.pre_verde, lp.pre_morada, lp.pre_azul, lp.pre_roja, lp.pre_cafe, lp.pre_rosa, lp.pre_amarilla, lp.pre_azulmarino, ")
            .append("lp.pro_normal, lp.pro_especial, i.existencia ")
            .append("FROM Autoparte a ")
            .append("LEFT JOIN ListaPrecios lp ON a.compania = lp.compania AND a.noparte = lp.noparte ")
            .append("LEFT JOIN Inventario i ON a.compania = i.compania AND a.noparte = i.noparte ")
            .append("WHERE a.compania = '").append(compania).append("' ");
        if (noparte.isEmpty()) {
            String[] words = valor.split(" ");
            for (String word : words)
                sql.append("AND a.descripcionlarga LIKE '%").append(word).append("%' ");
        } else {
            sql.append("AND a.noparte = '").append(noparte).append("' ");
        }
        sql.append("ORDER BY a.descripcionlarga");

        return sql.toString();
    }

    public String getQueryAutopartesAplicacion(String compania, String anio, String marca, String modelo, String motor, String linea) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT au.compania, au.noparte, au.descripcion, au.descripcionlarga, au.codigos, au.familia, au.linea, au.sistema, ")
            .append("au.resistencia, au.otros, au.oem, au.presion, au.litros, au.volts, au.amperaje, au.agrupador, au.origen, ")
            .append("lp.pre_naranja, lp.pre_verde, lp.pre_morada, lp.pre_azul, lp.pre_roja, lp.pre_cafe, lp.pre_rosa, lp.pre_amarilla, lp.pre_azulmarino, ")
            .append("lp.pro_normal, lp.pro_especial, i.existencia ")
            .append("FROM Aplicacion a INNER JOIN Autoparte au ON a.compania = au.compania AND a.noparte = au.noparte ")
            .append("LEFT JOIN ListaPrecios lp ON a.compania = lp.compania AND a.noparte = lp.noparte ")
            .append("LEFT JOIN Inventario i ON a.compania = i.compania AND a.noparte = i.noparte ")
            .append("WHERE a.compania = '").append(compania).append("' ");
        if (!anio.isEmpty())
            sql.append("AND a.periodoini <= ").append(anio).append(" AND a.periodofin >= ").append(anio).append(" ");
        if (!marca.isEmpty())
            sql.append("AND a.armadora = ").append(marca).append(" ");
        if (!modelo.isEmpty())
            sql.append("AND a.modelo = ").append(modelo).append(" ");
        if (!motor.isEmpty())
            sql.append("AND a.motor = ").append(motor).append(" ");
        if (!linea.isEmpty())
            sql.append("AND a.linea = ").append(linea).append(" ");
        sql.append("ORDER BY au.descripcionlarga");

        return sql.toString();
    }

    public String getQueryAutoparte(String compania, String noparte) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT a.compania, a.noparte, a.descripcion, a.descripcionlarga, a.codigos, a.familia, a.linea, a.sistema, ")
            .append("a.resistencia, a.otros, a.oem, a.presion, a.litros, a.volts, a.amperaje, a.agrupador, a.origen, ")
            .append("lp.pre_naranja, lp.pre_verde, lp.pre_morada, lp.pre_azul, lp.pre_roja, lp.pre_cafe, lp.pre_rosa, lp.pre_amarilla, lp.pre_azulmarino, ")
            .append("lp.pro_normal, lp.pro_especial, i.existencia ")
            .append("FROM Autoparte a ")
            .append("LEFT JOIN ListaPrecios lp ON a.compania = lp.compania AND a.noparte = lp.noparte ")
            .append("LEFT JOIN Inventario i ON a.compania = i.compania AND a.noparte = i.noparte ")
            .append("WHERE a.compania = '").append(compania).append("' ");
        sql.append("AND a.noparte = '").append(noparte).append("' ");
        sql.append("ORDER BY a.descripcionlarga");

        return sql.toString();
    }

    public String getQueryRelacionados(String compania, String noparte) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT a.compania, a.noparte, a.descripcion, a.descripcionlarga, a.codigos, a.familia, a.linea, a.sistema, ")
            .append("a.resistencia, a.otros, a.oem, a.presion, a.litros, a.volts, a.amperaje, a.agrupador, a.origen, ")
            .append("lp.pre_naranja, lp.pre_verde, lp.pre_morada, lp.pre_azul, lp.pre_roja, lp.pre_cafe, lp.pre_rosa, lp.pre_amarilla, lp.pre_azulmarino, ")
            .append("lp.pro_normal, lp.pro_especial, i.existencia ")
            .append("FROM Relacionado r INNER JOIN Autoparte a ON r.compania = a.compania AND r.noparterel = a.noparte ")
            .append("LEFT JOIN ListaPrecios lp ON a.compania = lp.compania AND a.noparte = lp.noparte ")
            .append("LEFT JOIN Inventario i ON a.compania = i.compania AND a.noparte = i.noparte ")
            .append("WHERE r.compania = '").append(compania).append("' ");
        sql.append("AND r.noparte = '").append(noparte).append("' ");
        sql.append("ORDER BY a.descripcionlarga");

        return sql.toString();
    }
}
