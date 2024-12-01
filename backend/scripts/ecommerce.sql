--Se Modelaran unicamente las tablas necesarias para la ejecucion del desafio

CREATE DATABASE ecommerce;

USE ecommerce;

-- Tabla de categorías
CREATE TABLE Categories (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    productCount INT,
    imgSrc VARCHAR(255)
);

-- Tabla de productos
CREATE TABLE Products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    cost DECIMAL(10, 2),
    currency VARCHAR(10),
    soldCount INT,
    category VARCHAR(100),
    images TEXT,
    relatedProducts TEXT
);

-- Tabla de carritos de usuario
CREATE TABLE UserCart (
    userId INT PRIMARY KEY,
    articles JSON
);
