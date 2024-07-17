document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ID del producto a editar desde la URL o localStorage
    let params = new URLSearchParams(document.location.search);
    let id_producto = params.get("id_producto"); // Obtener el ID del producto de la URL

    // Si usas localStorage para almacenar el ID del producto, sería algo como:
    //let id_producto = localStorage.getItem('producto_id');

    if (id_producto) {
        // Realizar una solicitud para obtener los detalles del producto por su ID
        let url = `http://localhost:5000/api/productos/get/${id_producto}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Llenar los campos del formulario con los datos del producto
                document.querySelector("#nombre").value = data.nombre;
                document.querySelector("#descripcion").value = data.descripcion;
                document.querySelector("#categoria").value = data.categoria;
                document.querySelector("#precio").value = data.precio;
                document.querySelector("#cantidad_disponible").value = data.cantidad_disponible;
                document.querySelector("#marca").value = data.marca;
                document.querySelector("#modelo").value = data.modelo;
            })
            .catch(error => console.error('Error al obtener los detalles del producto:', error));
    }

    // Manejar el envío del formulario para la actualización del producto
    let formulario = document.querySelector("#Formulario");
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        actualizarProducto(id_producto);
    });
});

// Función para actualizar el producto
function actualizarProducto(id_producto) {
    let nombre = document.querySelector("#nombre").value;
    let descripcion = document.querySelector("#descripcion").value;
    let categoria = document.querySelector("#categoria").value;
    let precio = document.querySelector("#precio").value;
    let cantidad_disponible = document.querySelector("#cantidad_disponible").value;
    let marca = document.querySelector("#marca").value;
    let modelo = document.querySelector("#modelo").value;

    let data = {
        id: id_producto,
        nombre: nombre,
        descripcion: descripcion,
        categoria: categoria,
        precio: precio,
        cantidad_disponible: cantidad_disponible,
        marca: marca,
        modelo: modelo,
    };

    // Realizar la solicitud de actualización del producto
    let url = `http://localhost:5000/api/productos/update/${id_producto}`;

    fetchData(
        url,
        "PUT",
        () => {
            window.location.replace("lista_productos.html");
        },
        data
    );
}
