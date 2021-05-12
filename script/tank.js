let tankSize = Math.round(screen.getBoundingClientRect().width);
let finished = true;
const speed = 10;
let life = 120;


var tank = {
    x: 0, //starter x position of tank
    y: 0, //starter y position of tank
    width: 2 * (Math.floor(tankSize / 26 * 1000) / 1000), //width of tank
    height: 2 * (Math.floor(tankSize / 26 * 1000) / 1000), //
    direction: 0, //top, down, right, left
    fire_direction:[1, 0, 0, 0], //top, down, right, left
    fire: 0,
    fireTimeOut: 70,
    speed: (Math.floor(tankSize / 26 * 1000) / 1000)/speed,
    life: life,
}

var tank2 = {
    x: 0, //starter x position of tank
    y: 0, //starter y position of tank
    width: 2 * (Math.floor(tankSize / 26 * 1000) / 1000), //width of tank
    height: 2 * (Math.floor(tankSize / 26 * 1000) / 1000), //
    direction: 0, //top, down, right, left
    fire_direction:[0, 1, 0, 0], //top, down, right, left
    fire: 0,
    fireTimeOut: 70,
    speed: (Math.floor(tankSize / 26 * 1000) / 1000)/speed,
    life: life,
}

window.addEventListener('keydown', (e) => { //looking for keydown
    switch(e.keyCode) {
        case 38: //arrow top
            tank.direction = 1;
            tank.fire_direction = [1, 0, 0, 0];
            break;
        case 40: //arrow down
            tank.direction = 2;
            tank.fire_direction = [0, 1, 0, 0];
            break;
        case 39: //arrow right
            tank.direction = 3;
            tank.fire_direction = [0, 0, 1, 0];
            break;
        case 37: //arrow left
            tank.direction = 4;
            tank.fire_direction = [0, 0, 0, 1];
            break;
        case 32: //space
            tank.fire = 1;
            break;

        case 87: //w
            tank2.direction = 1;
            tank2.fire_direction = [1, 0, 0, 0];
            break;
        case 83: //s
            tank2.direction = 2;
            tank2.fire_direction = [0, 1, 0, 0];
            break;
        case 68: //d
            tank2.direction = 3;
            tank2.fire_direction = [0, 0, 1, 0];
            break;
        case 65: //a
            tank2.direction = 4;
            tank2.fire_direction = [0, 0, 0, 1];
            break;
        case 69: //e
            tank2.fire = 1;
            break;
    };
});

window.addEventListener('keyup', (e) => { //looking for keyup
    switch(e.keyCode) {
        case 38: //arrow top
            tank.direction = 0;
            break;
        case 40: //arrow down
            tank.direction = 0;
            break;
        case 39: //arrow right
            tank.direction = 0;
            break;
        case 37: //arrow left
            tank.direction = 0;
            break;
        case 32: //space
            tank.fire = 0;
            break;

        case 87: //w
            tank2.direction = 0;
            break;
        case 83: //s
            tank2.direction = 0;
            break;
        case 68: //d
            tank2.direction = 0;
            break;
        case 65: //a
            tank2.direction = 0;
            break;
        case 69: //e
            tank2.fire = 0;
            break;
    };
});

function drawTank() { //main function for draw Tank
    if (tank.life == life){
        if(tank.direction == 1){ //top
            tank.y -= tank.speed;
        } else if(tank.direction == 2){ //down
            tank.y += tank.speed;
        } else if(tank.direction == 3){ //right
            tank.x += tank.speed;
        } else if(tank.direction == 4){ //left
            tank.x -= tank.speed;
        }

        collisonTankAndWall(tank);

        if(tank.fire_direction[0] == 1) c.drawImage(texture, 48, 0, 31, 31, tank.x, tank.y, tank.width, tank.height);
        else if(tank.fire_direction[1] == 1) c.drawImage(texture, 80, 0, 31, 31, tank.x, tank.y, tank.width, tank.height);
        else if(tank.fire_direction[2] == 1) c.drawImage(texture, 144, 0, 31, 31, tank.x, tank.y, tank.width, tank.height);
        else if(tank.fire_direction[3] == 1) c.drawImage(texture, 112, 0, 31, 31, tank.x, tank.y, tank.width, tank.height);

        tankBull();
    }else tank.life++;


    if (tank2.life == life){
        if(tank2.direction == 1){ //top
            tank2.y -= tank2.speed;
        } else if(tank2.direction == 2){ //down
            tank2.y += tank2.speed;
        } else if(tank2.direction == 3){ //right
            tank2.x += tank2.speed;
        } else if(tank2.direction == 4){ //left
            tank2.x -= tank2.speed;
        }

        collisonTankAndWall(tank2);

        if(tank2.fire_direction[0] == 1) c.drawImage(texture, 48, 32, 31, 31, tank2.x, tank2.y, tank2.width, tank2.height);
        else if(tank2.fire_direction[1] == 1) c.drawImage(texture, 80, 32, 31, 31, tank2.x, tank2.y, tank2.width, tank2.height);
        else if(tank2.fire_direction[2] == 1) c.drawImage(texture, 144, 32, 31, 31, tank2.x, tank2.y, tank2.width, tank2.height);
        else if(tank2.fire_direction[3] == 1) c.drawImage(texture, 112, 32, 31, 31, tank2.x, tank2.y, tank2.width, tank2.height);
    } else tank2.life++;

    if(tank.life == life && tank2.life == life) collTanks();
}

