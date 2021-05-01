var bulletTimeOut = 70; //TimeOut for making new bullet
var bulletID = 1; //Bullet id (we use id to delet the bullet)

function makeBullet() { //function for making bullets
    if(tank.fire == 1 && tank.fireTimeOut >= bulletTimeOut && tank.life == life) {
        let bulletSize = (Math.floor(rScreen / 26 * 1000) / 1000) /3; //Bullet size
        userBullets.push
        ({
            x: tank.x + tank.width/2 - bulletSize/2, //x: center of tenk(x)
            y: tank.y + tank.height/2 - bulletSize/2, //y: center of tenk(y)
            size: bulletSize, 
            direction: tank.fire_direction, //where the created bullet will go
            id: bulletID //id of bullet
        });

        bulletID++ //make next id
        tank.fireTimeOut = 0; //reset counter for new bullet
    }
    else tank.fireTimeOut++;

    if(tank2.fire == 1 && tank2.fireTimeOut >= bulletTimeOut && tank.life == life) {
        let bulletSize = (Math.floor(rScreen / 26 * 1000) / 1000) /3; //Bullet size
        user2Bullets.push
        ({
            x: tank2.x + tank2.width/2 - bulletSize/2, //x: center of tenk(x)
            y: tank2.y + tank2.height/2 - bulletSize/2, //y: center of tenk(y)
            size: bulletSize, 
            direction: tank2.fire_direction, //where the created bullet will go
            id: bulletID //id of bullet
        });

        bulletID++ //make next id
        tank2.fireTimeOut = 0; //reset counter for new bullet
    }
    else tank2.fireTimeOut++;
}

function drawBullet() { //main function for draw Bullet
    makeBullet();
    CollBulletAndWall(userBullets);
    CollBulletAndWall(user2Bullets);

    drawBull();
    drawBull2(user2Bullets);

    collBull();
}


function drawBull() {
    for (let i = 0; i < userBullets.length; i++) {
        if(userBullets[i].direction[0] == 1){ //go up
            userBullets[i].y -= (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 48, 64, 6, 9, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        else if(userBullets[i].direction[1] == 1) { //go down
            userBullets[i].y += (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 64, 64, 6, 9, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        else if(userBullets[i].direction[2] == 1) { //go right
            userBullets[i].x += (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 96, 64, 7, 6, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        else if(userBullets[i].direction[3] == 1) { //go left
            userBullets[i].x -= (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 80, 64, 7, 6, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        //c.fillRect(userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size);       
    }
}

function drawBull2(userBullets) {
    for (let i = 0; i < userBullets.length; i++) {
        if(userBullets[i].direction[0] == 1){ //go up
            userBullets[i].y -= (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 112, 64, 6, 9, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        else if(userBullets[i].direction[1] == 1) { //go down
            userBullets[i].y += (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 128, 64, 6, 9, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        else if(userBullets[i].direction[2] == 1) { //go right
            userBullets[i].x += (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 160, 64, 7, 6, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        else if(userBullets[i].direction[3] == 1) { //go left
            userBullets[i].x -= (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 144, 64, 7, 6, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        //c.fillRect(userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size);       
    }
}



function CollBulletAndWall(Bullets) {//Function for collison detection between bullet and walls
    let bulletSize = (Math.floor(rScreen / 26 * 1000) / 1000) /2; //set new bullet size
    let deleteBullet = [] //array for bullets we will delete later
    let deleteWall = [] //array for walls we will delete later
    for (let i = 0; i < Bullets.length; i++) { //watchig for every bullet
        for (let j = 0; j < breakBlock.length; j++) { //watching for every breakble block
            if (Bullets[i].x < breakBlock[j].x + (Math.floor(rScreen / 26 * 1000) / 1000) //detection
            && Bullets[i].x + bulletSize > breakBlock[j].x
            && Bullets[i].y < breakBlock[j].y + (Math.floor(rScreen / 26 * 1000) / 1000)
            && Bullets[i].y + bulletSize > breakBlock[j].y
            ) {
                deleteBullet.push(Bullets[i].id); //add bullets id in array for delete
                deleteWall.push(breakBlock[j].id); //add walls id in array for delete
            }
        }
        for (let j = 0; j < unBreakBlock.length; j++) { //watching for every unbreakble block
            if (Bullets[i].x < unBreakBlock[j].x + (Math.floor(rScreen / 26 * 1000) / 1000) //detection
            && Bullets[i].x + bulletSize > unBreakBlock[j].x
            && Bullets[i].y < unBreakBlock[j].y + (Math.floor(rScreen / 26 * 1000) / 1000)
            && Bullets[i].y + bulletSize > unBreakBlock[j].y
            ) deleteBullet.push(Bullets[i].id); //add bullets id in array for delete
        }


        //Collison detection between bullet and canvas walls

        //add bullets id in array for delete, if touch left side of canvas: 
        if (Bullets[i].x < 0) deleteBullet.push(Bullets[i].id);
        //add bullets id in array for delete, if touch right side of canvas: 
        if (Bullets[i].x > canvas.width) deleteBullet.push(Bullets[i].id); 
        //add bullets id in array for delete, if touch top side of canvas:
        if (Bullets[i].y < 0) deleteBullet.push(Bullets[i].id); 
        //add bullets id in array for delete, if touch bot side of canvas:
        if (Bullets[i].y > canvas.height) deleteBullet.push(Bullets[i].id); 

        //Game over, if bullet touch base
        if(Bullets[i].x < base.x + base.size //detection
        && Bullets[i].x + bulletSize > base.x
        && Bullets[i].y < base.y + base.size
        && Bullets[i].y + bulletSize > base.y) {
            music.currentTime = 0;
            music.pause();
            winner = 'Blue';
            changeS(3);
        }

        //Game over, if bullet touch base2
        if(Bullets[i].x < base2.x + base2.size //detection
            && Bullets[i].x + bulletSize > base2.x
            && Bullets[i].y < base2.y + base2.size
            && Bullets[i].y + bulletSize > base2.y) {
                music.currentTime = 0;
                music.pause();
                winner = 'Yellow';
                changeS(3);
            }
    }

    for (let i = 0; i < deleteBullet.length; i++) { //delete every bullet that had contact with the wall
        userBullets = userBullets.filter(function(bullet) { 
            return bullet.id != deleteBullet[i];
        })
        user2Bullets = user2Bullets.filter(function(bullet) { 
            return bullet.id != deleteBullet[i];
        })
    }
    for (let i = 0; i < deleteWall.length; i++) { //delete every wall that had contact with the bullet
        breakBlock = breakBlock.filter(function(wall) {
            return wall.id != deleteWall[i];
        })
    }
}

function collBull() {
    let deleteBull = [];
    for (let i = 0; i < userBullets.length; i++) {
        for (let j = 0; j < user2Bullets.length; j++) {
            if(userBullets[i].x + userBullets[i].size > user2Bullets[j].x
            && userBullets[i].x < user2Bullets[j].x + user2Bullets[j].size
            && userBullets[i].y + userBullets[i].size > user2Bullets[j].y
            && userBullets[i].y < user2Bullets[j].y + user2Bullets[j].size
            ){
                deleteBull.push(userBullets[i].id)
                deleteBull.push(user2Bullets[j].id)
            }
        }
    }
    for (let i = 0; i < deleteBull.length; i++) {
        userBullets = userBullets.filter(function(bullet) { 
            return bullet.id != deleteBull[i];
        })
        user2Bullets = user2Bullets.filter(function(bullet) { 
            return bullet.id != deleteBull[i];
        })
    }
}