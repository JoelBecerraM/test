
DECLARE @compania varchar(20);

set @compania = '1000';
GO

set @pais = '01';

SET GLOBAL local_infile=1;

truncate table Sepomex;
insert into Sepomex select * from fanasa.Sepomex;
-- load data infile '/tmp/CPdescarga-utf8.txt' into table Sepomex fields terminated by '|';

--
--

truncate Colonia;
truncate Poblacion;
truncate EntidadFederativa;
truncate Pais;

truncate Direccion;

truncate Usuario;
truncate Perfil;
truncate Parametro;

--
--

insert into Compania values (@compania, 'FLOTAMEX SA DE CV', 'FLOTAMEX', '0000000001', 'XAXX010101000', '5500000000', '601', 0);
insert into Direccion values (@compania, '0000000001','CALLE','NO','','090161745','09016','09','01','11000','11','CORPORATIVO');
insert into Almacen values (@compania, '0001','CEDIS GUADALAJARA');
insert into Almacen values (@compania, '0002','CEDIS SINALOA');

insert into Pais values (@pais, 'MÉXICO');
insert into EntidadFederativa select c_estado, @pais, upper(d_estado), '' from Sepomex group by c_estado, d_estado;
insert into Poblacion select concat(c_estado, c_mnpio), c_estado, @pais, upper(D_mnpio) from Sepomex group by c_mnpio, c_estado, D_mnpio;
insert into Colonia select concat(c_estado, c_mnpio, id_asenta_cpcons), concat(c_estado, c_mnpio), c_estado, @pais, upper(d_asenta), d_codigo, c_cve_ciudad from Sepomex;

update EntidadFederativa set estado = 'AGU' where entidadfederativa = '01' and pais = '01';
update EntidadFederativa set estado = 'BCN' where entidadfederativa = '02' and pais = '01';
update EntidadFederativa set estado = 'BCS' where entidadfederativa = '03' and pais = '01';
update EntidadFederativa set estado = 'CAM' where entidadfederativa = '04' and pais = '01';
update EntidadFederativa set estado = 'COA' where entidadfederativa = '05' and pais = '01';
update EntidadFederativa set estado = 'COL' where entidadfederativa = '06' and pais = '01';
update EntidadFederativa set estado = 'CHP' where entidadfederativa = '07' and pais = '01';
update EntidadFederativa set estado = 'CHH' where entidadfederativa = '08' and pais = '01';
update EntidadFederativa set estado = 'DIF' where entidadfederativa = '09' and pais = '01';
update EntidadFederativa set estado = 'DUR' where entidadfederativa = '10' and pais = '01';
update EntidadFederativa set estado = 'GUA' where entidadfederativa = '11' and pais = '01';
update EntidadFederativa set estado = 'GRO' where entidadfederativa = '12' and pais = '01';
update EntidadFederativa set estado = 'HID' where entidadfederativa = '13' and pais = '01';
update EntidadFederativa set estado = 'JAL' where entidadfederativa = '14' and pais = '01';
update EntidadFederativa set estado = 'MEX' where entidadfederativa = '15' and pais = '01';
update EntidadFederativa set estado = 'MIC' where entidadfederativa = '16' and pais = '01';
update EntidadFederativa set estado = 'MOR' where entidadfederativa = '17' and pais = '01';
update EntidadFederativa set estado = 'NAY' where entidadfederativa = '18' and pais = '01';
update EntidadFederativa set estado = 'NLE' where entidadfederativa = '19' and pais = '01';
update EntidadFederativa set estado = 'OAX' where entidadfederativa = '20' and pais = '01';
update EntidadFederativa set estado = 'PUE' where entidadfederativa = '21' and pais = '01';
update EntidadFederativa set estado = 'QUE' where entidadfederativa = '22' and pais = '01';
update EntidadFederativa set estado = 'ROO' where entidadfederativa = '23' and pais = '01';
update EntidadFederativa set estado = 'SLP' where entidadfederativa = '24' and pais = '01';
update EntidadFederativa set estado = 'SIN' where entidadfederativa = '25' and pais = '01';
update EntidadFederativa set estado = 'SON' where entidadfederativa = '26' and pais = '01';
update EntidadFederativa set estado = 'TAB' where entidadfederativa = '27' and pais = '01';
update EntidadFederativa set estado = 'TAM' where entidadfederativa = '28' and pais = '01';
update EntidadFederativa set estado = 'TLA' where entidadfederativa = '29' and pais = '01';
update EntidadFederativa set estado = 'VER' where entidadfederativa = '30' and pais = '01';
update EntidadFederativa set estado = 'YUC' where entidadfederativa = '31' and pais = '01';
update EntidadFederativa set estado = 'ZAC' where entidadfederativa = '32' and pais = '01';

insert into Parametro values (@compania, 'Version', '0.0.1', 1);
insert into Parametro values (@compania, 'VersionFecha', '2023-03-20', 1);
insert into VersionUsuario values (@compania, '*', '0.0.1', '2023-03-20');

insert into Perfil values (@compania, '99', 'ADMINISTRADOR');
insert into Usuario values (@compania, 'joelbecerram@gmail.com', 'mikasa110175', '99', 'A', 'Joel Becerra', 'joelbecerram@gmail.com', now(), 'assets/media/avatars/avatars-03.png','');

truncate table Permiso;

set @row_number = 0;

insert into Permiso values (@compania, (@row_number:=@row_number + 1), 'verPrecios');
insert into Permiso values (@compania, (@row_number:=@row_number + 1), 'verPromociones');

truncate table PermisoPerfil;

insert into PermisoPerfil
select compania, permiso, '99' from Permiso;

