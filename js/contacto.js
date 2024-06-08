//Api de google maps
function iniciarMap() {
  var coord = { lat: -54.8019121, lng: -68.3029511 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}

//Validacion del formulario
function validacion() {
  //valor = document.getElementById("nombre_apellido").value;
  if (document.myForm.nombre_apellido.value == null || document.myForm.nombre_apellido.value.length == 0 || /^\s+$/.test(document.myForm.nombre_apellido.value)) {
    alert("Debe ingresar nombre y apellido");
    document.myForm.nombre_apellido.focus();
    return false;
  }
  if (document.myForm.cel.value == "" || isNaN(document.myForm.cel.value)) {
    alert("Por favor ingrese su telefono");
    document.myForm.cel.focus();
    return false;
  }
  if (document.myForm.provincia.value == "Provincia") {
    alert("Debe seleccionar una provincia");
    document.myForm.provincia.focus();
    return false;
  }
  if (document.myForm.comentario.value == "") {
    alert("Debe dejar un comentario");
    document.myForm.comentario.focus();
    return false;
  }
  return true;
}

//Envio de formulario API de formspree.io
const $form = document.querySelector('#myForm')

$form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
  event.preventDefault()
  const form = new FormData(this)
  const response = await fetch(this.action, {
    method: this.method,
    body: form,
    headers: {
      'Accept': 'application/json'
    }
  })
  if (response.ok) {
    this.reset()
    alert('Su mensaje ha sido enviado con éxito, espere devolución')
  }
}

let original = document.querySelector("#Plantilla");
let contenedor = document.querySelector("#Contenedor");

let referencia = original.cloneNode(true);

original.remove();

function IniciarWeather(city) {
  const apiKey = '64c9d663c43f4f72b5d143116240806'; // Reemplaza con tu propia API key de WeatherAPI
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=es`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // Procesamiento de la información que llega de la API
      const temperatura = data.current.temp_c;
      const viento = data.current.wind_kph;
      const descripcion = data.current.condition.text;
      const icono = data.current.condition.icon; // URL del ícono del clima

      //console.log(`Ciudad: ${city}, Temperatura: ${temperatura}°C, Viento: ${viento} km/h, Descripción: ${descripcion}`);

      let nuevoClima = referencia.cloneNode(true);

      nuevoClima.querySelector("img").src = icono; // Asigna la URL del ícono
      nuevoClima.querySelector("img").alt = descripcion; // Usa la descripción como texto alternativo
      nuevoClima.querySelector("p").innerHTML = `${city}, Temp: ${temperatura}°C, Viento: ${viento} km/h`;

      contenedor.appendChild(nuevoClima);
    })
    .catch(error => console.log("Ocurrió un error! " + error));
}
