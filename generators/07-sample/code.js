import { getColour, distanceSquared, randomItem, getLast, getLastX, randomIntBetween, randomBetween } from "../util.js"

const data = {
    circles : [],
    colours : []
}

const imageCallback = (p5, img) =>
{
    p5.image(img, 0, 0);
    p5.loadPixels();

    for (let i = 0; i < p5.pixels.length; i+= 4)
    {
        const r  = p5.pixels[i];
        const g  = p5.pixels[i+1];
        const b  = p5.pixels[i+2];
        data.colours.push(p5.color(r,g,b));
    }
}

const randomCircle = (p5) =>
{
    const x = randomIntBetween(0, 512);
    const y = randomIntBetween(0, 512);
    p5.fill(data.colours[x + (y * 512)]);
    p5.circle(x, y, randomBetween(15,35));
}

export default {
    setup : (p5) => {
        p5.background(43);
        p5.pixelDensity(1);
        p5.loadImage('./demon_days.jpg', img => {
            imageCallback(p5, img);
        });
        
    },
    regenerate : () => {

    },
    draw : (p5) => {
        p5.noStroke();
        randomCircle(p5);
        randomCircle(p5);
        randomCircle(p5);
        randomCircle(p5);
        randomCircle(p5);
        randomCircle(p5);
        randomCircle(p5);
        randomCircle(p5);
        randomCircle(p5);
        randomCircle(p5);
    },
    prompt : "Sample Your Favourite Album"
}