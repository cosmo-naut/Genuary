import { getColour, angleBetween, randomItem, isBetween, distance, randomBetween, randomIntBetween } from "../util.js"

const segmentCount = 360;

const drawCircle = (p5, x, y, r) =>
{
    const segment = p5.TAU / segmentCount;
    for (let i = 0; i < segmentCount; i++)
    {
        
        const val = segment * i;
        const length = r - (p5.noise(i * 0.01, p5.frameCount * 0.01)* 10);
        const nextLength =  r - (p5.noise(1 + i * 0.01, p5.frameCount * 0.01)* 10);
        p5.line(x+Math.sin(val) * length, y+Math.cos(val) * length, x+Math.sin(val+segment) * nextLength, y+Math.cos(val+segment) * nextLength);
    }
}

export default {
    setup : (p5) => {
        p5.background(43);
        p5.noiseDetail(4, 0.5); 
    },
    regenerate : () => {
        
    },
    draw : (p5) => {
        p5.background(43);
        p5.noFill()
        p5.stroke(255);
        p5.strokeWeight(1);
        
        for (let i = 200; i > 100; i -= 7)
        {
            drawCircle(p5, 256 + Math.sin(p5.frameCount * 0.05) * 5, 256 + Math.cos(p5.frameCount * 0.05) * 5, i);
        }
        for (let i = 198; i > 100; i -= 6)
        {
            drawCircle(p5, 256, 256, i);
        }

        p5.fill(43)
    },
    prompt : "Moiré"
}