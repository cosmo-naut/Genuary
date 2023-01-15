import { getColour, angleBetween, randomItem, clamp, distance, randomBetween, randomIntBetween } from "../util.js"



const data = {

}

const third = Math.PI * 2 / 3;

export default {
    setup : (p5) => {
        p5.background(0);
        p5.blendMode(p5.ADD)
        
    },
    regenerate : () => {
        
    },
    draw : (p5) => {
        const red = p5.color(255,0,0,25);
        const green = p5.color(0,255,0,25);
        const blue = p5.color(0,0,255,25);

        const black = p5.color(0,0,0,2);

        const distance = Math.sin(p5.frameCount * 0.005) * 360

        p5.blendMode(p5.ADD)

        const rotation = Math.sin(p5.frameCount * 0.1) + p5.frameCount * 0.11;



        p5.noStroke();
        p5.fill(red)
        p5.circle(256 + Math.sin((third * 0) + rotation) * distance, 256 + Math.cos((third * 0) + rotation) * distance, 100)
        p5.fill(green)
        p5.circle(256 + Math.sin((third * 1) + rotation) * distance, 256 + Math.cos((third * 1) + rotation) * distance, 100)
        p5.fill(blue)
        p5.circle(256 + Math.sin((third * 2) + rotation) * distance, 256 + Math.cos((third * 2) + rotation) * distance, 100)

        p5.blendMode(p5.BLEND)

        p5.fill(black);
        p5.circle(256, 256, 512 * Math.sin(p5.frameCount * 0.1));
    },
    prompt : "Reflection of a Reflection"
}