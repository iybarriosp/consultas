import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Establecer conexión con la base de datos
conn = sqlite3.connect('mi_base_de_datos.db')  # Cambia esto a la ruta de tu base de datos

# Consulta para obtener todos los productos
def obtener_todos_los_productos():
    query = "SELECT * FROM Producto"
    productos_df = pd.read_sql_query(query, conn)
    return productos_df

# Consulta para obtener productos disponibles (stock > 0)
def obtener_productos_disponibles():
    query = "SELECT * FROM Producto WHERE Stock > 0"
    productos_disponibles_df = pd.read_sql_query(query, conn)
    return productos_disponibles_df

# Consulta para obtener productos por categoría
def obtener_productos_por_categoria(categoria):
    query = f"""
    SELECT P.Titulo, C.Nombre as Categoria
    FROM Producto P
    JOIN Categoria C ON P.CategoriaID = C.CategoriaID
    WHERE C.Nombre = '{categoria}'
    """
    ropa_deportiva_df = pd.read_sql_query(query, conn)
    return ropa_deportiva_df

# Consulta para obtener productos de una marca específica
def obtener_productos_por_marca(marca):
    query = f"""
    SELECT P.Titulo, M.Nombre as Marca
    FROM Producto P
    JOIN Marca M ON P.MarcaID = M.MarcaID
    WHERE M.Nombre = '{marca}'
    """
    productos_marca_df = pd.read_sql_query(query, conn)
    return productos_marca_df

# Consulta para obtener productos ordenados por precio
def obtener_productos_ordenados_por_precio():
    query = "SELECT * FROM Producto ORDER BY Precio ASC"
    productos_ordenados_df = pd.read_sql_query(query, conn)
    return productos_ordenados_df

# Ejemplo de uso de las funciones
if __name__ == "__main__":
    print("Todos los productos:")
    df_producto = obtener_todos_los_productos()
    print(df_producto)

    print("\nProductos disponibles:")
    print(obtener_productos_disponibles())

    print("\nProductos en categoría 'Ropa Deportiva':")
    print(obtener_productos_por_categoria('Ropa Deportiva'))

    print("\nProductos de marca 'Nike':")
    print(obtener_productos_por_marca('Nike'))

    print("\nProductos ordenados por precio:")
    print(obtener_productos_ordenados_por_precio())

    # Generar gráficas

    # Visualizar la cantidad de productos por categoría
    categoria_counts = df_producto['CategoriaID'].value_counts()

    # Graficar
    plt.figure(figsize=(10, 6))
    categoria_counts.plot(kind='bar', color='skyblue')
    plt.title('Cantidad de Productos por Categoría')
    plt.xlabel('Categoría')
    plt.ylabel('Cantidad de Productos')
    plt.xticks(rotation=45)
    plt.savefig('C:/Users/jefer/Desktop/proyectoIntegrador/cantidad_productos_categoria.png')  # Guarda la gráfica como PNG
    plt.show()

    # Gráfica de Dispersión: visualizar el precio de los productos en función del stock:
    plt.figure(figsize=(10, 6))
    sns.scatterplot(data=df_producto, x='Stock', y='Precio', hue='MarcaID', palette='deep')
    plt.title('Precio vs Stock de Productos')
    plt.xlabel('Stock')
    plt.ylabel('Precio')
    plt.legend(title='Marca')
    plt.savefig('C:/Users/jefer/Desktop/proyectoIntegrador/precio_vs_stock.png')  # Guarda la gráfica como PNG
    plt.show()

    # Gráfica de Torta: ver la proporción de productos por género:
    # Contar productos por género
    genero_counts = df_producto['GeneroID'].value_counts()

    # Graficar
    plt.figure(figsize=(8, 8))
    genero_counts.plot(kind='pie', autopct='%1.1f%%', startangle=90, colors=sns.color_palette('pastel'))
    plt.title('Proporción de Productos por Género')
    plt.ylabel('')
    plt.savefig('C:/Users/jefer/Desktop/proyectoIntegrador/proporcion_productos_genero.png')  # Guarda la gráfica como PNG
    plt.show()

# Cerrar la conexión
conn.close()
