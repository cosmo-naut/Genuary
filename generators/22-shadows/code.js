import { getColour, angleBetween, randomItem, isBetween, distance, randomBetween, randomIntBetween } from "../util.js"

const segmentCount = 360;

export default {
    setup : (p5) => {
        p5.background(43);
        p5.noiseDetail(4, 0.5); 
    },
    regenerate : () => {
        
    },
    draw : (p5) => {
        p5.noStroke();
        p5.background(43);
        p5.fill(255)
        const segment = p5.TAU / segmentCount;
        for (let i = 0; i < segmentCount; i++)
        {
            
            const val = segment * i;
            const length = p5.noise(p5.frameCount * 0.001, Math.sin(i * 0.01)) * 300;
            const nextLength = p5.noise(p5.frameCount * 0.001, (i+1) * 0.01) * 400;
            p5.triangle(256,256, 256+Math.sin(val) * length, 256+Math.cos(val) * length, 256+Math.sin(val+segment) * nextLength, 256+Math.cos(val+segment) * nextLength);
        }

        p5.fill(43)
        p5.circle(256,256,100);
        p5.circle(256,346,80);
        p5.circle(256,416,60);
        p5.circle(256,466,40);
        p5.circle(256,496,20);
    },
    prompt : "Shadows"
}