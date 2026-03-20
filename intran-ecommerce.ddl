
CREATE TABLE Compania (compania varchar(20) not null, razonsocial varchar(100) not null, nombre varchar(100) not null, 
	direccion varchar(10) not null, rfc varchar(20) not null, telefono varchar(20) not null, regimenfiscal varchar(10) not null,
	diferenciahoraria int not null,
	PRIMARY KEY (compania)
	);

CREATE TABLE Configuracion (compania varchar(20) not null, almacen varchar(20) not null, configuracion text not null, 
	femodificacion datetime, usuario varchar(30) not null,
	PRIMARY KEY (compania, almacen)
	);

CREATE TABLE Direccion (compania varchar(20) not null, direccion varchar(10) not null, calle varchar(60) not null, noexterior varchar(20), nointerior varchar(20), colonia varchar(60) not null, 
	poblacion varchar(10) not null, entidadfederativa varchar(10) not null, pais varchar(10) not null, codigopostal varchar(10) not null, 
	localidad varchar(10) not null, referencia varchar(60) not null, 
	PRIMARY KEY (compania, direccion)
	);

CREATE TABLE Almacen (
	compania varchar(20) not null, almacen varchar(20) not null, descripcion varchar(100) not null,
	PRIMARY KEY (compania, almacen)
	);

CREATE TABLE Folio ( 
	compania varchar(20) not null, tipo varchar(30) not null, folio int,
	PRIMARY KEY (compania, tipo)
	);

CREATE TABLE Token (compania varchar(20) not null, token varchar(60) not null, fevigencia datetime not null,
	PRIMARY KEY (compania, token)
	);

--
--
--

DROP TABLE IF EXISTS Familia;
CREATE TABLE Familia (compania varchar(20) not null, familia int not null, descripcion varchar(100) not null,
	PRIMARY KEY (compania, familia)
	);
CREATE INDEX Familia_INDX1 ON Familia (descripcion);

DROP TABLE IF EXISTS Linea;
CREATE TABLE Linea (compania varchar(20) not null, linea int not null, descripcion varchar(100) not null,
	PRIMARY KEY (compania, linea)
	);
CREATE INDEX Linea_INDX1 ON Linea (descripcion);

DROP TABLE IF EXISTS Sistema;
CREATE TABLE Sistema (compania varchar(20) not null, sistema int not null, descripcion varchar(100) not null,
	PRIMARY KEY (compania, sistema)
	);
CREATE INDEX Sistema_INDX1 ON Sistema (sistema);

DROP TABLE IF EXISTS Armadora;
CREATE TABLE Armadora (compania varchar(20) not null, armadora int not null, descripcion varchar(100) not null,
	PRIMARY KEY (compania, armadora)
	);
CREATE INDEX Armadora_INDX1 ON Armadora (descripcion);

DROP TABLE IF EXISTS Fabricante;
CREATE TABLE Fabricante (compania varchar(20) not null, fabricante int not null, descripcion varchar(100) not null,
	PRIMARY KEY (compania, fabricante)
	);
CREATE INDEX Fabricante_INDX1 ON Fabricante (fabricante);

DROP TABLE IF EXISTS Modelo;
CREATE TABLE Modelo (compania varchar(20) not null, modelo int not null, descripcion varchar(100) not null,
	PRIMARY KEY (compania, modelo)
	);
CREATE INDEX Modelo_INDX1 ON Modelo (modelo);

DROP TABLE IF EXISTS Motor;
CREATE TABLE Motor (compania varchar(20) not null, motor int not null, descripcion varchar(100) not null,
	PRIMARY KEY (compania, motor)
	);
CREATE INDEX Motor_INDX1 ON Motor (motor);

DROP TABLE IF EXISTS Cilindro;
CREATE TABLE Cilindro (compania varchar(20) not null, cilindro int not null, descripcion varchar(100) not null,
	PRIMARY KEY (compania, cilindro)
	);
CREATE INDEX Cilindro_INDX1 ON Cilindro (cilindro);

DROP TABLE IF EXISTS Autoparte;
CREATE TABLE Autoparte (compania varchar(20) not null, noparte varchar(20) not null, descripcion varchar(200) not null, 
	descripcionlarga varchar(600) not null, codigos varchar(400) not null, familia varchar(40) not null, linea varchar(40) not null, 
	sistema varchar(40) not null, resistencia varchar(40) not null, otros varchar(40) not null, oem varchar(40) not null, 
	presion varchar(20) not null, litros varchar(20) not null, volts varchar(20) not null, amperaje varchar(20) not null, 
	agrupador varchar(20) not null, origen varchar(20) not null,
	PRIMARY KEY (compania, noparte)
	);
CREATE INDEX Autoparte_INDX1 ON Autoparte (descripcion);
CREATE INDEX Autoparte_INDX2 ON Autoparte (descripcionlarga);
CREATE INDEX Autoparte_INDX3 ON Autoparte (codigos);

DROP TABLE IF EXISTS Aplicacion;
CREATE TABLE Aplicacion (compania varchar(20) not null, idaplicacion int not null, 
	familia int not null, linea int not null, sistema int not null, armadora int not null, fabricante int not null, modelo int not null, 
	noparte varchar(20) not null, motor int not null, cilindro int not null, periodoini int not null, periodofin int not null, 
	PRIMARY KEY (compania, idaplicacion)
	);

