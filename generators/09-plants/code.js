import { getColour, distanceSquared, randomItem, getLast, getLastX, randomBetween } from "../util.js"

const colours = [{"name":"Timberwolf","hex":"dad7cd","rgb":[218,215,205],"cmyk":[0,1,6,15],"hsb":[46,6,85],"hsl":[46,15,83],"lab":[86,-1,5]},{"name":"Laurel Green","hex":"a3b18a","rgb":[163,177,138],"cmyk":[8,0,22,31],"hsb":[82,22,69],"hsl":[82,20,62],"lab":[70,-12,18]},{"name":"Fern Green","hex":"588157","rgb":[88,129,87],"cmyk":[32,0,33,49],"hsb":[119,33,51],"hsl":[119,19,42],"lab":[50,-23,18]},{"name":"Hunter Green","hex":"3a5a40","rgb":[58,90,64],"cmyk":[36,0,29,65],"hsb":[131,36,35],"hsl":[131,22,29],"lab":[35,-18,11]},{"name":"Brunswick Green","hex":"344e41","rgb":[52,78,65],"cmyk":[33,0,17,69],"hsb":[150,33,31],"hsl":[150,20,25],"lab":[31,-13,5]}];
const HALF = Math.PI;
const FULL = Math.PI * 2;
const leafCurve = Math.PI / 8;

const brickHeight = 40;
const brickwidth = 100;
const brickGap = 10;

const data = {
    leaves : [],
    vines : [],
    seethe : 0,
    leafCount : 0
}

const newLeaf = (X, Y) =>
{
    data.leaves.push(
        {
            x: X,
            y: Y,
            d: 0,
            l: 50
        }
    )
}

const generateVine = (startX, startY) =>
{
    let x = startX;
    let y = startY;
    const points = [];
    while (y < 512)
    {
        points.push({x, y});
        x += randomBetween(-10, 10)
        y += randomBetween(-4, 15)
        
        if (Math.random() > 0.95 && data.vines.length < 5)
            generateVine(x, y);
        
        data.leafCount++;
        if (data.leafCount % 8 == 0)
            newLeaf(x,y);
    }
    
    data.vines.push(points);
}

const drawLeaf = (p5, leaf) =>
{
    const d = leaf.d + p5.noise(leaf.x, leaf.y, data.seethe);
    const x = leaf.x + ((leaf.l/2) * Math.cos(d));
    const y = leaf.y + ((leaf.l/2) * Math.sin(d));

    p5.arc(x + (9  * Math.sin(d)), y - (9  * Math.cos(d)), leaf.l, leaf.l, 0 + leafCurve + d, HALF - leafCurve + d, p5.CHORD)
    p5.arc(x - (9  * Math.sin(d)), y + (9  * Math.cos(d)), leaf.l, leaf.l, HALF + leafCurve + d, FULL - leafCurve + d, p5.CHORD)
}

const renderBricks = (p5) =>
{
    p5.fill("#780000")
    p5.noStroke();

    let xOffset = -22;

    for (let y = -10; y < 512; y += brickHeight + brickGap)
    {
        for (let x = xOffset; x < 512; x += brickwidth + brickGap)
        {
            p5.rect(x, y, brickwidth, brickHeight, 5);
        }
        xOffset -= brickwidth / 2;
    }
    
}

export default {
    setup : (p5) => {
        p5.background(43);
        p5.noiseDetail(4, 0.5);
    },
    regenerate : () => {
        data.leaves = [];
        data.vines = [];
        data.seethe = 0;

        generateVine(randomBetween(0,512), 0);
    },
    draw : (p5) => {
        data.seethe += 0.005;
        p5.background(getColour(p5, colours[0]));

        renderBricks(p5)

        p5.stroke(getColour(p5, colours[2]))
        p5.strokeWeight(10)

        data.vines.forEach(vine => {
            vine.forEach((point, index) =>
            {
                if (index === vine.length -1)
                    return;
                p5.line(point.x, point.y, vine[index+1].x, vine[index+1].y)
            })
        })

        p5.fill(getColour(p5, colours[2]));
        p5.stroke(getColour(p5, colours[3]))
        p5.strokeWeight(3);
        data.leaves.forEach(leaf => drawLeaf(p5, leaf));
    },
    prompt : "Plants"
}