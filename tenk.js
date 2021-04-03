let tenkSize = Math.round(screen.getBoundingClientRect().width);
let finished = true;
const speed = 10

var tenk = {
    x: 0,
    y: 0,
    width: 2 * (Math.floor(tenkSize / 26 * 1000) / 1000),
    height: 2 * (Math.floor(tenkSize / 26 * 1000) / 1000),
    direction: 0, //top, down, right, left
    fire_direction:[1, 0, 0, 0], //top, down, right, left
    fire: 0,
    fireTimeOut: 100,
    speed: (Math.floor(tenkSize / 26 * 1000) / 1000)/speed,
}

window.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
        case 38: //arrow top
            tenk.direction = 1;
            tenk.fire_direction = [1, 0, 0, 0];
            break;
        case 40: //arrow down
            tenk.direction = 2;
            tenk.fire_direction = [0, 1, 0, 0];
            break;
        case 39: //arrow right
            tenk.direction = 3;
            tenk.fire_direction = [0, 0, 1, 0];
            break;
        case 37: //arrow left
            tenk.direction = 4;
            tenk.fire_direction = [0, 0, 0, 1];
            break;
        case 32: //space
            tenk.fire = 1;
            break;
    };
});

window.addEventListener('keyup', (e) => {
    switch(e.keyCode) {
        case 38: //arrow top
            tenk.direction = 0;
            break;
        case 40: //arrow down
            tenk.direction = 0;
            break;
        case 39: //arrow right
            tenk.direction = 0;
            break;
        case 37: //arrow left
            tenk.direction = 0;
            break;
        case 32: //space
            tenk.fire = 0;
            break;
    };
});

function drawTenk() {
    if(tenk.direction == 1){ //top
        tenk.y -= tenk.speed; 
    } else if(tenk.direction == 2){ //down
        tenk.y += tenk.speed;
    } else if(tenk.direction == 3){ //right
        tenk.x += tenk.speed;
    } else if(tenk.direction == 4){ //left
        tenk.x -= tenk.speed;
    }

    collisonTenkAndWall()

    if(tenk.fire_direction[0] == 1) c.drawImage(texture, 49, 1, 30, 31, tenk.x, tenk.y, tenk.width, tenk.height);
    else if(tenk.fire_direction[1] == 1) c.drawImage(texture, 30, 39, 30, 31, tenk.x, tenk.y, tenk.width, tenk.height);
    else if(tenk.fire_direction[2] == 1) c.drawImage(texture, 109, 40, 30, 31, tenk.x, tenk.y, tenk.width, tenk.height);
    else if(tenk.fire_direction[3] == 1) c.drawImage(texture, 69, 39, 30, 31, tenk.x, tenk.y, tenk.width, tenk.height);
    
}

