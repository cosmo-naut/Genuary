import { randomBetween, randomIntBetween, randomItem, distanceSquared } from "../util.js"

const rawColours = [{"name":"Rich Black FOGRA 29","hex":"001219","rgb":[0,18,25],"cmyk":[100,28,0,90],"hsb":[197,100,10],"hsl":[197,100,5],"lab":[5,-4,-6]},{"name":"Blue Sapphire","hex":"005f73","rgb":[0,95,115],"cmyk":[100,17,0,55],"hsb":[190,100,45],"hsl":[190,100,23],"lab":[37,-16,-18]},{"name":"Viridian Green","hex":"0a9396","rgb":[10,147,150],"cmyk":[93,2,0,41],"hsb":[181,93,59],"hsl":[181,88,31],"lab":[55,-30,-11]},{"name":"Middle Blue Green","hex":"94d2bd","rgb":[148,210,189],"cmyk":[30,0,10,18],"hsb":[160,30,82],"hsl":[160,41,70],"lab":[80,-24,4]},{"name":"Medium Champagne","hex":"e9d8a6","rgb":[233,216,166],"cmyk":[0,7,29,9],"hsb":[45,29,91],"hsl":[45,60,78],"lab":[87,-2,27]},{"name":"Gamboge","hex":"ee9b00","rgb":[238,155,0],"cmyk":[0,35,100,7],"hsb":[39,100,93],"hsl":[39,100,47],"lab":[71,22,75]},{"name":"Alloy Orange","hex":"ca6702","rgb":[202,103,2],"cmyk":[0,49,99,21],"hsb":[30,99,79],"hsl":[30,98,40],"lab":[54,34,62]},{"name":"Rust","hex":"bb3e03","rgb":[187,62,3],"cmyk":[0,67,98,27],"hsb":[19,98,73],"hsl":[19,97,37],"lab":[44,48,55]},{"name":"Rufous","hex":"ae2012","rgb":[174,32,18],"cmyk":[0,82,90,32],"hsb":[5,90,68],"hsl":[5,81,38],"lab":[38,55,44]},{"name":"Ruby Red","hex":"9b2226","rgb":[155,34,38],"cmyk":[0,78,75,39],"hsb":[358,78,61],"hsl":[358,64,37],"lab":[35,49,29]}]

const data = {
    colours : [],
    xOffset : 0,
    yOffset : 0,
    circles: []
}

export default {
    setup : (p5) => {
        p5.background(34);
        p5.noiseDetail(4, 0.4);
        p5.pixelDensity(1)
        p5.loadPixels();
        console.log(p5.pixels.length);
        console.log(Math.sqrt(p5.pixels.length));
        console.log(rawColours.length);
        data.colours = rawColours.map(c => p5.color(c.rgb[0], c.rgb[1], c.rgb[2]));
    },
    regenerate : () => {
        data.circles = [];
        data.circles.push({
            x: randomBetween(0, 512),
            y: randomBetween(0, 512),
            r: randomBetween(120, 400),
        });
        data.circles.push({
            x: randomBetween(0, 512),
            y: randomBetween(0, 512),
            r: randomBetween(120, 400),
        });
    },
    draw : (p5) => {
        p5.loadPixels();
        data.xOffset += 0.003;
        for (let x = 0; x < 512; x++)
        {
            for (let y = 0; y < 512; y++)
            {
                const noiseLevel = p5.noise((x * 0.007), (y * 0.007), data.xOffset);
                const val = noiseLevel * 10;
                let col = data.colours[Math.floor(val)];

                if ((val > 3.95 && val < 4.05) || (val > 4.95 && val < 5.05))
                {
                    col = 0;
                }
                
                p5.set(x, y, col);
            }
        }
        p5.updatePixels();
        p5.noFill();
        p5.stroke(255);
        p5.strokeWeight(10);
        data.circles.forEach(circle => p5.ellipse(circle.x, circle.y, circle.r));
    },
    prompt : "Intersections"
}