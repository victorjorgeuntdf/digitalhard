let url = 'http://localhost:5000/api/productos/get_all';
fetch(url)
    .then(response => response.json())
    .then(data => mostrar_datos(data))
    .catch(error => console.log(error));

const mostrar_datos = (data) => {
    console.log(data);
    let body = '';
    for (let i = 0; i < data.length; i++) {
        body += `<tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].nombre}</td>
                    <td>${data[i].descripcion}</td>
                    <td>${data[i].categoria}</td>
                    <td>${data[i].precio}</td>
                    <td>${data[i].cantidad_disponible}</td>
                    <td>${data[i].marca}</td>
                    <td>${data[i].modelo}</td>
                    <td>${data[i].fecha_creacion}</td>
                    <td>${data[i].fecha_actualizacion}</td>
                    <td>
                        <button class="boton-editar" data-id="${data[i].id}">Editar</button>
                        <button class="boton-eliminar" data-id="${data[i].id}">Eliminar</button>
                    </td>
                 </tr>`;
    }
    document.getElementById('data').innerHTML = body;

    // Agregar eventos de clic a todos los botones de editar
    document.querySelectorAll('.boton-editar').forEach(button => {
        button.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            window.location.href = `editar_productos.html?id_producto=${id}`; // Redirigir a la página de edición con el ID del producto
        });
    });

    // Agregar eventos de clic a todos los botones de eliminar
    document.querySelectorAll('.boton-eliminar').forEach(button => {
        button.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            eliminarProducto(id, this);
        });
    });
}

// Función para eliminar un producto
function eliminarProducto(id, button) {
    // Mostrar alerta de confirmación antes de eliminar
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:5000/api/productos/delete/${id}`, {
                method: 'DELETE'
            }).then(response => {
                if (response.ok) {
                    // Eliminar la fila de la tabla
                    button.closest('tr').remove();
                    Swal.fire(
                        '¡Eliminado!',
                        'El producto ha sido eliminado.',
                        'success'
                    );
                } else {
                    Swal.fire(
                        'Error',
                        'Error al eliminar el producto',
                        'error'
                    );
                }
            }).catch(error => {
                console.error('Error:', error);
                Swal.fire(
                    'Error',
                    'Ocurrió un error durante la eliminación',
                    'error'
                );
            });
        }
    });
}
