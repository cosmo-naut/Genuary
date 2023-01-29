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
        p5.background(p5.color(colours[0]));
        p5.noStroke();
        

        
        const step = 512 / count;
        p5.translate(step/2,step/2)
        
        for  (let x = 0; x < count; x++)
        {
            for  (let y = 0; y < count; y++)
            {
                const value = Math.floor(p5.noise(x * 0.5,y * 0.5, p5.frameCount * 0.001) * 4) + 1;

                for (let i = 0; i < value; i++)
                {
                    p5.fill(p5.color(colours[i+1]))
                    p5.circle(x * step, y * step, step - (i * 5))
                }
            }
        }

        p5.fill(p5.color("#00FF00"))
        p5.circle(12 * step,12 * step,10)
        
    },
    prompt : "Minimalism"
}