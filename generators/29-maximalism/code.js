import { angleBetween, randomItem, isBetween, distance, randomBetween, randomIntBetween, clamp } from "../util.js"

const fillColours = ["#f72585","#b5179e","#7209b7","#560bad","#480ca8","#3a0ca3","#3f37c9","#4361ee","#4895ef","#4cc9f0"]
// const strokeColours = ["#d8e2dc","#ffffff","#ffcad4","#f4acb7","#9d8189"]
// const strokeColours = ["#faa275","#ff8c61","#ce6a85","#985277","#5c374c"]
const strokeColours = ["#007f5f","#2b9348","#55a630","#80b918","#aacc00","#bfd200","#d4d700","#dddf00","#eeef20","#ffff3f"]
const maxAge = 15;

const drawGlyph = (p5, age) =>
{
    const colIndex = Math.floor((age / maxAge) * fillColours.length)

    const c1 = p5.color(fillColours[colIndex]);
    const c2 = p5.color(fillColours[Math.min(colIndex + 1, fillColours.length - 1)]);


    p5.fill(p5.lerpColor(c1, c2, ((age / maxAge) * fillColours.length) % 1))

    p5.circle(30 * age,0,100 * age * 0.1)
    p5.circle(-30 * age,0,100 * age * 0.1)
    p5.circle(0,-30 * age,100 * age * 0.1)
    p5.circle(0,30 * age,100 * age * 0.1)
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
        p5.translate(256,256);

        p5.stroke(255);
        p5.strokeWeight(15);
        p5.noFill();
        
        for (let i = 0; i < maxAge; i++)
        {
            const colIndex = Math.floor((i / maxAge) * strokeColours.length)

            const c1 = p5.color(strokeColours[colIndex]);
            const c2 = p5.color(strokeColours[Math.min(colIndex + 1, strokeColours.length - 1)]);


            p5.stroke(p5.lerpColor(c1, c2, ((i / maxAge) * strokeColours.length) % 1))
            p5.circle(0,0,i * 50)
        }
        
        p5.noStroke();
        p5.rotate(p5.frameCount * 0.01);
        for (let i = 0; i < maxAge * 2; i++)
        {
            drawGlyph(p5, (p5.frameCount * 0.01 + (i/2)) % maxAge);
            p5.rotate(1);
        }

        p5.stroke(43);
        p5.strokeWeight(3);
        p5.noFill();
        
        for (let i = 0; i < maxAge; i++)
        {
            p5.circle(0,0,i * 50 + 25)
        }
    },
    prompt : "Maximalism"
}