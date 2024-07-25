---
title: Estructura de Base de Datos
description: Comienza con la compresion de esta parte de la aplicacion, esta documentación te ayudara a generar catalogos a traves de una serie de pasos.
hero:
    tagline: Comienza con la compresión de esta parte de la aplicacion, donde explicaremos el funcionamiento de los componentes para Avaluo.
---

## Diagrama de Base de Datos

![Diagrama Base de Datos](../../../../public/database-diagram.svg)

## Código de SQL

A continuación podras apreciar la estructura de la `BD` que almacena los registros de cada avaluo.



```sql
//consulta.sql
CREATE TABLE AvalCombustible (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(255) NOT NULL,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE()
);

INSERT INTO AvalCombustible (nombre, IdUsuarioAlta) VALUES ('Gasolina', 1), ('Diesel', 1), ('Electrico', 1);

CREATE TABLE AvalInteriorVehiculo (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(255) NOT NULL,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE()
);

INSERT INTO AvalInteriorVehiculo (nombre, IdUsuarioAlta) VALUES ('Piel', 1), ('Tela', 1);

CREATE TABLE AvalClasificacionAfectacionVehiculo (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(255) NOT NULL,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE()
);

INSERT INTO AvalClasificacionAfectacionVehiculo (nombre, IdUsuarioAlta) VALUES ('GOLPE', 1), ('RAYADURA', 1), ('RAYADURAS_GRAVES', 1);

CREATE TABLE AvalClasificacionUbicacionLlanta (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(255) NOT NULL,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE()
);

INSERT INTO AvalClasificacionUbicacionLlanta (nombre, IdUsuarioAlta) VALUES ('DELANTERA_IZQUIERDA', 1), ('DELANTERA_DERECHA', 1), ('TRASERA_IZQUIERDA', 1), ('TRASERA_DERECHA', 1);

CREATE TABLE AvalClasificacionCondicionVehiculo (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(255) NOT NULL,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE()
);

INSERT INTO AvalClasificacionCondicionVehiculo (nombre, IdUsuarioAlta) VALUES ('BUENA', 1), ('REGULAR', 1), ('MALA', 1), ('NO_ASIGNADA', 1);

CREATE TABLE AvalClasificacionGuiaPrecio (
    id INT PRIMARY KEY IDENTITY (1,1),
    nombre NVARCHAR (255) NOT NULL,
    url NVARCHAR(MAX),
    principalClass NVARCHAR(MAX),
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE()
);

CREATE TABLE AvalClasificacionClass (

    id INT PRIMARY KEY IDENTITY(1,1),
    IdAvalClasificacionGuiaPrecio INT NOT NULL,
    classQuery NVARCHAR(MAX) NOT NULL,
    AtributoNombre NVARCHAR(255) NOT NULL,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IdAvalClasificacionGuiaPrecio) REFERENCES AvalClasificacionGuiaPrecio(id)
);

INSERT INTO AvalClasificacionGuiaPrecio (nombre, IdUsuarioAlta) VALUES ('GUIA AUTOMETRICA', 1), ('MERCADOLIBRE', 1), ('KAVAK',1);

CREATE TABLE AvalInspeccion (
    id INT PRIMARY KEY IDENTITY(1,1),
    IdVendedor INT NOT NULL,
    IdValuador INT NOT NULL,
    IdCliente INT NOT NULL,
    creditoCurso BIT DEFAULT 0,
    financiera NVARCHAR(255),
    precioSolicitado FLOAT,
    precioTotal FLOAT,
    valuacion FLOAT,
    valorAvaluo FLOAT,
    precioAcordado FLOAT,
    compraAutometrica FLOAT,
    ventaAutometrica  FLOAT,
    autorizoPrecioDeCompraCliente BIT DEFAULT 0,
    autorizoGerente BIT DEFAULT 0,
    IdGerente INT,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE()
);

-- Índices recomendados
CREATE INDEX IX_AvalInspeccion_IdVendedor ON AvalInspeccion(IdVendedor);
CREATE INDEX IX_AvalInspeccion_IdValuador ON AvalInspeccion(IdValuador);
CREATE INDEX IX_AvalInspeccion_IdCliente ON AvalInspeccion(IdCliente);
CREATE INDEX IX_AvalInspeccion_Estatus ON AvalInspeccion(estatus);

CREATE TABLE AvalGuiaPrecio (
    Id INT PRIMARY KEY IDENTITY (1,1),
    IdInspeccion INT NOT NULL,
    IdClasificacionGuiaPrecio INT NOT NULL,
    Precio DECIMAL(18, 2) NOT NULL,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IdInspeccion) REFERENCES AvalInspeccion(id),
    FOREIGN KEY (IdClasificacionGuiaPrecio) REFERENCES AvalClasificacionGuiaPrecio(id)
);


CREATE TABLE AvalImageInspeccion (
    id Int PRIMARY KEY IDENTITY(1,1),
    IdAvalInspeccion INT NOT NULL,

    image VARBINARY(MAX),

    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (IdAvalInspeccion) REFERENCES AvalInspeccion(id)

);
-- Índice recomendado
CREATE INDEX IX_AvalImagesAvalInspeccion_IdAvalInspeccion ON AvalImageInspeccion(IdAvalInspeccion);
CREATE INDEX IX_AvalImagesAvalInspeccion_Estatus ON AvalImageInspeccion(estatus);


CREATE TABLE AvalClasificacionFirmas (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(255),
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE()
);
-- Índices recomendados para AvalClasificacionFirmas
CREATE INDEX IX_AvalClasificacionFirmas_IdUsuarioAlta ON AvalClasificacionFirmas(IdUsuarioAlta);
CREATE INDEX IX_AvalClasificacionFirmas_Estatus ON AvalClasificacionFirmas(estatus);


CREATE TABLE AvalFirmaUsuario (
    id INT PRIMARY KEY IDENTITY(1,1),
    IdAvalInspeccion INT NOT NULL,
    IdAvalClasificacionFirmas INT NOT NULL,
    firmaUsuario VARBINARY(MAX),

    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (IdAvalInspeccion) REFERENCES AvalInspeccion(id),
    FOREIGN KEY (IdAvalClasificacionFirmas) REFERENCES AvalClasificacionFirmas(id)
);
-- Índices recomendados
CREATE INDEX IX_AvalFirmaUsuario_IdAvalInspeccion ON AvalFirmaUsuario(IdAvalInspeccion);
CREATE INDEX IX_AvalFirmaUsuario_IdAvalClasificacionFirmas ON AvalFirmaUsuario(IdAvalClasificacionFirmas);
CREATE INDEX IX_AvalFirmaUsuario_Estatus ON AvalFirmaUsuario(estatus);



CREATE TABLE AvalVehiculo (
    id INT PRIMARY KEY IDENTITY(1,1),
    IdAvalInspeccion INT UNIQUE,
    IdMarca INT NOT NULL,
    IdLinea INT NOT NULL,
    IdVersion INT NOT NULL,
    color NVARCHAR(255),
    motor NVARCHAR(255),
    serie NVARCHAR(255),
    anioModelo NVARCHAR(255),
    placas NVARCHAR(255),
    kilometraje NVARCHAR(255),
    engomadoVerificacion NVARCHAR(255),
    periodo NVARCHAR(255),
    IdAvalInteriorVehiculo INT NOT NULL,
    IdCombustible INT NOT NULL,
    totalLlaves INT,
    totalControl INT,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IdAvalInspeccion) REFERENCES AvalInspeccion(id),
    FOREIGN KEY (IdAvalInteriorVehiculo) REFERENCES AvalInteriorVehiculo(id),
    FOREIGN KEY (IdCombustible) REFERENCES AvalCombustible(id)
);
-- Índices recomendados
CREATE INDEX IX_AvalVehiculo_IdAvalInspeccion ON AvalVehiculo(IdAvalInspeccion);
CREATE INDEX IX_AvalVehiculo_IdMarca ON AvalVehiculo(IdMarca);
CREATE INDEX IX_AvalVehiculo_IdLinea ON AvalVehiculo(IdLinea);
CREATE INDEX IX_AvalVehiculo_IdVersion ON AvalVehiculo(IdVersion);
CREATE INDEX IX_AvalVehiculo_Estatus ON AvalVehiculo(estatus);


CREATE TABLE AvalLlantasVehiculo (
    id INT PRIMARY KEY IDENTITY(1,1),
    IdAvalVehiculo INT NOT NULL,
    IdAvalClasificacionUbicacionLlanta INT NOT NULL,
    vida INT,
    marca NVARCHAR(255),
    medida NVARCHAR(255),
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IdAvalVehiculo) REFERENCES AvalVehiculo(id),
    FOREIGN KEY (IdAvalClasificacionUbicacionLlanta) REFERENCES AvalClasificacionUbicacionLlanta(id)
);
-- Índices recomendados para AvalLlantasVehiculo
CREATE INDEX IX_AvalLlantasVehiculo_IdVehiculo ON AvalLlantasVehiculo(IdAvalVehiculo);
CREATE INDEX IX_AvalLlantasVehiculo_IdAvalClasificacionUbicacionLlanta ON AvalLlantasVehiculo(IdAvalClasificacionUbicacionLlanta);
CREATE INDEX IX_AvalLlantasVehiculo_Estatus ON AvalLlantasVehiculo(estatus);

CREATE TABLE AvalCheckListCatalogo (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(255) NOT NULL,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE()
);
-- Índices recomendados para CheckListCatalogo
CREATE INDEX IX_AvalCheckListCatalogo_Nombre ON AvalCheckListCatalogo(nombre);
CREATE INDEX IX_AvalCheckListCatalogo_Estatus ON AvalCheckListCatalogo(estatus);

CREATE TABLE AvalCheckListItem (
    id INT PRIMARY KEY IDENTITY(1,1),
    IdAvalInspeccion INT NOT NULL,
    IdAvalCheckListCatalogo INT NOT NULL,
    estado BIT DEFAULT 0,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IdAvalInspeccion) REFERENCES AvalInspeccion(id),
    FOREIGN KEY (IdAvalCheckListCatalogo) REFERENCES AvalCheckListCatalogo(id)
);
-- Índices recomendados para AvalCheckListItem
CREATE INDEX IX_AvalCheckListItem_IdAvalInspeccion ON AvalCheckListItem(IdAvalInspeccion);
CREATE INDEX IX_AvalCheckListItem_IdAvalCheckListCatalogo ON AvalCheckListItem(IdAvalCheckListCatalogo);
CREATE INDEX IX_AvalCheckListItem_Estado ON AvalCheckListItem(estado);
CREATE INDEX IX_AvalCheckListItem_Estatus ON AvalCheckListItem(estatus);


CREATE TABLE AvalCoordenadas (
    id INT PRIMARY KEY IDENTITY(1,1),
    IdAvalInspeccion INT NOT NULL,
    X FLOAT NOT NULL,
    Y FLOAT NOT NULL,
    IdAvalClasificacionAfectacionVehiculo INT NOT NULL,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IdAvalInspeccion) REFERENCES AvalInspeccion(id),
    FOREIGN KEY (IdAvalClasificacionAfectacionVehiculo) REFERENCES AvalClasificacionAfectacionVehiculo(id)
);
-- Índices recomendados para AvalCoordenadas
CREATE INDEX IX_AvalCoordenadas_IdAvalInspeccion ON AvalCoordenadas(IdAvalInspeccion);
CREATE INDEX IX_AvalCoordenadas_IdAvalClasificacionAfectacionVehiculo ON AvalCoordenadas(IdAvalClasificacionAfectacionVehiculo);
CREATE INDEX IX_AvalCoordenadas_Estatus ON AvalCoordenadas(estatus);


CREATE TABLE AvalAreaVehiculo (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(255) NOT NULL,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE()
);
-- Índices recomendados para AvalAreaVehiculo
CREATE INDEX IX_AvalAreaVehiculo_Nombre ON AvalAreaVehiculo(nombre);
CREATE INDEX IX_AvalAreaVehiculo_Estatus ON AvalAreaVehiculo(estatus);

CREATE TABLE AvalElementoVehiculo (
    id INT PRIMARY KEY IDENTITY(1,1),
    IdAvalAreaVehiculo INT NOT NULL,
    nombre NVARCHAR(255) NOT NULL,
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IdAvalAreaVehiculo) REFERENCES AvalAreaVehiculo(id)
);
-- Índices recomendados para AvalElementoVehiculo
CREATE INDEX IX_AvalElementoVehiculo_IdAvalAreaVehiculo ON AvalElementoVehiculo(IdAvalAreaVehiculo);
CREATE INDEX IX_AvalElementoVehiculo_Estatus ON AvalElementoVehiculo(estatus);


CREATE TABLE AvalCondicionVehiculo (
    id INT PRIMARY KEY IDENTITY(1,1),
    IdAvalInspeccion INT UNIQUE NOT NULL,
    IdPresentacionGeneral INT NOT NULL DEFAULT 1,
    IdEstadoMecanicoGeneral INT NOT NULL DEFAULT 1,
    pruebaEfectuada BIT DEFAULT 0,
    totalAcond FLOAT NOT NULL,
    observaciones NVARCHAR(255),
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IdAvalInspeccion) REFERENCES AvalInspeccion(id),
    FOREIGN KEY (IdPresentacionGeneral) REFERENCES AvalClasificacionCondicionVehiculo(id),
    FOREIGN KEY (IdEstadoMecanicoGeneral) REFERENCES AvalClasificacionCondicionVehiculo(id)
);
-- Índices recomendados
CREATE INDEX IX_AvalCondicionVehiculo_IdAvalInspeccion ON AvalCondicionVehiculo(IdAvalInspeccion);
CREATE INDEX IX_AvalCondicionVehiculo_IdPresentacionGeneral ON AvalCondicionVehiculo(IdPresentacionGeneral);
CREATE INDEX IX_AvalCondicionVehiculo_IdEstadoMecanicoGeneral ON AvalCondicionVehiculo(IdEstadoMecanicoGeneral);
CREATE INDEX IX_AvalCondicionVehiculo_Estatus ON AvalCondicionVehiculo(estatus);

CREATE TABLE AvalCondicionElementoVehiculo (
    id INT PRIMARY KEY IDENTITY(1,1),
    IdAvalInspeccion INT NOT NULL,
    IdAvalElementoVehiculo INT NOT NULL,
    IdAvalClasificacionCondicionVehiculo INT NOT NULL DEFAULT 1,
    costoAcond FLOAT DEFAULT 0,
    descripcion NVARCHAR(255),
    estatus BIT DEFAULT 1,
    IdUsuarioAlta INT NOT NULL,
    IdUsuarioBaja INT,
    IdUsuarioModifico INT,
    FechaAlta DATETIME DEFAULT GETDATE(),
    FechaBaja DATETIME,
    FechaUltModif DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IdAvalInspeccion) REFERENCES AvalInspeccion(id),
    FOREIGN KEY (IdAvalElementoVehiculo) REFERENCES AvalElementoVehiculo(id),
    FOREIGN KEY (IdAvalClasificacionCondicionVehiculo) REFERENCES AvalClasificacionCondicionVehiculo(id)
);
-- Índices recomendados
CREATE INDEX IX_AvalCondicionElementoVehiculo_IdAvalInspeccion ON AvalCondicionElementoVehiculo(IdAvalInspeccion);
CREATE INDEX IX_AvalCondicionElementoVehiculo_IdElementoVehiculo ON AvalCondicionElementoVehiculo(IdAvalElementoVehiculo);
CREATE INDEX IX_AvalCondicionElementoVehiculo_Estatus ON AvalCondicionElementoVehiculo(estatus);


--Datos de Insercion a modo de Ejemplo
INSERT INTO AvalAreaVehiculo (nombre, IdUsuarioAlta)
VALUES ('Pintura', 1),          -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       ('Motor', 1),            -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       ('Transmision', 1);      -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
-- Elementos para el área de Pintura (AreaVehiculo.id = 1)
INSERT INTO AvalElementoVehiculo (IdAvalAreaVehiculo, nombre, IdUsuarioAlta)
VALUES (1, 'Puerta Delantera Izquierda', 1),    -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       (1, 'Puerta Delantera Derecha', 1),      -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       (1, 'Capo', 1);                         -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción

-- Elementos para el área de Motor (AreaVehiculo.id = 2)
INSERT INTO AvalElementoVehiculo (IdAvalAreaVehiculo, nombre, IdUsuarioAlta)
VALUES (2, 'Motor Principal', 1),                -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       (2, 'Filtro de Aceite', 1);               -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción

-- Elementos para el área de Transmisión (AreaVehiculo.id = 3)
INSERT INTO AvalElementoVehiculo (IdAvalAreaVehiculo, nombre, IdUsuarioAlta)
VALUES (3, 'Caja de Cambios', 1),                -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       (3, 'Embrague', 1);                       -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
INSERT INTO AvalCheckListCatalogo (nombre, IdUsuarioAlta)
VALUES ('LLANTA REFACCION', 1),      -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       ('SD', 1),                     -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       ('CONTROL Y AUDIFONOS', 1),    -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       ('HERRAMIENTAS', 1),           -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       ('MANIVELA', 1),               -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       ('GATO', 1);                   -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
INSERT INTO AvalClasificacionFirmas (nombre, IdUsuarioAlta)
VALUES ('GERENTE_SEMINUEVOS', 1),  -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       ('GERENTE_NUEVOS', 1),       -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       ('EVALUADOR', 1),            -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
       ('CLIENTE', 1);              -- Cambia el valor de IdUsuarioAlta según el usuario que realiza la inserción
--Datos de Insercion a modo de Ejemplo
```