var bulletTimeOut = 70; //TimeOut for making new bullet
var bulletID = 1; //Bullet id (we use id to delet the bullet)

function makeBullet() { //function for making bullets
    if(tank.fire == 1 && tank.fireTimeOut >= bulletTimeOut) {
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
}

function drawBullet() { //main function for draw Bullet
    makeBullet();
    CollBulletAndWall()

    for (let i = 0; i < userBullets.length; i++) {
        if(userBullets[i].direction[0] == 1){ //go up
            userBullets[i].y -= (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 10, 85, 5, 7, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        else if(userBullets[i].direction[1] == 1) { //go down
            userBullets[i].y += (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 42, 70, 5, 7, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        else if(userBullets[i].direction[2] == 1) { //go right
            userBullets[i].x += (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 143, 52, 7, 5, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        else if(userBullets[i].direction[3] == 1) { //go left
            userBullets[i].x -= (Math.floor(rScreen / 26 * 1000) / 1000)/3;
            c.drawImage(texture, 61, 100, 7, 5, userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size)
        }
        //c.fillRect(userBullets[i].x, userBullets[i].y, userBullets[i].size, userBullets[i].size);       
    }
}

function CollBulletAndWall() {//Function for collison detection between bullet and walls
    let bulletSize = (Math.floor(rScreen / 26 * 1000) / 1000) /2; //set new bullet size
    let deleteBullet = [] //array for bullets we will delete later
    let deleteWall = [] //array for walls we will delete later
    for (let i = 0; i < userBullets.length; i++) { //watchig for every bullet
        for (let j = 0; j < breakBlock.length; j++) { //watching for every breakble block
            if (userBullets[i].x < breakBlock[j].x + (Math.floor(rScreen / 26 * 1000) / 1000) //detection
            && userBullets[i].x + bulletSize > breakBlock[j].x
            && userBullets[i].y < breakBlock[j].y + (Math.floor(rScreen / 26 * 1000) / 1000)
            && userBullets[i].y + bulletSize > breakBlock[j].y
            ) {
                deleteBullet.push(userBullets[i].id); //add bullets id in array for delete
                deleteWall.push(breakBlock[j].id); //add walls id in array for delete
            }
        }
        for (let j = 0; j < unBreakBlock.length; j++) { //watching for every unbreakble block
            if (userBullets[i].x < unBreakBlock[j].x + (Math.floor(rScreen / 26 * 1000) / 1000) //detection
            && userBullets[i].x + bulletSize > unBreakBlock[j].x
            && userBullets[i].y < unBreakBlock[j].y + (Math.floor(rScreen / 26 * 1000) / 1000)
            && userBullets[i].y + bulletSize > unBreakBlock[j].y
            ) deleteBullet.push(userBullets[i].id); //add bullets id in array for delete
        }


        //Collison detection between bullet and canvas walls

        //add bullets id in array for delete, if touch left side of canvas: 
        if (userBullets[i].x < 0) deleteBullet.push(userBullets[i].id);
        //add bullets id in array for delete, if touch right side of canvas: 
        if (userBullets[i].x > canvas.width) deleteBullet.push(userBullets[i].id); 
        //add bullets id in array for delete, if touch top side of canvas:
        if (userBullets[i].y < 0) deleteBullet.push(userBullets[i].id); 
        //add bullets id in array for delete, if touch bot side of canvas:
        if (userBullets[i].y > canvas.height) deleteBullet.push(userBullets[i].id); 

        //Game over, if bullet touch base
        if(userBullets[i].x < base.x + base.size //detection
        && userBullets[i].x + bulletSize > base.x
        && userBullets[i].y < base.y + base.size
        && userBullets[i].y + bulletSize > base.y
            ) changeS(4);
    }

    for (let i = 0; i < deleteBullet.length; i++) { //delete every bullet that had contact with the wall
        userBullets = userBullets.filter(function(bullet) { 
            return bullet.id != deleteBullet[i];
        })
    }
    for (let i = 0; i < deleteWall.length; i++) { //delete every wall that had contact with the bullet
        breakBlock = breakBlock.filter(function(wall) {
            return wall.id != deleteWall[i];
        })  
    }
}