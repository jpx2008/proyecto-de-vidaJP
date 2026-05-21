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
  msg.innerText = "que tal soy jp y espero que hayas disfrutado el juego";
  msg.style.display = "block";

  setTimeout(() => {
    msg.innerText = " ahora quiero que reflexiones sobre las metas que tienes en tu vida y las acciones que haces para conseguirlas";
  }, 4000);

  setTimeout(() => {
    msg.innerText = "recuerda que siempre tienes que lograr todo lo que te propongas ";
  }, 8000);

  setTimeout(() => {
    msg.innerText = "no importa lo que pase siempre tienes que seguir adelante y nunca rendirte tu puedes ";
  }, 14000);

  setTimeout(() => {
    const replayBtn = document.getElementById('replayBtn');
    if (replayBtn) {
      replayBtn.classList.add('show');
      replayBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }
    msg.style.display = "none";
  }, 18000);
  
}