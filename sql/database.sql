DROP DATABASE IF EXISTS VTPROYECTOS;
CREATE DATABASE VTPROYECTOS CHARACTER SET utf8mb4;
USE VTPROYECTOS;

CREATE TABLE empresa(
  id_emp INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre_emp TEXT NOT NULL,
  ruc_emp VARCHAR(14),
  direccion_emp VARCHAR(100),
  telefono_emp VARCHAR(15),
  email_emp VARCHAR(100),
  paginaweb_emp VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE usuarios (
  id_usuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fotoperfil TEXT NOT NULL,
  usuario VARCHAR(100) NOT NULL,
  contrasenia VARCHAR(100) NOT NULL,
  rol VARCHAR (50) NOT NULL,
  sueldo FLOAT,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  ciruc VARCHAR (13) NOT NULL,
  direccion VARCHAR (100) NOT NULL,
  email VARCHAR (50) NOT NULL,
  telefono VARCHAR (12) NOT NULL,
  tipocontrato VARCHAR(40) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE cuentas(
  cuenta int (50),
  descripcion VARCHAR(100),
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE proveedores(
  id_prove INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  razonsocial_prove VARCHAR(200) NOT NULL,
  ciruc_prove VARCHAR (13) NOT NULL,
  direccion_prove VARCHAR (100) NOT NULL,
  email_prove VARCHAR (50) NOT NULL,
  telefono_prove VARCHAR (10) NOT NULL,
  descripcion_prove VARCHAR(200) NOT NULl,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE productos_servicios (
  id_proser INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo_proser VARCHAR (100),
  categoria_proser VARCHAR (100) NOT NULL,
  nombre_proser VARCHAR(100) NOT NULL,
  descripcion_proser VARCHAR(100) NOT NULL,
  lote_proser TEXT NOT NULL,
  preciosugerido_proser FLOAT NOT NULL,
  precio_proser FLOAT NOT NULL,
  cantidad_proser INT (5) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE agencia(
  id_agencia INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre_agencia VARCHAR(50) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE clientes(
  id_cli INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombres_cli VARCHAR (50) NOT NULL,
  apellidos_cli VARCHAR (50) NOT NULL,
  ciruc_cli VARCHAR (13) NOT NULL,
  direccion_cli VARCHAR (100) NOT NULL,
  email_cli VARCHAR (50) NOT NULL,
  telefono_cli VARCHAR (10) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE tipocliente(
  id_tcli INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_cli INT NOT NULL,
  descripcion_tcli VARCHAR(50) NOT NULL,
  estado_tcli VARCHAR(50) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- seccion de facturas
CREATE TABLE facturas(
  id_fac INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  numeroautorizacion TEXT NOT NULL,
  secuencial INT NOT NULL,
  items TEXT NOT NULL,
  subtotal0 FLOAT NOT NULL,
  subtotal12 FLOAT NOT NULL,
  ivatotal FLOAT NOT NULL,
  totalsinimpu FLOAT NOT NULL,
  totalFactura FLOAT NOT NULL,
  formapago VARCHAR(5) NOT NULL,
  tipoidentificacion VARCHAR(5) NOT NULL,
  nombre_cliente VARCHAR(100) NOT NULL,
  direccion_cliente VARCHAR(100) NOT NULL,
  ciruc_cliente VARCHAR(13) NOT NULL,
  email_cliente VARCHAR(100) NOT NULL,
  nombre_empresa VARCHAR(100) NOT NULL,
  ciruc_empresa VARCHAR(100) NOT NULL,
  direccion_empresa VARCHAR(100) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE prefactura(
  id_prefac INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_cli INT NOT NULL,
  id_usuario INT NOT NULL,
  servicios_prefac TEXT NOT NULL,
  impuesto_prefac FLOAT NOT NULL,
  neto_prefac FLOAT NOT NULL,
  total_prefac FLOAT NOT NULL,
  metodo_prefac VARCHAR(50) NOT NULL,
  convenio BOOLEAN NOT NULL,
  mesesatraso_prefac INT,
  facturagenerada_prefac VARCHAR(1) NOT NULL,
  monto_con FLOAT,
  numerospagos_con INT,
  valorpagos_con FLOAT,
  cuotasporpagar_con INT,
  fechaultimopago_con TIMESTAMP NULL DEFAULT NULL,
  fechacreacion_con TIMESTAMP NULL DEFAULT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE compras(
  id_com INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_prove INT NOT NULL,
  tipocomprobante_com VARCHAR(50) NOT NULL,
  emsion_com VARCHAR(50) NOT NULL,
  registro_com VARCHAR(50) NOT NULL,
  serie_com VARCHAR(50) NOT NULL,
  secuencia_com VARCHAR(50) NOT NULL,
  autorizacionSRI_com VARCHAR(50) NOT NULL,
  vencimiento_com VARCHAR(50) NOT NULL,
  comceptos_com TEXT NOT NULL,
  formapago_com VARCHAR(50) NOT NULL,
  iva_com INT,
  ICE_com INT,
  devolucionIVA INT,
  costogasto_com VARCHAR(50) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- seccion para la base de datos del agua
CREATE TABLE instalacion(
  id_ins INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_cat INT NOT NULL,
  id_cli INT NOT NULL,
  id_tins INT NOT NULL,
  fechacreacion_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fechabaja_ins TIMESTAMP NULL DEFAULT NULL,
  nueva_ins BOOLEAN NOT NULL,
  estado_ins VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE tipoinstalacion(
  id_tins INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  descripcion_tins VARCHAR(20),
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE catastros(
  id_cat INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre1_cat VARCHAR(30) NOT NULL,
    nombre2_cat VARCHAR(30) NOT NULL,
    apellido1_cat VARCHAR(30) NOT NULL,
    apellido2_cat VARCHAR(30) NOT NULL,
    codigo_clp VARCHAR(30) NOT NULL,
    codigo_mic VARCHAR(30) NOT NULL,
    departamento_cat VARCHAR(30) NOT NULL,
    descripcion_bar VARCHAR(30) NOT NULL,
    descripcion_clp VARCHAR(30) NOT NULL,
    descripcion_eme VARCHAR(30) NOT NULL,
    descripcion_rut VARCHAR(30) NOT NULL,
    descripcion_sec VARCHAR(30) NOT NULL,
    descripcion_taa VARCHAR(30) NOT NULL,
    descripcion_tal VARCHAR(30) NOT NULL,
    direccion_cat VARCHAR(30) NOT NULL,
    disponecisternatanque_cat VARCHAR(30) NOT NULL,
    disponeconexionagua_cat VARCHAR(30) NOT NULL,
    disponeconexionalc_cat VARCHAR(30) NOT NULL,
    disponemicromedidor_cat VARCHAR(30) NOT NULL,
    fechainstalmed_conag VARCHAR(30) NOT NULL,
    interseccion_cat VARCHAR(30) NOT NULL,
    manzana_cat VARCHAR(30) NOT NULL,
    numeracion_cat VARCHAR(30) NOT NULL,
    numerocuenta_ins VARCHAR(30) NOT NULL,
    numerofamilias_cat VARCHAR(30) NOT NULL,
    numeropersonas_cat VARCHAR(30) NOT NULL,
    piso_cat VARCHAR(30) NOT NULL,
    recoleccionbasura_cat VARCHAR(30) NOT NULL,
    secuencia_cat VARCHAR(30) NOT NULL,
    tipoclienteagua_cat VARCHAR(30) NOT NULL,
    tipoclientealcantarillado_cat VARCHAR(30) NOT NULL,
    imageponchada TEXT NOT NULL,
    imagepredio TEXT NOT NULL,
    fechaCreateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    latitude VARCHAR(30) NOT NULL,
    longitude VARCHAR(30) NOT NULL,
    altura VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE medidor(
  id_med INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_ins INT NOT NULL,
  codigo_med VARCHAR (50) NOT NULL,
  estado_med VARCHAR (20) NOT NULL,
  latitud_med VARCHAR(80) NOT NULL,
  longitud_med VARCHAR(80) NOT NULL,
  foto_med TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE cortes(
  id_cor INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_med INT NOT NULL,
  fecha_cor TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lectura_cor INT NOT NULL,
  fotoantes_cor TEXT NOT NULL,
  fotopredio_cor TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE reconexiones(
  id_reco INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_med INT NOT NULL,
  fecha_reco TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lectura_reco INT NOT NULL,
  fotoantes_reco TEXT NOT NULL,
  fotopredio_reco TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE lecturas(
  id_lec INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_med INT NOT NULL,
  fechalecant_lec TIMESTAMP NOT NULL,
  lecturaant_lec INT NOT NULL,
  fechalecact_lec TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lecturaact_lec INT NOT NULL,
  consumo_lec INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- tabla inventarios
CREATE TABLE inventario_asignado(
  id_inv INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_proser INT NOT NULL,
  stockasignado_inv INT NOT NULL,
  stockentregado_inv INT NOT NULL,
  proyectos_inv INT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE novedad(
    id_nov INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    numeroCuenta VARCHAR (50) NOT NULL,
    clavecatastral VARCHAR (50) NOT NULL,
    tarifa VARCHAR (50) NOT NULL,
    cliente VARCHAR (50) NOT NULL,
    direccion VARCHAR (50) NOT NULL,
    interseccion VARCHAR (50) NOT NULL,
    medidor VARCHAR (50) NOT NULL,
    mesesAtraso INT NOT NULL,
    tipoCorte VARCHAR (50) NOT NULL,
    cuadrilla VARCHAR (50) NOT NULL,
    lecturaCorte VARCHAR (50) NOT NULL,
    novedadCorte VARCHAR (50) NOT NULL,
    observacion VARCHAR (50) NOT NULL,
    fotoAntes TEXT NOT NULL,
    fotoDurante TEXT NOT NULL,
    fotoDespues TEXT NOT NULL,
    fotoPredio TEXT NOT NULL,
    grupoCorte VARCHAR (50) NOT NULL,
    totalafacturar INT NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE notificaciones(
  id_noti INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  numerocuenta_ins VARCHAR (50) NOT NULL,
  ciruc_cli VARCHAR (50) NOT NULL,
  nombres VARCHAR (50) NOT NULL, 
  direccion_cat VARCHAR (50) NOT NULL,
  clavecatastral VARCHAR (50) NOT NULL,
  medidor VARCHAR (50) NOT NULL,
  tarifa VARCHAR (50) NOT NULL,
  mesesdeuda VARCHAR (50) NOT NULL,
  fotoPredio TEXT NOT NULL,
  fotoNotificacion TEXT NOT NULL,
  grupoCorte VARCHAR (50),
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE sueldos(
  id_sueldos INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  sueldo FLOAT NOT NULL,
  diastrabajados INT NOT NULL,
  horasextras INT NOT NULL,
  calculo_horas FLOAT NOT NULL,
  tipohoras VARCHAR(2) NOT NULL,
  bonostransporte FLOAT NOT NULL,
  bonosalimentacion FLOAT NOT NULL,
  decimotercer FLOAT NOT NULL,
  decimocuarto FLOAT NOT NULL,
  otrosingresos FLOAT NOT NULL,
  totalingresos FLOAT NOT NULL,
  iessindividual FLOAT NOT NULL,
  iesspatronal FLOAT NOT NULL,
  iesstotal FLOAT NOT NULL,
  anticipos FLOAT NOT NULL,
  prestamos_oficina FLOAT NOT NULL,
  prestamo_hipotecario FLOAT NOT NULL,
  prestamo_quirografario FLOAT NOT NULL,
  otrosegresos FLOAT NOT NULL,
  total_egresos FLOAT NOT NULL,
  neto_recibir FLOAT NOT NULL,
  contrato TEXT NULL,
  actafiniquito TEXT NUll,
  aprobado VARCHAR(2),
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE documentos(
  id_doc INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  contrato_doc TEXT NOT NULL,
  IESS_doc TEXT NOT NULL,
  hojavida_doc TEXT NOT NULL,
  cedula_doc TEXT NOT NULL,
  actafiniquito_doc TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE fondos(
  id_fon INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  monto_fon FLOAT NOT NULL,
  descripcion_fon TEXT NOT NULL,
  fechaasignacion_fon TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE fondos_justificados(
  id_fonjus INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_fon INT NOT NULL,
  id_usuario INT NOT NULL,
  detalles_fonjus TEXT NOT NULL,
  justificado_fonjus FLOAT NOT NULL,
  nojustificado_fonjus FLOAT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE atrasos(
  id_atr INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  fecha_atr VARCHAR(50) NOT NULL,
  tiempo_atr VARCHAR(50) NOT NULL,
  descripcion_atr VARCHAR(50) NOT NULL,
  justificado_atr VARCHAR(10) NOT NULL,
  justificacion_atr VARCHAR(100) NOT NULL,
  fechajusti_atr VARCHAR(50) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE estado_usuario(
  id_esusu INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  descripcion_esusu VARCHAR(50) NOT NULL,
  fecha_baja_esusu VARCHAR(15) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE permisos(
  id_per INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  fecha_per VARCHAR(15) NOT NULL,
  motivo_per TEXT NOT NULL,
  aprobado_per VARCHAR(10) NOT NULL,
  fechaapro_per VARCHAR(15) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE proyeccion (
  id_pro INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  descripcion_pro TEXT NOT NULL,
  informacion_pro TEXT NOT NULL,
  estado_pro VARCHAR(100) NOT NULL,
  tiempo_pro TEXT NOT NULL,
  fechas_pro TEXT NOT NULL,
  viabilidad_pro VARCHAR(100) NOT NULL,
  valores_pro TEXT NOT NULL,
  empleados_pro TEXT NOT NULL,
  equipo_pro TEXT NOT NULL,
  insumos_pro TEXT NOT NULL,
  rendimiento_pro TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE hojapedido (
  id_hoja INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_pro TEXT NOT NULL,
  hojapedido_hoja TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE actividades (
  id_act INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_pro TEXT NOT NULL,
  actividades_act TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE notas(
  id_nota INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  descripcion_nota TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE registros_eliminados(
  id_reel INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  detalle_reel TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE firmas(
  id_fir INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  foto_fir TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE depreciacion(
  id_dep INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  descripcion TEXT NOT NULL,
  fecha_compra varchar(10),
  valor_inicial varchar(20),
  valor_anual varchar(20),
  id_cuentas INT,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE cuentas(
  id_cuentas INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  descripcion INT NOT NULL,
  porcentaje varchar(20) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE cuentas_contables_libro(
  id_cuentas INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  numero varchar(20) NOT NULL,
  descripcion TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE cuentas_contables_libro(
  id_maximum_libro INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cuenta_libro text NOT NULL,
  tipo_comprobante varchar(20) NOT NULL,
  detalle text NOT NULL,
  asiento varchar(10) NOT NULL,
  fecha_emision text NOT NULL,
  num_factura text NOT NULL,
  valor text NOT NULL,
  codigo text NOT NULL,
  aprcial text NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE cuentas_contables_libro_prueba(
  id_libro INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tipo_comprobante varchar(20) NOT NULL,
  num_factura text NOT NULL,
  factura: TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE cuentas_contables_libro(
  id_maximum_libro INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cuenta_libro text NOT NULL,
  tipo_comprobante varchar(20) NOT NULL,
  detalle text NOT NULL,
  asiento varchar(10) NOT NULL,
  fecha_emision text NOT NULL,
  num_factura text NOT NULL,
  valor text NOT NULL,
  codigo text NOT NULL,
  aprcial text NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



CREATE TABLE facturam_libro(
  id_factura_libro INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cuenta_principal TEXT NOT NULL,
  valor_cuenta TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE movimiento(
  id_movimiento INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_asiento TEXT NOT NULL,
  id_cuenta TEXT NOT NULL,
  monto TEXT NOT NULL,
  tipo+movimiento TEXT NOT NULL,
  detalle TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE movimiento(
  id_movimiento INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_asiento TEXT NOT NULL,
  id_cuenta TEXT NOT NULL,
  monto TEXT NOT NULL,
  tipo+movimiento TEXT NOT NULL,
  detalle TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE cuentas_principales(
  id_cuenta_principal INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  numero TEXT NOT NULL,
  descripcion TEXT NOT NULL,
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE proyeccion_actividades_pro(
  id_actividad_pro INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_proyecto TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  imgAntes TEXT,
  imgDurante TEXT,
  imgDespues TEXT
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- consults para sacar el vslor de la lectura, corte y reconeccion por medidor....
-- -- **************  LECTURAS  ****************
-- cambir por la fecha en la que se va a realizar la consulta
-- SELECT fechalecant_lec, lecturaant_lec, fechalecact_lec, lecturaact_lec, codigo_med, estado_ins,
-- nombres_cli, apellidos_cli, ciruc_cli, direccion_cli, email_cli, telefono_cli
-- FROM lecturas lec, medidor med, instalacion ins, clientes cli
-- where med.id_med = lec.id_med 
-- and med.estado_med = 'ACTIVO'
-- and med.codigo_med = '1751803162' 
-- and ins.id_ins = med.id_ins
-- and ins.id_cli = cli.id_cli
-- and fechalecant_lec BETWEEN '2021-05-01 00:00:00' AND '2021-05-31 00:00:00'

-- -- **************  CORTES  ****************
-- SELECT fecha_cor, lectura_cor, codigo_med, estado_ins, nombres_cli, apellidos_cli, ciruc_cli, 
-- direccion_cli, email_cli, telefono_cli FROM cortes cor, medidor med, instalacion ins, clientes cli 
-- where med.id_med = cor.id_med 
-- and med.estado_med = 'ACTIVO'
-- and med.codigo_med = 'C17RA032245' 
-- and ins.id_ins = med.id_ins 
-- and ins.id_cli = cli.id_cli 
-- and fecha_cor BETWEEN '2021-05-01 00:00:00' AND '2021-05-31 00:00:00'

-- -- **************  RECONEXION  ****************
-- SELECT fecha_reco, lectura_reco, codigo_med, estado_ins, nombres_cli, apellidos_cli, ciruc_cli, direccion_cli, email_cli, telefono_cli 
-- FROM reconexiones reco, medidor med, instalacion ins, clientes cli 
-- where med.id_med = reco.id_med
-- and med.estado_med = 'ACTIVO'
-- and med.codigo_med = 'C17RA032245' 
-- and ins.id_ins = med.id_ins 
-- and ins.id_cli = cli.id_cli
-- and fecha_reco BETWEEN '2021-05-01 00:00:00' AND '2021-05-31 00:00:00'

-- **************  INSERT  ****************
