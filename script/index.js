let screen = document.getElementById('screen'), canvas, c, rScreen; //starting

var music = new Audio("../music/music.mp3"); //adding music
music.volume = 0.3;

var winner = '';
var animation = true;

const menu = [ //aray for creating menu, settings, and gameplay page
`<div>
    <button onclick = "changeS(1)">Game</button>
    <button onclick = "changeS(2)">Settings</button>
<div>`,
`<canvas></canvas>`,
`<p>
Music:
<input type="range" min="0" max="10" value="0" id="music">

<button onclick="changeS(0)">Back</button>
</p>`,
``
];

function changeS(which) { //currect page
    menu[3] = `
    <p>
        <p>Winner is: ${winner}</p>
        <button onclick="changeS(0)">Home</button>
    </p>`

    screen.innerHTML = menu[which];
    animation = true;

    if (which == 1) setup();
    if (which == 2) settings();
    if (which == 3) animation = false;
};

let breakBlock, unBreakBlock; //global variable
let userBullets = [];
let user2Bullets = [];
let enemyBullets = [];

var texture = new Image(); //load image
texture.src = "../texture/texture.png";

music.volume = 0;

function settings() { //in settings
    let slider = document.getElementById("music");
    slider.value = music.volume * 10;

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

    //reset tanks

    tank.width = 2 * (Math.floor(tankSize / 26 * 1000) / 1000); //width of tank
    tank.height = 2 * (Math.floor(tankSize / 26 * 1000) / 1000); //heibht of tank
    tank.direction = 0; //top, down, right, left
    tank.fire_direction = [1, 0, 0, 0]; //top, down, right, left
    tank.speed = (Math.floor(tankSize / 26 * 1000) / 1000)/speed;

    tank2.width = 2 * (Math.floor(tankSize / 26 * 1000) / 1000); //width of tank
    tank2.height = 2 * (Math.floor(tankSize / 26 * 1000) / 1000); //heibht of tank
    tank2.direction = 0; //top, down, right, left
    tank2.fire_direction = [0, 1, 0, 0]; //top, down, right, left
    tank2.speed = (Math.floor(tankSize / 26 * 1000) / 1000)/speed;

    music.play(); //play music
    animate();
};

function animate() { //main animate function
    if(animation)
        requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    drawMap(); //in mapfunc.js
    drawBullet(); //in bullets.js
    drawTank(); //in tank.js
}

changeS(0); //set main screen(page)