let indiceMensaje = 0;
let puntos = 0;
let ronda = 0;
const maxRondas = 10;

const mensajes = [
  "¡Bienvenido al Nivel 3!",
  "en este nivel  veras que son las areas de apoyo en tu vida",
  "Son las dimensiones que te ayudan a crecer y desarrollarte en distintos aspectos: físico, emocional, profesional, espiritual, intelectual, social y financiero.",
  "que deben equilibrarse para lograr un desarrollo integral y el cumplimiento de metas.",
  "ahora que ya sabes eso quiero que identifiques cuales ayudan a conseguir tus metas y cuales no",
];

window.onload = function () {
  const musica = document.getElementById("musica");
  if (musica) {
    musica.volume = 0.3;
    if (sessionStorage.getItem("musicaActiva") === "true") {
      musica.play();
    }
  }

  const btnRegresar = document.getElementById("btnRegresar");
  const pantallaFinal = document.getElementById("pantallaFinal");

  if (btnRegresar) {
    btnRegresar.addEventListener("click", () => {
      pantallaFinal.classList.add("mostrar");
      btnRegresar.style.display = "none";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
  }
};

function advanceMessage() {
  const msg = document.getElementById("message");
  const contenedor = document.querySelector(".character-container");
  const boton = document.getElementById("playButton");

  if (indiceMensaje < mensajes.length) {
    msg.querySelector(".message-text").innerText = mensajes[indiceMensaje];
    indiceMensaje++;
  } else {
    // Después del último mensaje, mostrar botón
    setTimeout(() => {
      contenedor.style.display = "none";
      msg.style.display = "none";
      boton.style.display = "block";
    }, 2000);
  }
}

function iniciarJuego() {
  const boton = document.getElementById("playButton");
  const contenedor = document.querySelector(".character-container");
  const msg = document.getElementById("message");
  const juego = document.getElementById("juego");

  boton.style.display = "none";
  contenedor.style.display = "none";
  msg.style.display = "none";
  juego.style.display = "block";

  // Empezar el juego
  generarCarta();
}

function generarCarta() {
  if (ronda >= maxRondas) {
    terminarJuego();
    return;
  }

  ronda++;
  const container = document.getElementById("cartas-container");

  const areasCorrectas = [
    "leer libros",
    "hacer ejercicio diario",
    "buena alimentación",
    "finalizar estudios",
    "ahorrar dinero",
    "Rodearte de amigos positivos",
    "Tomar cursos en línea",
    "Leer o escuchar contenido motivador"



  ];

  const palabrasIncorrectas = ["BEBER ALCOHOL", "ALEJARSE DE LOS VALORES", "GASTAR TODO EL DINERO", "SALIR DE FIESTA EN EXCESO", "DROGAS", "FALTA DE DISCIPLINA", "DECIR MALAS PALABRAS", "FALTAR A CLASE", "NO ESTUDIAR", "NO HACER EJERCICIO"];

  // Seleccionar 2 correctas y 1 incorrecta, o variar
  let cartasTexto = [];
  // Agregar una correcta
  const correctaAleatoria = areasCorrectas[Math.floor(Math.random() * areasCorrectas.length)];
  cartasTexto.push({ texto: correctaAleatoria, correcta: true });

  // Agregar dos incorrectas
  while (cartasTexto.length < 3) {
    const randomIncorrecta = palabrasIncorrectas[Math.floor(Math.random() * palabrasIncorrectas.length)];
    if (!cartasTexto.some(c => c.texto === randomIncorrecta)) {
      cartasTexto.push({ texto: randomIncorrecta, correcta: false });
    }
  }

  // Mezclar
  cartasTexto.sort(() => Math.random() - 0.5);

  let posicionesOcupadas = [];

  cartasTexto.forEach((carta) => {
    const div = document.createElement("div");
    div.className = "carta";
    div.innerText = carta.texto;
    div.dataset.correcta = carta.correcta;

    // Generar posición en la pantalla, sin salir de los límites
    let left, top;
    let attempts = 0;
    let maxLeft = window.innerWidth - 180;
    let minLeft = 200;
    let maxTop = window.innerHeight - 210;
    let minTop = 100;
    do {
      left = minLeft + Math.random() * (maxLeft - minLeft);
      top = minTop + Math.random() * (maxTop - minTop);
      attempts++;
    } while (posicionesOcupadas.some(pos => Math.abs(pos.left - left) < 120 && Math.abs(pos.top - top) < 120) && attempts < 50);

    posicionesOcupadas.push({ left, top });

    div.style.left = left + "px";
    div.style.top = top + "px";

    div.addEventListener("click", () => clicCarta(div, carta.correcta));

    container.appendChild(div);
  });

  // Próxima carta en 3 segundos
  setTimeout(() => {
    // Remover cartas anteriores
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    generarCarta();
  }, 3000);
}

function clicCarta(elemento, correcta) {
  // Animar carta rompiéndose
  elemento.classList.add("romperse");

  // Animar personaje patada
  const personaje = document.querySelector(".character-side img");
  const imgSrcOriginal = personaje.src;
  personaje.src = "personaje/personajepateando.png";
  personaje.classList.add("patada");

  setTimeout(() => {
    personaje.classList.remove("patada");
    personaje.src = imgSrcOriginal;
  }, 500);

  if (correcta) {
    puntos++;
  } else {
    puntos--;
  }
  actualizarPuntos();

  // Remover la carta después de animación
  setTimeout(() => {
    elemento.remove();
  }, 500);
}

function actualizarPuntos() {
  document.getElementById("puntos").innerText = "Puntos: " + puntos;
}

function terminarJuego() {
  const pantallaFinal = document.getElementById("pantallaFinal");
  if (puntos <= 3) {
    pantallaFinal.innerText = "😞 Necesitas mejorar tus hábitos para avanzar en la vida cantidad de Puntos: " + puntos;
  } else if (puntos > 3 && puntos <= 6) {
    pantallaFinal.innerText = "😊 Buen trabajo, pero aún puedes mejorar esas areas de tu vida , cantidad de puntos: " + puntos;
  } else {
    pantallaFinal.innerText = "😎 Excelente trabajo tienes muy buenas bases para tu vida Puntos: " + puntos;
  }
  pantallaFinal.classList.add("mostrar");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
}