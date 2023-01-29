import { angleBetween, randomItem, isBetween, distance, randomBetween, randomIntBetween, clamp } from "../util.js"

const count = 16;

const colours = ["#22223b","#4a4e69","#9a8c98","#c9ada7","#f2e9e4"]

const drawCircle = (p5, size, col) => 
{
    const x = Math.sin(p5.frameCount * 0.01) * 10
    const y = Math.cos(p5.frameCount * 0.01) * 10
    p5.translate(x, y)
    p5.fill(p5.color(col))
    p5.circle(0,0,size + Math.sin(p5.frameCount * 0.005) * 30)
}

export default {
    setup : (p5) => {
        p5.background(43);
        p5.noiseDetail(6, 0.2);
        
    },
    regenerate : () => {
        
    },
    draw : (p5) => {
        p5.background(43);
        p5.noStroke();
        

        
        p5.fill(255);
        p5.circle(256,256,400 + p5.noise(0,0,p5.frameCount) * 20)
        p5.fill(43);
        p5.circle(256,256,300 + p5.noise(0,0,p5.frameCount + 5) * 20)
        
    },
    prompt : "Minimalism"
}