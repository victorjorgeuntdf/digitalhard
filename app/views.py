from flask import jsonify, request
from app.models import Producto
from datetime import date

def get_all_productos():
    productos = Producto.get_all()
    return jsonify([producto.serialize() for producto in productos])

def get_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto No Encontrado'}), 404
    return jsonify(producto.serialize())

def create_producto():
    data = request.json
    new_producto = Producto(
        nombre=data['nombre'],
        descripcion=data['descripcion'],
        categoria=data['categoria'],
        precio=data['precio'],
        cantidad_disponible=data['cantidad_disponible'],
        marca=data['marca'],
        modelo=data['modelo'],
        activo=True
    )
    new_producto.save()
    return jsonify({'message': 'Producto Creado Exitosamente'}), 201

def update_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto No Encontrado'}), 404
    data = request.json
    producto.id_producto = data['id']
    producto.nombre = data['nombre']
    producto.descripcion = data['descripcion']
    producto.categoria = data['categoria']
    producto.precio = data['precio']
    producto.cantidad_disponible = data['cantidad_disponible']
    producto.marca = data['marca']
    producto.modelo = data['modelo']
    producto.save()
    return jsonify({'message': 'Producto Actualizado Exitosamente'})

def delete_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto No Encontrado'}), 404
    producto.delete()
    return jsonify({'message': 'Producto Eliminado Exitosamente'})

def __update_producto_estado(producto_id, estado):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto No Encontrado'}), 404
    producto.activo = estado
    producto.save()
    return jsonify({'message': 'Producto Actualizado Exitosamente'})

def activate_producto(producto_id):
    return __update_producto_estado(producto_id, True)

def deactivate_producto(producto_id):
    return __update_producto_estado(producto_id, False)
