window.onload = function () {

  let progreso = 0;
  const barra = document.getElementById("barra");
  const texto = document.querySelector(".texto-carga");


  // Cambiar textos tipo videojuego
  setTimeout(() => texto.innerText = "Inicializando sistema...", 1000);
  setTimeout(() => texto.innerText = "Cargando datos...", 2000);
  setTimeout(() => texto.innerText = "Preparando entorno...", 2800);

  // Barra de carga
  let intervalo = setInterval(() => {
    progreso += 10;
    barra.style.width = progreso + "%";

    if (progreso >= 100) {
      clearInterval(intervalo);

      // Oculta pantalla de carga
      document.getElementById("pantalla-carga").style.display = "none";


    }
  }, 300);


};