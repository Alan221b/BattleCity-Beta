var bulletTimeOut = 70;
var bulletID = 1;

function makeBullet() {
    if(tank.fire == 1 && tank.fireTimeOut >= bulletTimeOut) {
        let bulletSize = (Math.floor(rScreen / 26 * 1000) / 1000) /3;
        userBullets.push
        ({
            x: tank.x + tank.width/2 - bulletSize/2,
            y: tank.y + tank.height/2 - bulletSize/2, 
            size: bulletSize, 
            direction: tank.fire_direction,
            id: bulletID
        });

        bulletID++
        tank.fireTimeOut = 0;
    }
    else tank.fireTimeOut++
}

function drawBullet() {
    makeBullet();
    CollBulletAndWall()

    for (let i = 0; i < userBullets.length; i++) {
        if(userBullets[i].direction[0] == 1){
            userBullets[i].y -= (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 10, 85, 5, 7, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        else if(userBullets[i].direction[1] == 1) {
            userBullets[i].y += (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 42, 70, 5, 7, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        else if(userBullets[i].direction[2] == 1) { 
            userBullets[i].x += (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 143, 52, 7, 5, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        else if(userBullets[i].direction[3] == 1) {
            userBullets[i].x -= (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 61, 100, 7, 5, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        //c.fillRect(userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size);       
    }
}

function CollBulletAndWall() {
    let bulletSize = (Math.floor(rScreen / 26 * 1000) / 1000) /2;
    let deleteBullet = []
    let deleteWall = []
    for (let i = 0; i < userBullets.length; i++) {
        for (let j = 0; j < breakBlock.length; j++) {
            if (userBullets[i].x < breakBlock[j].x + (Math.floor(rScreen / 26 * 1000) / 1000)
            && userBullets[i].x + bulletSize > breakBlock[j].x
            && userBullets[i].y < breakBlock[j].y + (Math.floor(rScreen / 26 * 1000) / 1000)
            && userBullets[i].y + bulletSize > breakBlock[j].y
            ) {
                deleteBullet.push(userBullets[i].id);
                deleteWall.push(breakBlock[j].id);
            }
        }
        for (let j = 0; j < unBreakBlock.length; j++) {
            if (userBullets[i].x < unBreakBlock[j].x + (Math.floor(rScreen / 26 * 1000) / 1000)
            && userBullets[i].x + bulletSize > unBreakBlock[j].x
            && userBullets[i].y < unBreakBlock[j].y + (Math.floor(rScreen / 26 * 1000) / 1000)
            && userBullets[i].y + bulletSize > unBreakBlock[j].y
            ) deleteBullet.push(userBullets[i].id);
        }

        if (userBullets[i].x < 0) deleteBullet.push(userBullets[i].id);
        if (userBullets[i].x > canvas.width) deleteBullet.push(userBullets[i].id);
        if (userBullets[i].y < 0) deleteBullet.push(userBullets[i].id);
        if (userBullets[i].y > canvas.height) deleteBullet.push(userBullets[i].id);

        if(userBullets[i].x < base.x + base.size
        && userBullets[i].x + bulletSize > base.x
        && userBullets[i].y < base.y + base.size
        && userBullets[i].y + bulletSize > base.y
            ) changeS(4);
    }

    for (let i = 0; i < deleteBullet.length; i++) {
        userBullets = userBullets.filter(function(bullet) { 
            return bullet.id != deleteBullet[i];
        })
    }
    for (let i = 0; i < deleteWall.length; i++) {
        breakBlock = breakBlock.filter(function(wall) {
            return wall.id != deleteWall[i];
        })  
    }
}