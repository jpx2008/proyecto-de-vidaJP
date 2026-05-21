
let juegoActivo = false;
let indiceMensaje = 0;
let completadas = 0;
let nivelListo = false;

const mensajes = [
  "Listo para conocer que son los principios y valores?",
  "Los principios son reglas universales e inquebrantables de conducta  que guían el actuar ético de la sociedad.",
  "unos ejemplos de principios son justicia, libertad, igualdad, respeto entre otros.",
  "Los valores Los valores son cualidades subjetivas y cambiantes que cada persona considera importantes.",
  "unos ejemplos de valores son honestidad, solidaridad, gratitud entre otros.",
  "Ahora que ya sabes que son principios y valores reconstruye la espada de mis principios y valores arrastrando cada pieza correctamente "
];

let btnRegresar, pantallaFinal;

function allPiecesLeidas() {
  const piezas = document.querySelectorAll('.pieza.correcto');
  return Array.from(piezas).every(p => p.classList.contains('palabra-leida'));
}

function finalizarNivel() {
  pantallaFinal.innerText = 'Nivel completado';
  pantallaFinal.classList.add('mostrar');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 8000);
}

window.onload = function () {

  btnRegresar = document.getElementById("btnRegresar");
  pantallaFinal = document.getElementById("pantallaFinal");


  const musica = document.getElementById("musica");
  if (musica && sessionStorage.getItem("musicaActiva") === "true") {
    musica.volume = 0.3;
    musica.play();
  }

  if (btnRegresar) {
    btnRegresar.addEventListener("click", () => {
      pantallaFinal.classList.add("mostrar");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 9000);
    });
  }

  const piezas = document.querySelectorAll(".pieza");
  const zonas = document.querySelectorAll(".zona");

  piezas.forEach(pieza => {
    const palabraTop = pieza.dataset.wordTop || '';
    const palabraMiddle = pieza.dataset.wordMiddle || '';
    const wordTopEl = pieza.querySelector('.word-top');
    const wordMiddleEl = pieza.querySelector('.word-middle');
    if (wordTopEl) wordTopEl.textContent = palabraTop;
    if (wordMiddleEl) wordMiddleEl.textContent = palabraMiddle;

    pieza.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("id", pieza.id);
    });

    pieza.addEventListener("click", () => {
      if (!juegoActivo) return;

      if (nivelListo) {
        pieza.classList.toggle('girada');
        pieza.classList.add('palabra-leida');
        if (allPiecesLeidas()) {
          finalizarNivel();
        }
      } else {
        pieza.classList.toggle('mostrar-palabras');
      }
    });
  });

  zonas.forEach(zona => {

    zona.addEventListener("dragover", (e) => {
      e.preventDefault(); 
    });

    zona.addEventListener("drop", (e) => {
      e.preventDefault();

      const id = e.dataTransfer.getData("id");
      const pieza = document.getElementById(id);

      if (zona.dataset.pieza === id) {
        pieza.style.left = zona.offsetLeft + "px";
        pieza.style.top = zona.offsetTop + "px";

        pieza.draggable = false;
        pieza.classList.add("correcto");
        pieza.classList.remove('mostrar-palabras');

        completadas++;

        if (completadas === zonas.length) {
          nivelListo = true;
          pantallaFinal.innerText = 'Voltea las palabras';
          pantallaFinal.classList.add("mostrar");
        }
      }

    });

  });

};

function advanceMessage() {

  const msg = document.getElementById("message");
  const contenedor = document.querySelector(".character-container");
  const boton = document.getElementById("playButton");

  if (!msg) return;

  if (indiceMensaje < mensajes.length) {
    msg.innerText = mensajes[indiceMensaje];

    if (indiceMensaje === mensajes.length - 1) {
      setTimeout(() => {
        contenedor.style.display = "none";
        msg.style.display = "none";
        boton.style.display = "block";
      }, 2000);
    }

    indiceMensaje++;
  }
}

function iniciarJuego() {

  const boton = document.getElementById("playButton");

  boton.textContent = "Cargando...";

  setTimeout(() => {

    boton.style.display = "none";

    // 🎮 mostrar puzzle
    document.getElementById("puzzle").style.display = "block";

    juegoActivo = true;

  }, 1000);
}