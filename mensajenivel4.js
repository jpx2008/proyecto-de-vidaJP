
const mensajes = [
  "Las metas son objetivos que deseas alcanzar.",
  "Las buenas decisiones te acercan a tus sueños.",
  "Las malas decisiones te alejan de tus objetivos.",
  "Dispara las buenas decisiones y bota las malas 🎯"
];

let indice = 0;
let puntos = 0;
let ronda = 0;

let opcionActual = null;
let juegoTerminado = false;

const opciones = [
  { texto:"Disciplina", tipo:"bueno" },
  { texto:"Estudiar", tipo:"bueno" },
  { texto:"Ahorrar", tipo:"bueno" },
  { texto:"Practicar", tipo:"bueno" },
  { texto:"Responsabilidad", tipo:"bueno" },
  { texto:"Respeto", tipo:"bueno" },
  { texto:"Constancia", tipo:"bueno" },
  { texto:"Organización", tipo:"bueno" },
  { texto:"Perseverancia", tipo:"bueno" },
  { texto:"Esfuerzo", tipo:"bueno" },

  { texto:"Pereza", tipo:"malo" },
  { texto:"Desorden", tipo:"malo" },
  { texto:"Procrastinar", tipo:"malo" },
  { texto:"Mentir", tipo:"malo" },
  { texto:"Irresponsabilidad", tipo:"malo" },
  { texto:"Perder tiempo", tipo:"malo" },
  { texto:"Desinterés", tipo:"malo" },
  { texto:"Abandono", tipo:"malo" },
  { texto:"Mala actitud", tipo:"malo" },
  { texto:"Conformismo", tipo:"malo" }

];


opciones.sort(() => Math.random() - 0.5);

function advanceMessage(){

  const msg = document.getElementById("message");
  const boton = document.getElementById("playButton");

  if(indice < mensajes.length){

    msg.innerText = mensajes[indice];

    indice++;

    if(indice === mensajes.length){

      setTimeout(()=>{

        msg.style.display = "none";
        boton.style.display = "block";

      },1500);

    }

  }

}


function iniciarJuego(){

  document.querySelector(".character-container").style.display = "none";

  document.getElementById("playButton").style.display = "none";

  document.getElementById("juego").style.display = "block";

  nuevaRonda();

}

function nuevaRonda(){


  if(juegoTerminado) return;

  if(ronda >= 10){

    finalizarJuego();
    return;
  }

  opcionActual = opciones[ronda];

  const palabra = document.getElementById("palabra");

  palabra.innerText = opcionActual.texto;

  if(opcionActual.tipo === "bueno"){

    palabra.style.background = "green";

  }

  else{

    palabra.style.background = "darkred";

  }

  ronda++;

}
document
.getElementById("btnDisparar")
.addEventListener("click", ()=>{

  if(juegoTerminado) return;

  const flecha = document.getElementById("flecha");

  flecha.style.display = "block";

  if(opcionActual.tipo === "bueno"){

    puntos++;

    animacionHit();

  }


  else{

    puntos--;

    animacionFail();

  }

  actualizar();

});

document
.getElementById("btnBotar")
.addEventListener("click", ()=>{

  if(juegoTerminado) return;
  if(opcionActual.tipo === "malo"){

    puntos++;
    animacionCaida();

  }

  else{

    puntos--;

    animacionFail();

  }

  actualizar();

});
function actualizar(){

  document.getElementById("puntos").innerText = puntos;

  setTimeout(()=>{

    nuevaRonda();

  },1200);

}
function animacionHit(){

  const flecha = document.getElementById("flecha");

  flecha.style.background = "#00ff00";

  flecha.animate([

    {
      left:"250px",
      bottom:"250px",
      transform:"rotate(0deg)"
    },

    {
      left:"78%",
      bottom:"350px",
      transform:"rotate(0deg)"
    }

  ],{

    duration:1000,
    fill:"forwards"

  });

}
function animacionFail(){

  const flecha = document.getElementById("flecha");

  flecha.style.background = "red";

  flecha.animate([

    {
      left:"250px",
      bottom:"250px",
      transform:"rotate(0deg)"
    },

    {
      left:"65%",
      bottom:"120px",
      transform:"rotate(25deg)"
    }

  ],{

    duration:1000,
    fill:"forwards"

  });

}

function animacionCaida(){

  const flecha = document.getElementById("flecha");

  flecha.style.display = "block";

  flecha.style.background = "red";

  flecha.animate([

    {
      left:"250px",
      bottom:"250px",
      transform:"rotate(0deg)"
    },

    {
      left:"500px",
      bottom:"80px",
      transform:"rotate(80deg)"
    }

  ],{

    duration:1200,
    fill:"forwards",
    easing:"ease-in"

  });

}

function finalizarJuego(){

  juegoTerminado = true;


  document.getElementById("btnDisparar").disabled = true;
  document.getElementById("btnBotar").disabled = true;

  const palabra = document.getElementById("palabra");


  if(puntos === 10){

    palabra.innerText =
      "🎯 Tienes buenos objetivos";

    palabra.style.background = "green";
  }


  else if(puntos >= 6){

    palabra.innerText =
      "⚡ Vas por buen camino";

    palabra.style.background = "orange";
  }


  else{

    palabra.innerText =
      "❌ Debes mejorar tus objetivos";

    palabra.style.background = "darkred";
  }


  document.getElementById("flecha").style.display = "none";


  setTimeout(()=>{

    window.location.href = "index.html";

  },5000);

}