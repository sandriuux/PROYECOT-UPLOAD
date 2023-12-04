let David = {
    nombre: 'David Choak',
    tipo: 'vivo',
    ubicacion: 'Desconocido',
    culpabilidad: 'delincuente',
    urlImagen: "https://www.postavy.cz/foto/david-choak-foto.jpg "
  };
  
  let sujetos = JSON.parse(localStorage.getItem('sujetos')) || [David];
  
  function Lista() {
    let listaSujetos = document.getElementById('listaSujetos');
    listaSujetos.innerHTML = '';
  
    sujetos.forEach((sujeto, indice) => {
      let tarjeta = document.createElement('div');
      tarjeta.classList.add('tarjetaSujeto');
      tarjeta.style.border = sujeto.tipo === 'descargado' ? '2px solid green' : '2px solid red';
  
      let imagen = document.createElement('img');
      imagen.onerror = () => {
        imagen.src = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.es%2Ficono-gratis%2Fanonimo_634741&psig=AOvVaw0OCGTmMh0N3BuRkCU1gKNj&ust=1701455048911000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOjsuams7IIDFQAAAAAdAAAAABAE';
      };
      imagen.src = sujeto.urlImagen;
      tarjeta.appendChild(imagen);
  
      let nombre = document.createElement('p');
      nombre.style.color = getColorByGuilt(sujeto.culpabilidad);
      nombre.textContent = sujeto.nombre;
      tarjeta.appendChild(nombre);
  
      tarjeta.onclick = () => mostrarFormulario(indice);
  
      listaSujetos.appendChild(tarjeta);
    });
  }
  
  document.getElementById('tipo').addEventListener('change', function () {
    let descargadoDesdeInput = document.getElementById('descargadoDesde');
  
    if (this.value === 'descargado') {
      descargadoDesdeInput.required = true;
    } else {
      descargadoDesdeInput.required = false;
    }
  });
  
  function mostrarFormulario(indice = null) {
    let contenedorFormulario = document.getElementById('formulario');
    let formularioVisible = contenedorFormulario.style.display === 'block';
    let listaSujetos = document.getElementById('listaSujetos');
  
    if (formularioVisible) {
      contenedorFormulario.style.display = 'none';
      listaSujetos.style.display = 'grid';
    } else {
      contenedorFormulario.style.display = 'block';
      listaSujetos.style.display = 'none';
    }
  
    let formulario = contenedorFormulario.querySelector('form');
    formulario.reset();
  
    if (indice !== null) {
      CamposFormulario(formulario, sujetos[indice]);
    }
  
    formulario.onsubmit = (evento) => guardarSujeto(evento, indice);
  }
  
  function CamposFormulario(formulario, sujeto) {
    for (let campo in sujeto) {
      let input = formulario.querySelector(`#${campo}`);
      if (input) {
        input.value = sujeto[campo] || '';
      }
    }
  }
  
  function Fondo() {
    let aplicacion = document.getElementById('aplicacion');
    let body = document.body;
  
    if (aplicacion.style.display === 'none' || aplicacion.style.display === '') {
      aplicacion.style.display = 'block';
      body.style.background = '';
    } else {
      aplicacion.style.display = 'none';
  
      // Obtén la URL del input o establece una URL por defecto
      let urlImagen = document.getElementById('urlImagen').value || 'fondo.jpg';
  
      // Agrega un parámetro de tiempo único para evitar la caché
      let urlConParametro = `${urlImagen}?t=${new Date().getTime()}`;
  
      body.style.background = `url("${urlConParametro}")`;
      body.style.backgroundSize = 'cover';
    }
  }
  
  function guardarSujeto(evento, indice = null) {
    evento.preventDefault();
    let formulario = evento.target;
  
    let nuevoSujeto = {};
    for (let campo of ['nombre', 'tipo', 'ubicacion', 'descargadoDesde', 'culpabilidad', 'urlImagen', 'comentarios']) {
      nuevoSujeto[campo] = formulario.querySelector(`#${campo}`).value;
    }
  
    if (!nuevoSujeto.nombre || !nuevoSujeto.tipo || !nuevoSujeto.ubicacion || !nuevoSujeto.culpabilidad) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
  
    let confirmacion = window.confirm('¿Estás seguro de que deseas guardar este sujeto?');
  
    if (confirmacion) {
      if (indice !== null) {
        sujetos[indice] = nuevoSujeto;
      } else {
        sujetos.push(nuevoSujeto);
      }
  
      formulario.reset();
      Lista();
  
      let contenedorFormulario = document.getElementById('formulario');
      let listaSujetos = document.getElementById('listaSujetos');
  
      contenedorFormulario.style.display = 'none';
      listaSujetos.style.display = 'grid';
  
      localStorage.setItem('sujetos', JSON.stringify(sujetos));
    }
  }
  
  function getColorByGuilt(culpabilidad) {
    return culpabilidad === 'posible cooperador' ? 'green' : culpabilidad === 'cooperador' ? 'orange' : 'red';
  }
  
  Lista();
  