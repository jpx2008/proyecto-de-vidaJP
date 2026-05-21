



const player = document.getElementById("player");

const walls = document.querySelectorAll(".wall");

const ghosts = [
document.getElementById("g1"),
document.getElementById("g2"),
document.getElementById("g3"),
document.getElementById("g4")
];

const darkness = document.getElementById("darkness");

const hitsText = document.getElementById("hits");

const pointsText = document.getElementById("points");

const bar = document.getElementById("bar");

const message = document.getElementById("message");

const map = document.getElementById("map");

const door = document.getElementById("door");



// Posición inicial del jugador (esquina)
let x = 40;
let y = 40;

// --- Intro: mensajes y control de inicio ---
let indiceIntro = 0;
const introMensajes = [
    "Las estrategias son planes concretos para alcanzar metas.",
    "Organiza y prioriza tus acciones; mantén el enfoque.",
    "La disciplina, constancia y reflexión te llevan al éxito."
];

function advanceMessage(){
    const intro = document.getElementById('introMessage');
    if(!intro) return;
    const span = intro.querySelector('.message-text');
    if(indiceIntro < introMensajes.length){
        span.innerText = introMensajes[indiceIntro];
        indiceIntro++;
        if(indiceIntro === introMensajes.length){
            setTimeout(()=>{
                const btn = document.getElementById('playButton');
                if(btn) btn.style.display = 'block';
            },1200);
        }
    }
}

function iniciarJuego(){
    const introCont = document.getElementById('introContainer');
    const gameCont = document.getElementById('gameContainer');
    if(introCont) introCont.style.display = 'none';
    if(gameCont) gameCont.style.display = 'flex';

    const mus = document.getElementById('musica');
    if(mus){
        mus.volume = 0.3;
        mus.play().catch(()=>{});
        sessionStorage.setItem('musicaActiva','true');
    }
}

const speed = 4;

const keys = {};



let points = 0;
let hits = 0;
let doorVisible = false;


window.addEventListener("keydown",(e)=>{
    keys[e.key] = true;
});

window.addEventListener("keyup",(e)=>{
    keys[e.key] = false;
});



const palabras = [
"DISCIPLINA",
"PERSEVERANCIA",
"RESPONSABILIDAD",
"MOTIVACIÓN",
"CONSTANCIA",
"PACIENCIA",
"ESFUERZO",
"CONFIANZA",
"DETERMINACIÓN",
"ORGANIZACIÓN",
"SUPERACIÓN",
"COMPROMISO",
"ENFOQUE",
"DEDICACIÓN",
"VALENTÍA"
];

const totalItems = 23;

let created = 0;
let collected = 0;

// Distribuir `totalItems` de forma aleatoria por el mapa,
// evitando paredes y evitando que queden amontonadas.
const maxAttempts = 1200;
const itemSize = 52;
let attempts = 0;

while (created < totalItems && attempts < maxAttempts) {
    attempts++;

    // Generar posición aleatoria dentro del contenedor `map`
    const px = Math.floor(Math.random() * (map.offsetWidth - itemSize - 40)) + 20;
    const py = Math.floor(Math.random() * (map.offsetHeight - itemSize - 40)) + 20;

    // Evitar área cercana al jugador inicial (zona superior izquierda)
    const safeFromPlayer = !(px < 160 && py < 160);

    if (!safeFromPlayer) continue;

    // Comprobar colisión con paredes
    let collidesWall = false;
    walls.forEach(w => {
        const wx = w.offsetLeft;
        const wy = w.offsetTop;
        const ww = w.offsetWidth;
        const wh = w.offsetHeight;

        if (!(px + itemSize < wx || px > wx + ww || py + itemSize < wy || py > wy + wh)) {
            collidesWall = true;
        }
    });

    if (collidesWall) continue;

    // Comprobar distancia con otros items para evitar agrupamiento
    let collidesItem = false;
    document.querySelectorAll('.item').forEach(it => {
        if (collidesItem) return;
        const ix = it.offsetLeft;
        const iy = it.offsetTop;
        const padding = 12; // espacio mínimo entre items
        if (!(px + itemSize + padding < ix || px > ix + itemSize + padding || py + itemSize + padding < iy || py > iy + itemSize + padding)) {
            collidesItem = true;
        }
    });

    if (collidesItem) continue;

    // Crear el item en la posición válida
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerText = palabras[Math.floor(Math.random() * palabras.length)];
    item.style.left = px + 'px';
    item.style.top = py + 'px';
    map.appendChild(item);

    created++;
    // Reiniciar intentos para dar margen a colocar restantes
    attempts = 0;
}