function collisonTankAndWall(tank) {//function for tank
    let bot = -1, top = -1, left= -1, right= -1; //auxiliary variables

    //Collison detection between Tank and Breakble walls
    for (let i = 0; i < breakBlock.length; i++) {
        if (breakBlock[i].botColl.y < tank.y + (tank.height * 3/47) && //bottom side of block
            breakBlock[i].botColl.secy > tank.y &&
            breakBlock[i].botColl.x < tank.x + tank.width &&
            breakBlock[i].botColl.secx > tank.x
            ) bot = i;

        if (breakBlock[i].topColl.y < tank.y + tank.height && //top side of block
            breakBlock[i].topColl.secy > tank.y + (tank.height * 43.5/47) &&
            breakBlock[i].topColl.x < tank.x + tank.width &&
            breakBlock[i].topColl.secx > tank.x
            ) top = i;

        if (breakBlock[i].leftColl.x < tank.x + tank.width && //left side of block
            breakBlock[i].leftColl.secx > tank.x + (tank.width * 43.5/47) &&
            breakBlock[i].leftColl.y < tank.y + tank.height &&
            breakBlock[i].leftColl.secy > tank.y
            ) left = i;

        if (breakBlock[i].rightColl.x < tank.x + (tank.width * 3/47) && //right side of block
            breakBlock[i].rightColl.secx > tank.x &&
            breakBlock[i].rightColl.y < tank.y + tank.height &&
            breakBlock[i].rightColl.secy > tank.y
            ) right = i;
    }

    //Set new position for tank if tank touch wall
    if(bot != -1) tank.y = breakBlock[bot].botColl.secy;
    if(top != -1) tank.y = breakBlock[top].topColl.y - tank.height;
    if(left != -1) tank.x = breakBlock[left].leftColl.x - tank.width;
    if(right != -1) tank.x = breakBlock[right].rightColl.secx;

    bot = -1, top = -1, left= -1, right= -1; //auxiliary variables

    //Collison detection between Tank and Unbreakble walls
    for (let i = 0; i < unBreakBlock.length; i++) {
        if (unBreakBlock[i].botColl.y < tank.y + (tank.height * 3/47) && //bottom side of block
            unBreakBlock[i].botColl.secy > tank.y &&
            unBreakBlock[i].botColl.x < tank.x + tank.width &&
            unBreakBlock[i].botColl.secx > tank.x
            ) bot = i;

        if (unBreakBlock[i].topColl.y < tank.y + tank.height && //top side side of block
            unBreakBlock[i].topColl.secy > tank.y + (tank.height * 43.5/47) &&
            unBreakBlock[i].topColl.x < tank.x + tank.width &&
            unBreakBlock[i].topColl.secx > tank.x
            ) top = i;

        if (unBreakBlock[i].leftColl.x < tank.x + tank.width && //left side side of block
            unBreakBlock[i].leftColl.secx > tank.x + (tank.width * 43.5/47) &&
            unBreakBlock[i].leftColl.y < tank.y + tank.height &&
            unBreakBlock[i].leftColl.secy > tank.y
            ) left = i;

        if (unBreakBlock[i].rightColl.x < tank.x + (tank.width * 3/47) && //right side side of block
            unBreakBlock[i].rightColl.secx > tank.x &&
            unBreakBlock[i].rightColl.y < tank.y + tank.height &&
            unBreakBlock[i].rightColl.secy > tank.y
            ) right = i;
    }

    //Set new position for tank if tank touch wall
    if(bot != -1) tank.y = unBreakBlock[bot].botColl.secy;
    if(top != -1) tank.y = unBreakBlock[top].topColl.y - tank.height;
    if(left != -1) tank.x = unBreakBlock[left].leftColl.x - tank.width;
    if(right != -1) tank.x = unBreakBlock[right].rightColl.secx;

    //Collison detection for tank and canvas walls
    if(tank.x < 0) tank.x = 0; //left side of canvas
    if(tank.x + tank.width > canvas.width) tank.x = canvas.width - tank.width; //right side of canvas
    if(tank.y < 0) tank.y = 0; //top side of canvas
    if(tank.y + tank.height > canvas.height) tank.y = canvas.height - tank.width + 1; //bot side of canvas

    bot = false, top = false, left= false, right= false;

    //Collison detection between Tank and Base
    if(tank.x + tank.width * 4/5 < base.x + base.size/5 //left side of base
        && tank.x + tank.width > base.x
        && tank.y < base.y + base.size
        && tank.y + tank.height > base.y
        ) left = true;

    if(tank.x < base.x + base.size //right side of base
        && tank.x + tank.width / 5 > base.x + base.size * 4/5 
        && tank.y < base.y + base.size
        && tank.y + tank.height > base.y
        ) right = true;

    if(tank.y + tank.height * 4/5 < base.y + base.size/5 //top side of base
        && tank.y + tank.height > base.y
        && tank.x < base.x + base.size
        && tank.x + tank.width > base.x
        ) top = true;

    if(tank.y < base.y + base.size //bot side of base
        && tank.y + tank.height / 5 > base.y + base.size * 4/5
        && tank.x < base.x + base.size
        && tank.x + tank.width > base.x
        ) bot = true;

    //Set new position for tank if tank touch Base
    if (left) tank.x = base.x - tank.width;
    if (right) tank.x = base.x + base.size;
    if (top) tank.y = base.y - tank.height;
    if (bot) tank.y = base.y + base.size;


    bot = false, top = false, left= false, right= false;

    //Collison detection between Tank and Base2
    if(tank.x + tank.width * 4/5 < base2.x + base2.size/5 //left side of base2
        && tank.x + tank.width > base2.x
        && tank.y < base2.y + base2.size
        && tank.y + tank.height > base2.y
        ) left = true;

    if(tank.x < base2.x + base2.size //right side of base2
        && tank.x + tank.width / 5 > base2.x + base2.size * 4/5 
        && tank.y < base2.y + base2.size
        && tank.y + tank.height > base2.y
        ) right = true;

    if(tank.y + tank.height * 4/5 < base2.y + base2.size/5 //top side of base2
        && tank.y + tank.height > base2.y
        && tank.x < base2.x + base2.size
        && tank.x + tank.width > base2.x
        ) top = true;

    if(tank.y < base2.y + base2.size //bot side of base2
        && tank.y + tank.height / 5 > base2.y + base2.size * 4/5
        && tank.x < base2.x + base2.size
        && tank.x + tank.width > base2.x
        ) bot = true;

    //Set new position for tank if tank touch Base2
    if (left) tank.x = base2.x - tank.width;
        if (right) tank.x = base2.x + base2.size;
        if (top) tank.y = base2.y - tank.height;
        if (bot) tank.y = base2.y + base2.size;
}

