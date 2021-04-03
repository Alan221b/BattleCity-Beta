var xstop = [];
var ystop = [];
var base = {
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
        else if(map[i] == 3) { tank.x = x, tank.y = y } //adding x and y position for tenk
        else if(map[i] == 4) { base.x = x, base.y = y, base.size = (Math.floor(rScreen / 26 * 1000) / 1000) * 2 } //adding x and y position for base
    }
}

function drawMap() { //draw blocks, tenk...
    let blockSize = (Math.floor(rScreen / 26 * 1000) / 1000);

    for (let i = 0; i < breakBlock.length; i++) //draw breakble blocks
        c.drawImage(texture, 0, 0, 16, 16, breakBlock[i].x, breakBlock[i].y, blockSize, blockSize);
    for (let i = 0; i < unBreakBlock.length; i++) //draw unbreakble blocks
        c.drawImage(texture, 32, 0, 16, 16, unBreakBlock[i].x, unBreakBlock[i].y, blockSize, blockSize);
        
    //draw base
    c.drawImage(texture, 96, 0, 32, 32, base.x, base.y, base.size, base.size);
}

map = [ //map variable for render
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, //x: 26
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,
    2, 2, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0//y: 27
]; //1: breakble blocks, 2: unbreakble blocks, 3: tenk possitions, 4: base position