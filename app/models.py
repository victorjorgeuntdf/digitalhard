from app.database import get_db

class Producto:
    def __init__(self, id_producto=None, nombre=None, descripcion=None, categoria=None, precio=None, cantidad_disponible=None, fecha_creacion=None, fecha_actualizacion=None, marca=None, modelo=None, activo=None):
        self.id_producto = id_producto
        self.nombre = nombre
        self.descripcion = descripcion
        self.categoria = categoria
        self.precio = precio
        self.cantidad_disponible = cantidad_disponible
        self.fecha_creacion = fecha_creacion
        self.fecha_actualizacion = fecha_actualizacion
        self.marca = marca
        self.modelo = modelo
        self.activo = activo

    @staticmethod
    def __get_productos_by_query(query):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        productos = []
        for row in rows:
            productos.append(
                Producto(
                    id_producto=row[0],
                    nombre=row[1],
                    descripcion=row[2],
                    categoria=row[3],
                    precio=row[4],
                    cantidad_disponible=row[5],
                    fecha_creacion=row[6],
                    fecha_actualizacion=row[7],
                    marca=row[8],
                    modelo=row[9],
                    activo=row[10]
                )
            )
        cursor.close()
        return productos

    @staticmethod
    def get_all():
        return Producto.__get_productos_by_query(
            """
                SELECT * 
                FROM Productos 
                WHERE activo = true
                ORDER BY fecha_creacion DESC
            """
        )

    @staticmethod
    def get_by_id(id_producto):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Productos WHERE id = %s", (id_producto,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Producto(
                id_producto=row[0],
                nombre=row[1],
                descripcion=row[2],
                categoria=row[3],
                precio=row[4],
                cantidad_disponible=row[5],
                fecha_creacion=row[6],
                fecha_actualizacion=row[7],
                marca=row[8],
                modelo=row[9],
                activo=row[10]
            )
        return None
    
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_producto:  # Actualizar Producto existente
            cursor.execute(
                """
                UPDATE Productos
                SET nombre = %s, descripcion = %s, categoria = %s, precio = %s, cantidad_disponible = %s, 
                    fecha_actualizacion = CURRENT_TIMESTAMP, marca = %s, modelo = %s, activo = %s
                WHERE id = %s
                """,
                (self.nombre, self.descripcion, self.categoria, self.precio, self.cantidad_disponible, self.marca, self.modelo, self.activo, self.id_producto)
            )
        else:  # Crear Producto nuevo
            cursor.execute(
                """
                INSERT INTO Productos
                (nombre, descripcion, categoria, precio, cantidad_disponible, fecha_creacion, fecha_actualizacion, marca, modelo, activo)
                VALUES (%s, %s, %s, %s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, %s, %s, True)
                """,
                (self.nombre, self.descripcion, self.categoria, self.precio, self.cantidad_disponible, self.marca, self.modelo)
            )
            self.id_producto = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE Productos SET activo = false WHERE id = %s", (self.id_producto,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id': self.id_producto,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'categoria': self.categoria,
            'precio': self.precio,
            'cantidad_disponible': self.cantidad_disponible,
            'fecha_creacion': self.fecha_creacion.strftime('%Y-%m-%d %H:%M:%S'),
            'fecha_actualizacion': self.fecha_actualizacion.strftime('%Y-%m-%d %H:%M:%S'),
            'marca': self.marca,
            'modelo': self.modelo,
            'activo': self.activo
        }
