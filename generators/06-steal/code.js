import { getColour, distanceSquared, randomItem, getLast, getLastX } from "../util.js"

// const colours = [{"name":"Timberwolf","hex":"dad7cd","rgb":[218,215,205],"cmyk":[0,1,6,15],"hsb":[46,6,85],"hsl":[46,15,83],"lab":[86,-1,5]},{"name":"Laurel Green","hex":"a3b18a","rgb":[163,177,138],"cmyk":[8,0,22,31],"hsb":[82,22,69],"hsl":[82,20,62],"lab":[70,-12,18]},{"name":"Fern Green","hex":"588157","rgb":[88,129,87],"cmyk":[32,0,33,49],"hsb":[119,33,51],"hsl":[119,19,42],"lab":[50,-23,18]},{"name":"Hunter Green","hex":"3a5a40","rgb":[58,90,64],"cmyk":[36,0,29,65],"hsb":[131,36,35],"hsl":[131,22,29],"lab":[35,-18,11]},{"name":"Brunswick Green","hex":"344e41","rgb":[52,78,65],"cmyk":[33,0,17,69],"hsb":[150,33,31],"hsl":[150,20,25],"lab":[31,-13,5]}];
const colours = [{"name":"Black","hex":"000000","rgb":[0,0,0],"cmyk":[0,0,0,100],"hsb":[0,0,0],"hsl":[0,0,0],"lab":[0,0,0]},{"name":"Oxford Blue","hex":"14213d","rgb":[20,33,61],"cmyk":[67,46,0,76],"hsb":[221,67,24],"hsl":[221,51,16],"lab":[13,5,-20]},{"name":"Orange Web","hex":"fca311","rgb":[252,163,17],"cmyk":[0,35,93,1],"hsb":[37,93,99],"hsl":[37,98,53],"lab":[74,24,76]},{"name":"Platinum","hex":"e5e5e5","rgb":[229,229,229],"cmyk":[0,0,0,10],"hsb":[0,0,90],"hsl":[0,0,90],"lab":[91,0,0]},{"name":"White","hex":"ffffff","rgb":[255,255,255],"cmyk":[0,0,0,0],"hsb":[0,0,100],"hsl":[0,0,100],"lab":[100,0,0]}];

const circleRadius = 5;
const cellDimension = 10;
const loopDuration = 160;
let t = 0;
let hotspots = [];
let lines = [];

const data = {

}

// Function adapted from https://github.com/Youssycc/wave-loop
// Check out @youssycc for more awesome stuff
const drawCircles = (p5) => {
    p5.noStroke();
    hotspots = [];
    for (let i = 0; i <= 512 / cellDimension; i++) {
        for (let j = 0; j <= 512 / cellDimension; j++) {
            const x = i * cellDimension; //x position of circle
            const y = j * cellDimension; //y position of circle
            
            //compute the scale of the displacement of each circle on the y axis
            //the displacement gets bigger when the circle is the furthest away from the top-left corner
            //const scale = p5.map(p5.dist(x, y, 0, 0), 0, p5.sqrt(2) * 512, 0, 1);
            const scale = p5.map(p5.dist(x, y, 0, 0), 0, p5.sqrt(2) * 512, 0, 1);

            //compute the final displacement using the periodicFunction for looping
            const dy = p5.map(periodicFunction(t - offset(x, y, p5)), -1, 1, -.9 * cellDimension, .9 * cellDimension) * p5.pow(scale, 3);

            //drawing the circle
            // the radius size also evolves just proportionnally with the displacement dy
            const radius = p5.map(periodicFunction(t - offset(x, y, p5)), -1, 1, circleRadius, circleRadius / 2)
            
            //the color gets whiter as dots are further away from the top-left corner
            p5.fill(fillColour(x, y, p5))
            p5.circle(x, y + dy, radius);
        }
    }
}

const periodicFunction = (p) => {
    return Math.sin(Math.PI * 2 * p);
}

const offset = (x, y, p5) => {
    return p5.noise(x * 0.01, y * 0.01, p5.frameCount * 0.005);
}

const fillColour = (x, y, p5) =>
{
    const cols = colours.map(col => p5.color(col.rgb[0], col.rgb[1], col.rgb[2]))
    cols.reverse();
    const val = Math.max(periodicFunction(offset(x, y, p5)), 0);
    const i = Math.floor(val * cols.length);

    if (i === 2 && Math.random() > 0.5)
    {
        if (hotspots.length > 0)
        {
            let h = randomItem(hotspots);
            if (distanceSquared(x,y,h.x,h.y) < 1000)
                lines.push({
                    x1: x, x2: h.x, y1: y, y2: h.y, a: 30
                });
        }
        hotspots.push({x, y});
    }

    return cols[i];
}

const drawLines = (p5) =>
{
    return;
    p5.stroke(getColour(p5, colours[2]));
    p5.strokeWeight(3)
    lines.forEach(line => {
        if (line.a-- < 0)
            return;

        p5.line(line.x1, line.y1, line.x2, line.y2);

    });
    p5.noStroke();
}

export default {
    setup : (p5) => {
        p5.background(120);
        p5.noiseDetail(4, 0.5);
    },
    regenerate : () => {

    },
    draw : (p5) => {
        t = (p5.frameCount % loopDuration) / (loopDuration);
        
        p5.background("#000000");

        drawCircles(p5);
        drawLines(p5);
    },
    prompt : "Steal Like An Artist"
}