function collTanks() {
    if(tank.y < tank2.y + tank.height
        && tank.y + tank.height/5 > tank2.y + 2*tank.height/5
        && tank.x < tank2.x + tank.width
        && tank.x + tank.width > tank2.x
        ){
            tank.y += tank.speed;
            tank2.y -= tank.speed;
        }

    if(tank2.y < tank.y + tank.height
        && tank2.y + tank.height/5 > tank.y + 2*tank.height/5
        && tank2.x < tank.x + tank.width
        && tank2.x + tank.width > tank.x
        ){
            tank.y -= tank.speed;
            tank2.y += tank.speed;
        }

    if(tank.x < tank2.x + tank.width
        && tank.x + tank.width/5 > tank2.x + 2*tank.width/5
        && tank.y < tank2.y + tank.width
        && tank.y + tank.width > tank2.y
        ){
            tank.x += tank.speed;
            tank2.x -= tank.speed;
        }

    if(tank2.x < tank.x + tank.width
        && tank2.x + tank2.width/5 > tank.x + 2*tank.width/5
        && tank2.y < tank.y + tank.width
        && tank2.y + tank.width > tank.y
        ){
            tank.x -= tank.speed;
            tank2.x += tank.speed;
        }
}

function tankBull() {
    for (let i = 0; i < user2Bullets.length; i++) {
        if(user2Bullets[i].x < tank.x + tank.width
        && user2Bullets[i].x + user2Bullets[i].size > tank.x
        && user2Bullets[i].y < tank.y + tank.height
        && user2Bullets[i].y + user2Bullets[i].size > tank.y
        ){
            user2Bullets = user2Bullets.filter(function(bullet) {
                return bullet != user2Bullets[i];
            })
            tank.life = 0;
            tank.x = startTank.x;
            tank.y = startTank.y;
        }
    }

    for (let i = 0; i < userBullets.length; i++) {
        if(userBullets[i].x < tank2.x + tank2.width
        && userBullets[i].x + userBullets[i].size > tank2.x
        && userBullets[i].y < tank2.y + tank2.height
        && userBullets[i].y + userBullets[i].size > tank2.y
        ){
            userBullets = userBullets.filter(function(bullet) {
                return bullet != userBullets[i];
            })
            tank2.life = 0;
            tank2.x = startTank2.x;
            tank2.y = startTank2.y;
        }
    }
}