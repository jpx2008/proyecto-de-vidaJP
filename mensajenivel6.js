let indiceMensaje = 0;
const mensajesIntro = [
    "¡Bienvenido al Nivel 6",
    "en este nivel  veras que es un cronograma y como te puede ayudar a alcanzar tus metas.",
    "un cronograma es una herramienta de planificación que te permite organizar tus actividades y metas a lo largo del tiempo, dividiéndolas en corto, mediano y largo plazo.",
    "que deben equilibrarse para lograr un desarrollo integral y el cumplimiento de metas.",
    "ahora que ya sabes eso quiero que organices tu cronograma y identifiques cuales son tus metas a corto, mediano y largo plazo.",
];

function advanceMessage(){
    const texto = document.getElementById('dialogueText');
    const btn = document.getElementById('startBtn');
    if(!texto) return;

    if(indiceMensaje < mensajesIntro.length){
        texto.innerText = mensajesIntro[indiceMensaje];
        indiceMensaje++;
        if(indiceMensaje === mensajesIntro.length){
            setTimeout(()=>{
                if(btn) btn.style.display = 'block';
            },1200);
        }
    }
}






















function startGame(){

    document.getElementById("intro")
    .style.display = "none";

    document.getElementById("scene")
    .style.display = "block";

    createRound();

}



const zones = {

short:document.getElementById("short"),

medium:document.getElementById("medium"),

long:document.getElementById("long")

};

const message =
document.getElementById("message");

const roundText =
document.getElementById("roundText");



const rounds = [

[
{id:"c1",text:"Terminar estudios",correct:"short"},
{id:"c2",text:"Aprender programación",correct:"short"},
{id:"c3",text:"Mejorar hábitos de ejercicio",correct:"short"},
{id:"c4",text:"Conseguir trabajo",correct:"medium"},
{id:"c5",text:"Cumplir metas",correct:"long"}
],

[
{id:"c6",text:"Hacer tareas",correct:"short"},
{id:"c7",text:"Leer más",correct:"short"},
{id:"c8",text:"Aprender inglés",correct:"medium"},
{id:"c9",text:"Crear mas proyectos",correct:"medium"},
{id:"c10",text:"Tener estabilidad finaciera",correct:"long"}
],

[
{id:"c11",text:"Organizar mejor mi  tiempo",correct:"short"},
{id:"c12",text:"Ser disciplinado",correct:"short"},
{id:"c13",text:"conseguir un carro",correct:"medium"},
{id:"c14",text:"Conseguir experiencia laboral",correct:"medium"},
{id:"c15",text:"viajar por el mundo",correct:"long"}
],

[
{id:"c16",text:"Mejorar notas",correct:"short"},
{id:"c17",text:"volver a competir deportivamente",correct:"medium"},
{id:"c18",text:"Aprender nuevas habilidades",correct:"medium"},
{id:"c19",text:"Mejorar habilidades sociales",correct:"medium"},
{id:"c20",text:"Lograr ser un ingeniero en sistemas",correct:"long"}
]

];

let currentRound = 0;
let completed = 0;



function createRound(){

    document
    .querySelectorAll(".card")
    .forEach(card=>card.remove());

    completed = 0;

    roundText.innerHTML =
    "RONDA " + (currentRound + 1) + " / 4";

    const currentCards =
    rounds[currentRound];

    currentCards.forEach((item,index)=>{

        const card =
        document.createElement("div");

        card.classList.add("card");

        card.id = item.id;

        card.innerHTML = item.text;

        card.style.left =
        (100 + (index * 210)) + "px";

        card.style.bottom = "70px";

        document
        .querySelector(".scene")
        .appendChild(card);

        enableDrag(card,item.correct);

    });

}



function enableDrag(card,correctZone){

    let offsetX, offsetY;
    let dragging = false;

    card.addEventListener("mousedown",(e)=>{

        dragging = true;

        offsetX =
        e.clientX - card.offsetLeft;

        offsetY =
        e.clientY - card.offsetTop;

        card.style.cursor = "grabbing";

    });

    document.addEventListener("mousemove",(e)=>{

        if(!dragging) return;

        card.style.left =
        (e.clientX - offsetX) + "px";

        card.style.top =
        (e.clientY - offsetY) + "px";

    });

    document.addEventListener("mouseup",()=>{

        if(!dragging) return;

        dragging = false;

        card.style.cursor = "grab";

        checkZone(card,correctZone);

    });

}



function checkZone(card,correctZone){

    for(let key in zones){

        const zone = zones[key];

        const rect =
        zone.getBoundingClientRect();

        const cardRect =
        card.getBoundingClientRect();

        if(

            cardRect.left < rect.right &&
            cardRect.right > rect.left &&
            cardRect.top < rect.bottom &&
            cardRect.bottom > rect.top

        ){

            if(correctZone == key){

                card.style.background =
                "#8dff8d";

                card.style.pointerEvents =
                "none";

                completed++;

                if(completed == 5){

                    nextRound();

                }

            }else{

                card.style.background =
                "#ff7b7b";

                setTimeout(()=>{

                    card.style.background =
                    "#f2d6a2";

                },700);

            }

        }

    }

}



function nextRound(){

    currentRound++;

    if(currentRound >= rounds.length){

        finishGame();

        return;
    }

    createRound();

}



function finishGame(){

    message.style.display = "flex";

    setTimeout(() => {
        window.location.href = "final.html";
    }, 3000);

}
