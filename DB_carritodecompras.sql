DROP TABLE IF EXISTS Categoria;
DROP TABLE IF EXISTS Genero;
DROP TABLE IF EXISTS Marca;
DROP TABLE IF EXISTS TallaRopa;
DROP TABLE IF EXISTS TallaCalzado;
DROP TABLE IF EXISTS Peso;
DROP TABLE IF EXISTS Color;
DROP TABLE IF EXISTS Producto;
DROP TRIGGER IF EXISTS ActualizarDisponibilidad;

-- Crear tablas y el resto del script



-- Crear tablas

CREATE TABLE Categoria (
    CategoriaID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Genero (
    GeneroID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Marca (
    MarcaID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE TallaRopa (
    TallaID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(10) NOT NULL
);

CREATE TABLE TallaCalzado (
    TallaID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(10) NOT NULL
);

CREATE TABLE Peso (
    PesoID INTEGER PRIMARY KEY AUTOINCREMENT,
    Valor REAL NOT NULL,
    Unidad VARCHAR(10) NOT NULL DEFAULT 'kg'
);

CREATE TABLE Color (
    ColorID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Producto (
    ProductoID INTEGER PRIMARY KEY AUTOINCREMENT,
    CategoriaID INTEGER,
    GeneroID INTEGER,
    Titulo VARCHAR(100) NOT NULL,
    MarcaID INTEGER,
    PesoID INTEGER,
    TallaRopaID INTEGER,
    TallaCalzadoID INTEGER,
    ColorID INTEGER,
    Precio REAL NOT NULL,
    Disponibilidad INTEGER NOT NULL,
    Stock INTEGER NOT NULL,
    FOREIGN KEY (CategoriaID) REFERENCES Categoria(CategoriaID),
    FOREIGN KEY (GeneroID) REFERENCES Genero(GeneroID),
    FOREIGN KEY (MarcaID) REFERENCES Marca(MarcaID),
    FOREIGN KEY (PesoID) REFERENCES Peso(PesoID),
    FOREIGN KEY (TallaRopaID) REFERENCES TallaRopa(TallaID),
    FOREIGN KEY (TallaCalzadoID) REFERENCES TallaCalzado(TallaID),
    FOREIGN KEY (ColorID) REFERENCES Color(ColorID)
);

-- Trigger para actualizar la disponibilidad según el stock
CREATE TRIGGER IF NOT EXISTS ActualizarDisponibilidad
AFTER INSERT ON Producto
FOR EACH ROW
BEGIN
    UPDATE Producto
    SET Disponibilidad = CASE
        WHEN Stock > 0 THEN 1
        ELSE 0
    END
    WHERE ProductoID = NEW.ProductoID;
END;

-- Insertar datos en las tablas

INSERT INTO Categoria (Nombre) VALUES 
('Ropa Deportiva'),
('Calzado Deportivo'),
('Equipos de Gimnasio'),
('Accesorios Deportivos');

INSERT INTO Genero (Nombre) VALUES 
('Hombre'),
('Mujer'),
('Unisex');

INSERT INTO Marca (Nombre) VALUES 
('Nike'),
('Adidas'),
('Puma'),
('Reebok'),
('Under Armour'),
('Bowflex'),
('Rogue Fitness'),
('Onnit');

INSERT INTO TallaRopa (Nombre) VALUES 
('S'),
('M'),
('L'),
('XL');

INSERT INTO TallaCalzado (Nombre) VALUES 
('38'),
('39'),
('40'),
('41'),
('42'),
('43'),
('44'),
('45');

INSERT INTO Peso (Valor, Unidad) VALUES 
(1.00, 'kg'),
(2.00, 'kg'),
(5.00, 'kg'),
(10.00, 'kg'),
(15.00, 'kg'),
(20.00, 'kg'),
(25.00, 'kg'),
(30.00, 'kg');

INSERT INTO Color (Nombre) VALUES 
('Negro'),
('Blanco'),
('Rojo'),
('Azul'),
('Verde'),
('Gris'),
('Morado'),
('Amarillo');

INSERT INTO Producto (CategoriaID, GeneroID, Titulo, MarcaID, PesoID, TallaRopaID, TallaCalzadoID, ColorID, Precio, Disponibilidad, Stock) VALUES
-- Ropa Deportiva
(1, 1, 'Camiseta Deportiva Nike', 1, NULL, (SELECT TallaID FROM TallaRopa WHERE Nombre = 'M'), NULL, (SELECT ColorID FROM Color WHERE Nombre = 'Rojo'), 29.99, 1, 15),  
(1, 2, 'Pantalones Cortos Adidas', 2, NULL, (SELECT TallaID FROM TallaRopa WHERE Nombre = 'L'), NULL, (SELECT ColorID FROM Color WHERE Nombre = 'Negro'), 34.99, 1, 0),    
(1, 3, 'Chaqueta Deportiva Puma', 3, NULL, (SELECT TallaID FROM TallaRopa WHERE Nombre = 'XL'), NULL, (SELECT ColorID FROM Color WHERE Nombre = 'Azul'), 59.99, 1, 20),     
(1, 1, 'Sudadera Under Armour', 4, NULL, (SELECT TallaID FROM TallaRopa WHERE Nombre = 'M'), NULL, (SELECT ColorID FROM Color WHERE Nombre = 'Gris'), 49.99, 1, 5),   

-- Calzado Deportivo
(2, 1, 'Zapatillas de Correr Nike', 1, NULL, NULL, (SELECT TallaID FROM TallaCalzado WHERE Nombre = '39'), (SELECT ColorID FROM Color WHERE Nombre = 'Verde'), 89.99, 1, 10),  
(2, 2, 'Botas de Fútbol Adidas', 2, NULL, NULL, (SELECT TallaID FROM TallaCalzado WHERE Nombre = '40'), (SELECT ColorID FROM Color WHERE Nombre = 'Rojo'), 99.99, 1, 0), 
(2, 3, 'Zapatillas de Entrenamiento Reebok', 3, NULL, NULL, (SELECT TallaID FROM TallaCalzado WHERE Nombre = '41'), (SELECT ColorID FROM Color WHERE Nombre = 'Negro'), 79.99, 1, 12),  
(2, 2, 'Sandalias Deportivas Puma', 2, NULL, NULL, (SELECT TallaID FROM TallaCalzado WHERE Nombre = '42'), (SELECT ColorID FROM Color WHERE Nombre = 'Blanco'), 39.99, 1, 15),  

-- Equipos de Gimnasio
(3, 3, 'Pesas de Mano 5 kg', 5, NULL, NULL, NULL, (SELECT ColorID FROM Color WHERE Nombre = 'Gris'), 49.99, 1, 18), 
(3, 3, 'Banco de Entrenamiento', 6, NULL, NULL, NULL, (SELECT ColorID FROM Color WHERE Nombre = 'Negro'), 149.99, 1, 8),       
(3, 3, 'Rueda de Abdominales', 7, NULL, NULL, NULL, (SELECT ColorID FROM Color WHERE Nombre = 'Verde'), 24.99, 1, 50),   

-- Accesorios Deportivos
(4, 3, 'Muñequera de Protección', 1, NULL, NULL, NULL, (SELECT ColorID FROM Color WHERE Nombre = 'Azul'), 14.99, 1, 30),      
(4, 3, 'Soga para Saltar', 2, NULL, NULL, NULL, (SELECT ColorID FROM Color WHERE Nombre = 'Negro'), 12.99, 1, 40),   
(4, 3, 'Tirantes para Levantamiento de Pesas', 5, NULL, NULL, NULL, (SELECT ColorID FROM Color WHERE Nombre = 'Gris'), 19.99, 1, 20),   
(4, 3, 'Botella de Agua', 8, NULL, NULL, NULL, (SELECT ColorID FROM Color WHERE Nombre = 'Amarillo'), 9.99, 1, 100),   
(4, 3, 'Toalla Deportiva', 3, NULL, NULL, NULL, (SELECT ColorID FROM Color WHERE Nombre = 'Amarillo'), 15.99, 1, 25);

-- Consultas de prueba
SELECT * FROM Producto;
