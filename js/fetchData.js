function fetchData(url, method, callback, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };

    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        if (data.message) {  // Asumiendo que el API devuelve un mensaje en caso de éxito
            Swal.fire({
                title: '¡Éxito!',
                text: 'Operación realizada correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                callback(data);
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema con la operación',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch(error => {
        console.error('Ocurrió un error:', error);
        Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error durante la operación',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
}