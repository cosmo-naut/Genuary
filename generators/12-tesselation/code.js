import { getColour, distanceSquared, randomItem, getLast, getLastX, randomBetween, randomIntBetween } from "../util.js"

const colours = ["ffbe0b","fb5607","ff006e","8338ec","3a86ff"]

const dPI = Math.PI * 2;
const hexAngle = dPI / 6;
let yScroll = 0;
let xScroll = 0;
let zScroll = 0;

const data = {
    
}
const drawHex = (p5, x, y, r) =>
{
    p5.beginShape();
    for (let i = 0; i < 6; i++)
    {
        const px = Math.sin(hexAngle * i) * r;
        const py = Math.cos(hexAngle * i) * r;

        p5.vertex(px + x, py + y);
    }
    p5.endShape(p5.CLOSE);
}



export default {
    setup : (p5) => {
        p5.background(43);
        p5.noiseDetail(4, 0.6);
        p5.pixelDensity(1)
        p5.loadPixels();
    },
    regenerate : () => {
        
    },
    draw : (p5) => {
        let r = 40;
        p5.background(255);
        p5.fill(0);

        xScroll -= 0.3;
        xScroll = xScroll % (r * 2);
        yScroll -= 0.2;

        let offset = false;
        for (let y = yScroll; y < 560; y += r * 1.7)
        {
            for (let x = offset? xScroll-r: xScroll; x < 550; x += r * 2)
            {
                drawHex(p5, x, y, r)
            }
            offset = !offset;
        }

        p5.loadPixels();
        zScroll += 0.03;
        for (let x = 0; x < 512; x++)
        {
            for (let y = 0; y < 512; y++)
            {
                
                if (p5.pixels[(x * 4) + (y * 4 * x)] < 1 ||
                    p5.pixels[((x+1) * 4) + ((1 + y) * 4 * x + 1)] < 1)
                {
                    continue;
                }
                const noiseLevel = p5.noise((x * 0.007), (y * 0.007), zScroll);
                const val = noiseLevel * 5;
                let col = p5.color("#" + colours[Math.floor(val)]);
                p5.set(x, y, col);
            }
        }
        p5.updatePixels();


    },
    prompt : "Tesselation"
}