import { getColour, angleBetween, randomItem, isBetween, distance, randomBetween, randomIntBetween } from "../util.js"

const bubbles = [];

const newBubble = (inverse = false) =>
{
    const x = randomBetween(0, 512);
    const y = 512;
    const size = 100

    return { x: x, y: y, size: size, i: inverse};
}

const move = (bubble) =>
{
    if (bubble.size < 0)
        return;

    bubble.x += randomBetween(-2, 2);
    bubble.y -= randomBetween(0, 3);
    bubble.size -= randomBetween(0, 0.7)
}

export default {
    setup : (p5) => {
        p5.background(0);
        p5.fill(255);
        p5.noStroke();
        p5.triangle(0,0, 512,512, 512,0);
    },
    regenerate : () => {
        bubbles.push(newBubble(randomItem([true, false])));
    },
    draw : (p5) => {
        if (p5.frameCount % 50 == 0)
            bubbles.push(newBubble(randomItem([true, false])));

        bubbles.forEach(bubble =>  {
            move(bubble);
            if (bubble.i)
            {
                p5.stroke(255)
                p5.fill(0);
                p5.circle(bubble.x, 512 - bubble.y, bubble.size);
            } else {
                p5.stroke(0)
                p5.fill(255);
                p5.circle(bubble.x, bubble.y, bubble.size);
            }
        })
    },
    prompt : "Black and White"
}