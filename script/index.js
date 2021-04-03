let screen = document.getElementById('screen'), canvas, c, rScreen; //starting

const menu = [ //aray for creating menu, help page, settings, and gameplay page
`<div>
    <button onclick = "changeS(1)">Game</button>
    <button onclick = "changeS(2)">Help</button>
    <button onclick = "changeS(3)">Settings</button>
<div>`,
`<canvas></canvas>`,
`<p>Help!</p>`,
`<p>Settings</p>`,
`<p>Luzeru</p>`
];

function changeS(which) { //currect page
    screen.innerHTML = menu[which];
    if (which == 1) setup();
};

let breakBlock, unBreakBlock, texture; //global variable
let userBullets = [];
let enemyBullets = [];

texture = new Image(); //load image
texture.src = "../texture/texture1.webp"

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