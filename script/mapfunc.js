var xstop = [];
var ystop = [];
var base = {
    x: 0,
    y: 0,
    size: 0,
}
var base2 = {
    x: 0,
    y: 0,
    size: 0,
}

function mapObj() { //automath add object to array
    let x, y;
    for (let i = 0; i < map.length; i++) {
        x = ((i + 26) % 26) * (Math.floor(rScreen / 26 * 1000) / 1000);
        y = Math.floor(i / 26) * (Math.floor(rScreen / 26 * 1000) / 1000);
        if(i < 26) xstop.push(x);
        if(i%26 == 0) ystop.push(y);
        let botColl = { //for bot side of collison detection
            x: x,
            y: y + ((Math.floor(rScreen / 26 * 1000) / 1000) * 7/10),
            secx: x + (Math.floor(rScreen / 26 * 1000) / 1000),
            secy: y + (Math.floor(rScreen / 26 * 1000) / 1000)
        };
        let topColl = { //for top side of collison detection
            x: x,
            y: y,
            secx: x + (Math.floor(rScreen / 26 * 1000) / 1000),
            secy: y + ((Math.floor(rScreen / 26 * 1000) / 1000) * 3/10)
        };
        let leftColl = { //for left side of collison detection
            x: x,
            y: y,
            secx: x + ((Math.floor(rScreen / 26 * 1000) / 1000) * 3/10),
            secy: y + (Math.floor(rScreen / 26 * 1000) / 1000)
        };
        let rightColl = { //for right side of collison detection
            x: x + ((Math.floor(rScreen / 26 * 1000) / 1000) * 7/10),
            y: y,
            secx: x + (Math.floor(rScreen / 26 * 1000) / 1000),
            secy: y + (Math.floor(rScreen / 26 * 1000) / 1000)
        }

        if(map[i] == 1) breakBlock.push({x, y, id: i, botColl, topColl, leftColl, rightColl}); //adding breakble blocks
        else if(map[i] == 2) unBreakBlock.push({x, y, id: i, botColl, topColl, leftColl, rightColl}); //adding unbreakble blocks
        else if(map[i] == 3) { tank.x = x, tank.y = y } //adding x and y position for tank
        else if(map[i] == 5) { tank2.x = x, tank2.y = y } //adding x and y position for tank2
        else if(map[i] == 4) { base.x = x, base.y = y, base.size = (Math.floor(rScreen / 26 * 1000) / 1000) * 2 } //adding x and y position for base
        else if(map[i] == 6) { base2.x = x, base2.y = y, base2.size = (Math.floor(rScreen / 26 * 1000) / 1000) * 2 } //adding x and y position for base2
        else if(map[i] == 7) bush.push({x, y}); //adding bush
    }
}

function drawMap() { //draw blocks, tenk...
    let blockSize = (Math.floor(rScreen / 26 * 1000) / 1000);

    for (let i = 0; i < breakBlock.length; i++) //draw breakble blocks
        c.drawImage(texture, 0, 0, 16, 16, breakBlock[i].x, breakBlock[i].y, blockSize, blockSize);
    for (let i = 0; i < unBreakBlock.length; i++) //draw unbreakble blocks
        c.drawImage(texture, 32, 0, 16, 16, unBreakBlock[i].x, unBreakBlock[i].y, blockSize, blockSize);
    for (let i = 0; i < bush.length; i++) //draw bushs
        c.drawImage(texture, 2, 34, 13, 13, bush[i].x, bush[i].y, blockSize, blockSize);
        
    //draw base
    c.drawImage(texture, 208, 0, 32, 32, base.x, base.y, base.size, base.size);
    c.drawImage(texture, 208, 32, 32, 32, base2.x, base2.y, base2.size, base2.size);
}

map = [ //map variable for render
    1, 1, 7, 7, 7, 7, 7, 0, 0, 0, 0, 1, 6, 0, 1, 5, 0, 0, 0, 7, 7, 7, 7, 7, 1, 1, //x: 26
    1, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 1,
    1, 7, 7, 7, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 7, 7, 7, 1,
    1, 7, 7, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7, 7, 7, 1,
    1, 7, 7, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7, 7, 7, 1,
    1, 7, 7, 7, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 7, 7, 7, 1,
    1, 7, 7, 7, 1, 1, 0, 0, 1, 1, 7, 7, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 7, 7, 7, 1,
    1, 7, 7, 7, 2, 2, 2, 0, 1, 1, 7, 7, 0, 0, 0, 0, 1, 1, 0, 0, 2, 2, 7, 7, 7, 1,
    1, 7, 7, 7, 2, 0, 0, 0, 1, 1, 7, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 7, 7, 7, 1,
    1, 7, 7, 7, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 7, 7, 7, 7,
    7, 7, 7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7,
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 7,
    0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0,
    0, 0, 2, 1, 0, 0, 0, 1, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0,
    0, 0, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7,
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 7, 7, 7,
    7, 7, 7, 0, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 7, 7, 7, 1,
    1, 7, 7, 7, 2, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 7, 1, 1, 0, 2, 2, 2, 7, 7, 7, 1,
    1, 7, 7, 7, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 7, 7, 1, 1, 0, 0, 1, 1, 7, 7, 7, 1,
    1, 7, 7, 7, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 7, 7, 1, 1, 0, 0, 1, 1, 7, 7, 7, 1,
    1, 7, 7, 7, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 7, 7, 7, 1,
    1, 7, 7, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7, 7, 7, 1,
    1, 7, 7, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7, 7, 7, 1,
    1, 7, 7, 7, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 7, 7, 7, 1,
    1, 7, 7, 7, 7, 0, 0, 0, 0, 3, 0, 1, 4, 0, 1, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 1,
    1, 1, 7, 7, 7, 7, 7, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 7, 7, 7, 7, 7, 1, 1, //y: 27
]; //1: breakble blocks, 2: unbreakble blocks, 3: tenk possitions, 4: base position



map1  = [ //map variable for render
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 6, 0, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, //x: 26
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
    1, 1, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1,
    2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2,
    1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1,
    0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0//y: 27
]; //1: breakble blocks, 2: unbreakble blocks, 3: tenk possitions, 4: tanks base, 5: tank2, 6: tanks base


map = map1;