if (created < totalItems) {
    console.warn('No se pudieron colocar todos los items, colocados:', created);
}


function update(){

    let nextX = x;
    let nextY = y;

    if(keys["w"] || keys["ArrowUp"])
    nextY -= speed;

    if(keys["s"] || keys["ArrowDown"])
    nextY += speed;

    if(keys["a"] || keys["ArrowLeft"])
    nextX -= speed;

    if(keys["d"] || keys["ArrowRight"])
    nextX += speed;



    let collision = false;

    walls.forEach(wall=>{

        const wx = wall.offsetLeft;
        const wy = wall.offsetTop;

        const ww = wall.offsetWidth;
        const wh = wall.offsetHeight;

        if(
            nextX + 70 > wx &&
            nextX < wx + ww &&
            nextY + 70 > wy &&
            nextY < wy + wh
        ){
            collision = true;
        }

    });

    if(!collision){

        x = nextX;
        y = nextY;
    }

    player.style.left = x + "px";
    player.style.top = y + "px";

    collectItems();

    checkGhosts();

    checkDoor();

    requestAnimationFrame(update);
}



function collectItems(){

    document.querySelectorAll(".item").forEach(item=>{

        if(item.style.display != "none"){

            const dx = item.offsetLeft;
            const dy = item.offsetTop;

            if(
                x < dx + 35 &&
                x + 75 > dx &&
                y < dy + 35 &&
                y + 75 > dy
            ){

                item.style.display = "none";

                points += 5;
                collected++;

                pointsText.textContent = points;

            }

        }

    });

}



function checkGhosts(){

    ghosts.forEach((g,index)=>{

        if(g.style.display != "none"){

            let gx = g.offsetLeft;
            let gy = g.offsetTop;

            if(index == 0){

                // Red ghost: chase a lateral offset point of the player
                let angleToPlayer = Math.atan2(y - gy, x - gx);

                // Perpendicular (lateral) direction
                let perp = angleToPlayer + Math.PI / 2;

                // Choose side based on current horizontal relation to player
                let side = (gx < x) ? -1 : 1;

                // Offset distance to approach from the side (reduces clustering)
                let offsetDist = 120;

                // Target point is a bit ahead of the player plus lateral offset
                let targetX = x + Math.cos(angleToPlayer) * 40 + Math.cos(perp) * offsetDist * side;
                let targetY = y + Math.sin(angleToPlayer) * 40 + Math.sin(perp) * offsetDist * side;

                let chaseAngle = Math.atan2(targetY - gy, targetX - gx);

                gx += Math.cos(chaseAngle) * 3.5;
                gy += Math.sin(chaseAngle) * 3.5;

            }

            if(index == 1){

                gy += (y > gy ? 3 : -3);

            }

            if(index == 2){

                let angle =
                Math.atan2(y - gy, x - gx);

                gx += Math.cos(angle) * 2.8;
                gy += Math.sin(angle) * 2.8;

            }

            if(index == 3){

                gx += (x > gx ? 2.5 : -2.5);
                gy += (y > gy ? 2.5 : -2.5);

            }

            g.style.left = gx + "px";
            g.style.top = gy + "px";

  

            if(
                x < gx + 60 &&
                x + 75 > gx &&
                y < gy + 60 &&
                y + 75 > gy
            ){

                hits++;

                hitsText.textContent =
                hits + " / 4";

                darkness.style.opacity =
                hits * 0.15;

                bar.style.width =
                hits * 25 + "%";

                g.style.display = "none";

                if(hits >= 4){

                    message.style.display = "block";

                    message.innerHTML = `
                    <h1>GAME OVER</h1>
                    <p>La procrastinación ganó.</p>
                    `;

                    setTimeout(()=>{
                        location.reload();
                    },4000);

                }

            }

        }

    });

}



function checkDoor(){

    if(collected >= 18 && !doorVisible){

        doorVisible = true;

        door.style.display = "flex";

        message.style.display = "block";

        message.innerHTML = `
        <h1>¡EXCELENTE!</h1>
        <p>Tienes buenas estrategias para alcanzar tus metas.</p>
        `;

        setTimeout(()=>{
            message.style.display = "none";
        },3000);

    }

    if(doorVisible){

        const dx = door.offsetLeft;
        const dy = door.offsetTop;

        if(
            x < dx + 100 &&
            x + 75 > dx &&
            y < dy + 100 &&
            y + 75 > dy
        ){

            message.style.display = "block";

            message.innerHTML = `
            <h1>¡FELICIDADES!</h1>
            <p>Has conseguido unas buenas metas.</p>
            `;

            setTimeout(()=>{
                window.location.href = "index.html";
            },4000);

        }

    }

}

update();

