document.addEventListener("DOMContentLoaded", function () {
  let formulario = document.querySelector("#Formulario");
  let params = new URLSearchParams(document.location.search);
  let id_producto = params.get("id_producto");
  let submitButton = document.querySelector("#Formulario #Crear");

  formulario.addEventListener("submit", (event) => {
      event.preventDefault();
      let nombre = document.querySelector("#Formulario #nombre").value;
      let descripcion = document.querySelector("#Formulario #descripcion").value;
      let categoria = document.querySelector("#Formulario #categoria").value;
      let precio = document.querySelector("#Formulario #precio").value;
      let cantidad_disponible = document.querySelector("#Formulario #cantidad_disponible").value;
      let marca = document.querySelector("#Formulario #marca").value;
      let modelo = document.querySelector("#Formulario #modelo").value;
      let data = {
          nombre: nombre,
          descripcion: descripcion,
          categoria: categoria,
          precio: precio,
          cantidad_disponible: cantidad_disponible,
          marca: marca,
          modelo: modelo,
      };
      console.log(data);
      let url = "http://localhost:5000/api/productos/create/";
      fetchData(
          url,
          "POST",
          () => {
              document.querySelector("#Formulario").reset();
              window.location.replace("lista_productos.html");
          },
          data
      );
  });
});