function collisonTenkAndWall() {
    let bot = -1, top = -1, left= -1, right= -1;
    for (let i = 0; i < breakBlock.length; i++) {
        if (breakBlock[i].botColl.y < tenk.y + (tenk.height * 3/47) && //bottom side
            breakBlock[i].botColl.secy > tenk.y &&
            breakBlock[i].botColl.x < tenk.x + tenk.width &&
            breakBlock[i].botColl.secx > tenk.x
            ) bot = i;

        if (breakBlock[i].topColl.y < tenk.y + tenk.height && //top side
            breakBlock[i].topColl.secy > tenk.y + (tenk.height * 43.5/47) &&
            breakBlock[i].topColl.x < tenk.x + tenk.width &&
            breakBlock[i].topColl.secx > tenk.x
            ) top = i;

        if (breakBlock[i].leftColl.x < tenk.x + tenk.width && //left side
            breakBlock[i].leftColl.secx > tenk.x + (tenk.width * 43.5/47) &&
            breakBlock[i].leftColl.y < tenk.y + tenk.height &&
            breakBlock[i].leftColl.secy > tenk.y
            ) left = i;
        
        if (breakBlock[i].rightColl.x < tenk.x + (tenk.width * 3/47) && //right side
            breakBlock[i].rightColl.secx > tenk.x &&
            breakBlock[i].rightColl.y < tenk.y + tenk.height &&
            breakBlock[i].rightColl.secy > tenk.y
            ) right = i;
    }

    if(bot != -1) tenk.y = breakBlock[bot].botColl.secy;
    if(top != -1) tenk.y = breakBlock[top].topColl.y - tenk.height;
    if(left != -1) tenk.x = breakBlock[left].leftColl.x - tenk.width;
    if(right != -1) tenk.x = breakBlock[right].rightColl.secx;

    bot = -1, top = -1, left= -1, right= -1;

    for (let i = 0; i < unBreakBlock.length; i++) {
        if (unBreakBlock[i].botColl.y < tenk.y + (tenk.height * 3/47) && //bottom side
            unBreakBlock[i].botColl.secy > tenk.y &&
            unBreakBlock[i].botColl.x < tenk.x + tenk.width &&
            unBreakBlock[i].botColl.secx > tenk.x
            ) bot = i;

        if (unBreakBlock[i].topColl.y < tenk.y + tenk.height && //top side
            unBreakBlock[i].topColl.secy > tenk.y + (tenk.height * 43.5/47) &&
            unBreakBlock[i].topColl.x < tenk.x + tenk.width &&
            unBreakBlock[i].topColl.secx > tenk.x
            ) top = i;

        if (unBreakBlock[i].leftColl.x < tenk.x + tenk.width && //left side
            unBreakBlock[i].leftColl.secx > tenk.x + (tenk.width * 43.5/47) &&
            unBreakBlock[i].leftColl.y < tenk.y + tenk.height &&
            unBreakBlock[i].leftColl.secy > tenk.y
            ) left = i;
        
        if (unBreakBlock[i].rightColl.x < tenk.x + (tenk.width * 3/47) && //right side
            unBreakBlock[i].rightColl.secx > tenk.x &&
            unBreakBlock[i].rightColl.y < tenk.y + tenk.height &&
            unBreakBlock[i].rightColl.secy > tenk.y
            ) right = i;
    }

    if(bot != -1) tenk.y = unBreakBlock[bot].botColl.secy;
    if(top != -1) tenk.y = unBreakBlock[top].topColl.y - tenk.height;
    if(left != -1) tenk.x = unBreakBlock[left].leftColl.x - tenk.width;
    if(right != -1) tenk.x = unBreakBlock[right].rightColl.secx;

    if(tenk.x < 0) tenk.x = 0;
    if(tenk.x + tenk.width > canvas.width) tenk.x = canvas.width - tenk.width;
    if(tenk.y < 0) tenk.y = 0;
    if(tenk.y + tenk.height > canvas.height) tenk.y = canvas.height - tenk.width + 1;

    bot = false, top = false, left= false, right= false;

    if(tenk.x + tenk.width * 4/5 < base.x + base.size/5 
    && tenk.x + tenk.width > base.x
    && tenk.y < base.y + base.size
    && tenk.y + tenk.height > base.y
        ) left = true;

    if(tenk.x < base.x + base.size
    && tenk.x + tenk.width / 5 > base.x + base.size * 4/5
    && tenk.y < base.y + base.size
    && tenk.y + tenk.height > base.y
        ) right = true;

    if(tenk.y + tenk.height * 4/5 < base.y + base.size/5
    && tenk.y + tenk.height > base.y
    && tenk.x < base.x + base.size
    && tenk.x + tenk.width > base.x
        ) top = true;

    if(tenk.y < base.y + base.size
    && tenk.y + tenk.height / 5 > base.y + base.size * 4/5
    && tenk.x < base.x + base.size
    && tenk.x + tenk.width > base.x
        ) bot = true;

    if (left) tenk.x = base.x - tenk.width;
    if (right) tenk.x = base.x + base.size;
    if (top) tenk.y = base.y - tenk.height;
    if (bot) tenk.y = base.y + base.size - 0.5;
}