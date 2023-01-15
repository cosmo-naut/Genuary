import { getColour, angleBetween, randomItem, clamp, distance, randomBetween, randomIntBetween } from "../util.js"

const data = {

}

export default {
    setup : (p5) => {
        p5.background(128);
    },
    regenerate : () => {
        
    },
    draw : (p5) => {
        p5.noStroke();
        const rate = p5.frameCount * 0.01;

        const bX = 256 - Math.sin(rate) * 256;
        const bY = 256 +  Math.cos(rate) * 256;
        const wX = 256 + Math.sin(rate) * 256;
        const wY = 256 -  Math.cos(rate) * 256;
        p5.strokeWeight(0.5)
        
        p5.stroke(0)
        // p5.ellipse(bX, bY, 30, 30);
        // p5.fill(255)
        // p5.ellipse(wX, wY, 30, 30);
        p5.stroke(255 * Math.sin(rate));
        p5.line(bX * Math.sin(-rate),bY,wX * Math.sin(-rate),wY);
        p5.stroke(255 * Math.sin(rate));
        p5.line(bX * Math.sin(rate),wY,wX * Math.sin(rate),bY);
        p5.stroke(255 * Math.sin(rate));
        p5.line(512 - wX * Math.sin(-rate),bY,512 - bX * Math.sin(-rate),wY);
        p5.stroke(255 * Math.sin(rate));
        p5.line(512 - wX * Math.sin(rate),wY,512 - bX * Math.sin(rate),bY);


        p5.stroke(255 * Math.sin(rate));
        p5.line(wX,bY * Math.cos(rate),bX,wY * Math.cos(rate));
        p5.stroke(255 * Math.sin(rate));
        p5.line(bX,512 - bY * Math.cos(rate),wX,512 - wY * Math.cos(rate));
        p5.stroke(255 * Math.sin(rate));
        p5.line(wX,wY * -Math.cos(rate), bX,bY * -Math.cos(rate));
        p5.stroke(255 * Math.sin(rate));
        p5.line(wX, 512 - bY * -Math.cos(rate), bX, 512 - wY * -Math.cos(rate));
    },
    prompt : "Sine Waves"
}