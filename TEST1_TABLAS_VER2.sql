
CREATE DATABASE IF NOT EXISTS ERPBUSINESS;
USE ERPBUSINESS;

-- Crear tabla de Alumnos
CREATE TABLE IF NOT EXISTS USUARIOS (
    ID_USR VARCHAR(100) PRIMARY KEY,  
    ROLE VARCHAR(1),
    PASS VARCHAR(100)

);

CREATE TABLE IF NOT EXISTS USUARIOS_DETAIL (
    ID_USR VARCHAR(10) PRIMARY KEY,
    NOMBRE VARCHAR(100),
    APELLIDO_M VARCHAR(100),
    APELLIDO_P VARCHAR(100),
    FECHA_NAC DATE,
    EMAIL VARCHAR(100) UNIQUE,
    TELEFONO VARCHAR(10) UNIQUE
);

CREATE TABLE IF NOT EXISTS PRODUCTOS(
    ID_PROD VARCHAR(20) PRIMARY KEY,
    NOMBRE VARCHAR(100),
    MARCA VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS PRECIOS(
    ID_PROD VARCHAR(20) PRIMARY KEY,
    PRECIO INT
);

CREATE TABLE IF NOT EXISTS VENTAS(
    ID_PROD VARCHAR(20),
    FECHA DATE,
    PRECIO INT
);

CREATE TABLE IF NOT EXISTS CUENTAS_T(
    NOMBRE VARCHAR(100),
    NATURALEZA VARCHAR(100)
)

