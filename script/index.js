let screen = document.getElementById('screen'), canvas, c, rScreen; //starting

var music = new Audio("../music/music.mp3"); //adding music
music.volume = 0.3;

const menu = [ //aray for creating menu, help page, settings, and gameplay page
`<div>
    <button onclick = "changeS(1)">Game</button>
    <button onclick = "changeS(2)">Help</button>
    <button onclick = "changeS(3)">Settings</button>
<div>`,
`<canvas></canvas>`,
`<p>Help!</p>`,
`<p>
Music:
<input type="range" min="0" max="10" value="${music.volume * 10}" id="music">

<button onclick="changeS(0)">Nazad</button>
</p>`,
`<p>Luzeru</p>`
];

function changeS(which) { //currect page
    screen.innerHTML = menu[which];
    if (which == 1) setup();
    if (which == 3) settings();
};

let breakBlock, unBreakBlock, texture; //global variable
let userBullets = [];
let enemyBullets = [];

texture = new Image(); //load image
texture.src = "../texture/texture1.webp";

function settings() { //in settings
    let slider = document.getElementById("music");

    slider.oninput = function() {
        music.volume = (this.value / 10);
        console.log(music.volume);
    }
}


function setup() { //setup function
    rScreen = Math.round(screen.getBoundingClientRect().width); //round currect size of canvas
    screen.style.width = rScreen + "px";
    screen.style.height = rScreen + rScreen/26 + "px";

    canvas = document.querySelector('canvas'); //set up
    canvas.width = rScreen;
    canvas.height = rScreen + rScreen/26;
    c = canvas.getContext('2d');

    //reset valutes:
    breakBlock = [];
    unBreakBlock = [];
    userBullets = [];
    enemyBullets = [];
    bulletID = 1;

    mapObj(); //in mapfunc.js

    music.play(); //play music
    animate();
};

function animate() { //main animate function
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    drawMap(); //in mapfunc.js
    drawBullet(); //in bullets.js
    drawTank(); //in tank.js
}

changeS(0); //set main screen(page)