DROP TABLE IF EXISTS ListaPrecios;
CREATE TABLE ListaPrecios (compania varchar(20) not null, noparte varchar(20) not null, 
	pre_naranja decimal(12,4) not null, pre_verde decimal(12,4) not null, pre_morada decimal(12,4) not null, pre_azul decimal(12,4) not null, pre_roja decimal(12,4) not null, pre_cafe decimal(12,4) not null,
	pre_rosa decimal(12,4) not null, pre_amarilla decimal(12,4) not null, pre_azulmarino decimal(12,4) not null,
	pro_normal decimal(12,4) not null, pro_especial decimal(12,4) not null, 
	PRIMARY KEY (compania, noparte)
	);

DROP TABLE IF EXISTS Promociones;
CREATE TABLE Promociones (compania varchar(20) not null, noparte varchar(20) not null, 
	pro_normal decimal(12,4) not null, pro_especial decimal(12,4) not null,
	PRIMARY KEY (compania, noparte)
	);

DROP TABLE IF EXISTS Inventario;
CREATE TABLE Inventario (compania varchar(20) not null, noparte varchar(20) not null, 
	existencia int not null,
	PRIMARY KEY (compania, noparte)
	);
	
DROP TABLE IF EXISTS Relacionado;
CREATE TABLE Relacionado (compania varchar(20) not null, noparte varchar(20) not null, noparterel varchar(20) not null,
	PRIMARY KEY (compania, noparte, noparterel)
	);
	

--
--
--


CREATE TABLE Pais (pais varchar(10) not null, nombre varchar(80) not null,
	PRIMARY KEY (pais)
	);

CREATE TABLE EntidadFederativa (entidadfederativa varchar(10) not null, pais varchar(10) not null, nombre varchar(80) not null, estado varchar(3) not null, 
	PRIMARY KEY (entidadfederativa)
	);

CREATE TABLE Poblacion (poblacion varchar(10) not null, entidadfederativa varchar(10) not null, pais varchar(10) not null, nombre varchar(80) not null, 
	PRIMARY KEY (poblacion)
	);

CREATE TABLE Colonia (colonia varchar(10) not null, poblacion varchar(10) not null, entidadfederativa varchar(10) not null, pais varchar(10) not null,
	nombre varchar(80) not null, codigopostal varchar(10) not null, localidad varchar(10) not null,
	PRIMARY KEY (colonia)
	);

CREATE TABLE Sepomex (d_codigo varchar(10), d_asenta varchar(80), d_tipo_asenta varchar(80), D_mnpio varchar(80), d_estado varchar(80), d_ciudad varchar(80),
	d_CP varchar(10), c_estado varchar(10), c_oficina varchar(10), c_CP varchar(10), c_tipo_asenta varchar(10), c_mnpio varchar(10), 
	id_asenta_cpcons varchar(10), d_zona varchar(10), c_cve_ciudad varchar(10)
	);

--
--
--

DROP TABLE IF EXISTS Cliente;
CREATE TABLE Cliente (compania varchar(20) not null, cliente varchar(20) not null, nombre varchar(200) not null, 
	lista varchar(20) not null, vendedor varchar(100) not null, idvendedor varchar(5) not null, gerenteregional varchar(100) not null, idgerenteregional varchar(5) not null, 
	gerentenacional varchar(100) not null, entidadfederativa varchar(20) not null, codigopostal varchar(10) not null, 
	correoelectronico varchar(100) not null,
	PRIMARY KEY (compania, cliente)
	);

CREATE TABLE Perfil (compania varchar(20) not null, perfil varchar(5) not null, descripcion varchar(80) not null,
	PRIMARY KEY (compania, perfil)
	);

CREATE TABLE Permiso (compania varchar(20) not null, permiso int not null, nombre varchar(80) not null,
	PRIMARY KEY (compania, permiso)
	);

CREATE TABLE PermisoPerfil (compania varchar(20) not null, permiso int not null, perfil varchar(5) not null,
	PRIMARY KEY (compania, permiso, perfil)
	);

CREATE TABLE Usuario (compania varchar(20) not null, usuario varchar(30) not null,
	password varchar(20) not null, perfil varchar(5) not null, estado varchar(2), nombre varchar(80) not null, email varchar(60) not null, 
	cambiopassword datetime, avatar varchar(200) not null, cliente varchar(20) not null, 
	PRIMARY KEY (compania, usuario)
	);

CREATE TABLE InformacionUsuario (compania varchar(20) not null, usuario varchar(30) not null, password varchar(20), feultsincronizacion datetime,
	PRIMARY KEY(compania, usuario)
	);

CREATE TABLE Dispositivo (compania varchar(20) not null, usuario varchar(30) not null, serie varchar(30) not null, numero varchar(20), sim varchar(30), 
	imei varchar(30), version varchar(10), fecha datetime,
	PRIMARY KEY (compania, usuario, serie)
	);

CREATE TABLE Parametro (compania varchar(20) not null, parametro varchar(40) not null, valor varchar(30), activo int, 
	PRIMARY KEY (compania, parametro)
	);

CREATE TABLE ParametroUsuario (compania varchar(20) not null, usuario varchar(30) not null, parametro varchar(40), valor varchar(30), activo int, 
	PRIMARY KEY (compania, usuario, parametro)
	);

CREATE TABLE SentenciaSQL (compania varchar(20) not null, usuario varchar(30) not null, orden int not null, sentencia varchar(512),
	PRIMARY KEY (compania, usuario, orden)
	);

CREATE TABLE VersionUsuario (compania varchar(20) not null, usuario varchar(20) not null, version varchar(20), fecha varchar(10),
	PRIMARY KEY (compania, usuario)
	);

CREATE TABLE VersionSQL (compania varchar(20) not null, version varchar(20) not null, orden int not null, sentencia varchar(512),
	PRIMARY KEY (compania, version, orden)
	);

