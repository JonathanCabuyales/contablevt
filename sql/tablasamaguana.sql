CREATE TABLE inventarioamaguana(
  id_inv INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  costototal_inv FLOAT NOT NULL,
  costouni_inv FLOAT NOT NULL,
  cantidad_inv INT NOT NULL,
  descripcion_inv TEXT,
  fotouno_inv TEXT,
  fotodos_inv TEXT,
  fototres_inv TEXT,
  latitud VARCHAR(50),
  longitud VARCHAR(50),
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE activosfijos(
  id_acf INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  descripcion_acf TEXT,
  tipobien_acf VARCHAR(200),
  unidadmedida_acf VARCHAR(50),
  marca_acf VARCHAR(50),
  modelo_acf VARCHAR(50),
  serie_acf VARCHAR(200),
  estado_acf VARCHAR(50),
  cantidadmano_acf INT,
  costounitario_acf FLOAT,
  costototal_acf FLOAT,
  foto TEXT,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE sujetodecontrol(
  id_suc INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  descripcion_suc TEXT,
  tipobien_suc VARCHAR(200),
  unidadmedida_suc VARCHAR(50),
  marca_suc VARCHAR(50),
  modelo_suc VARCHAR(50),
  serie_suc VARCHAR(200),
  estado_suc VARCHAR(50),
  cantidadmano_suc INT,
  costounitario_suc FLOAT,
  costototal_suc FLOAT,
  foto TEXT,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE suministros(
  id_sum INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  descripcion_sum TEXT,
  tipobien_sum VARCHAR(200),
  unidadmedida_sum VARCHAR(50),
  marca_sum VARCHAR(50),
  modelo_sum VARCHAR(50),
  serie_sum VARCHAR(200),
  estado_sum VARCHAR(50),
  cantidadmano_sum INT,
  costounitario_sum FLOAT,
  costototal_sum FLOAT,
  foto TEXT,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;