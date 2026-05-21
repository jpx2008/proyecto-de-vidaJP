
let posicion = 0;
let juegoActivo = false;
let indiceMensaje = 0;


const mensajes = [
  "Listo para conocer qué es una misión y visión?",
  "Una misión es una declaración concisa que define tu propósito de vida, valores fundamentales y los objetivos a largo plazo que deseas alcanzar",
  "Una visión es una declaración inspiradora y detallada de quién quieres ser y qué deseas lograr a largo plazo",
  "Ahora que sabes esto, tu misión es descubrir mi misión y visión; usa A y D para moverte"
];


let personajeJuego, mision, vision, btnRegresar, pantallaFinal;

window.onload = function () {
  personajeJuego = document.getElementById("personajeJuego");
  mision = document.getElementById("mision");
  vision = document.getElementById("vision");
  btnRegresar = document.getElementById("btnRegresar");
  pantallaFinal = document.getElementById("pantallaFinal");


  const musica = document.getElementById("musica");
  if (musica) {
    musica.volume = 0.3;
    
    if (sessionStorage.getItem("musicaActiva") === "true") {
      musica.play();
    }
  }

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

  if (!msg) return;

  if (indiceMensaje < mensajes.length) {
    msg.innerText = mensajes[indiceMensaje];
    msg.style.display = "block";

    if (indiceMensaje === mensajes.length - 1) {
      setTimeout(() => {
        if (contenedor) contenedor.style.display = "none";
        msg.style.display = "none";
        if (boton) boton.style.display = "block";
      }, 2000);
    }

    indiceMensaje++;
  }
}

function iniciarJuego() {
  const boton = document.getElementById("playButton");
  const contenedor = document.querySelector(".character-container");

  if (boton) boton.textContent = "Cargando...";

  setTimeout(() => {
    if (boton) boton.style.display = "none";
    if (contenedor) contenedor.style.display = "none";

    document.getElementById("juego").style.display = "block";

    juegoActivo = true;
  }, 1000);
}


document.addEventListener("keydown", (e) => {

  if (!juegoActivo) return;

  const contenedor = document.getElementById("personajeContenedor");

  if (e.key.toLowerCase() === "d") {
    posicion += 40;
    contenedor.classList.remove("izquierda");
  }

  if (e.key.toLowerCase() === "a") {
    posicion -= 40;
    if (posicion < 0) posicion = 0;
    contenedor.classList.add("izquierda");
  }

  contenedor.style.left = posicion + "px";


  if (mision) {
    mision.style.display = posicion >= 400 ? "block" : "none";
  }

  if (vision) {
    if (posicion >= 800) {
      vision.style.display = "block";


      if (btnRegresar) btnRegresar.style.display = "block";

    } else {
      vision.style.display = "none";
      if (btnRegresar) btnRegresar.style.display = "none";
    }
  }

});