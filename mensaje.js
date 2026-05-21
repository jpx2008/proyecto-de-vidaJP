function showMessage() {
  const musica = document.getElementById("musica");
  const msg = document.getElementById("message");

  // 🎧 Música
  if (musica) {
    musica.volume = 0.3;
    musica.play();
    // Guardar que la música está activa
    sessionStorage.setItem("musicaActiva", "true");
  }

  // 💬 Mensajes
  msg.innerText = "Iniciando sistema...";
  msg.style.display = "block";

  setTimeout(() => {
    msg.innerText = "Personaje seleccionado: JP";
  }, 4000);

  setTimeout(() => {
    msg.innerText = "Entras al universo principal del Proyecto de Vida.";
  }, 6000);

  setTimeout(() => {
    msg.innerText = "Tu misión comienza: explora los niveles y descubre mi historia.";
  }, 8000);

  setTimeout(() => {
    msg.style.display = "none";
  }, 11000);
}