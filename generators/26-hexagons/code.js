import { getColour, angleBetween, randomItem, isBetween, distance, randomBetween, randomIntBetween } from "../util.js"

const colours = {};

const drawCircles = (p5, x, y) =>
{
    p5.circle(x,y,320);
    p5.circle(x,y,280);
    p5.circle(x,y,240);
    p5.circle(x,y,200);
}

const xOffset = (p5, angle) =>
{
    return Math.sin(((Math.PI/3) * angle) + p5.frameCount * 0.01);
}

const yOffset = (p5, angle) =>
{
    return Math.cos(((Math.PI/3) * angle) + p5.frameCount * 0.01);
}

export default {
    setup : (p5) => {
        p5.background(43);
        p5.noiseDetail(4, 0.5); 
        p5.blendMode(p5.ADD);

        colours.red = p5.color(128,0,0);
        colours.green = p5.color(0,128,0);
        colours.blue = p5.color(0,0,128);
        colours.aqua = p5.color(0,128,128);
        colours.yellow = p5.color(128,128,0);
        colours.purple = p5.color(128,0,128);
    },
    regenerate : () => {

    },
    draw : (p5) => {
        p5.blendMode(p5.BLEND);
        p5.background(43);
        p5.blendMode(p5.ADD);
        p5.noFill(255);
        p5.strokeWeight(9);

        

        p5.stroke(colours.red);
        drawCircles(p5, 256 + xOffset(p5, 0) * 50, 256)
        p5.stroke(colours.purple);
        drawCircles(p5, 256 + xOffset(p5, 1) * 50, 256 + xOffset(p5, 1) * 50)
        p5.stroke(colours.blue);
        drawCircles(p5, 256 + xOffset(p5, 2) * 50, 256 + xOffset(p5, 2) * 50)
        p5.stroke(colours.aqua);
        drawCircles(p5, 256 + xOffset(p5, 3) * 50, 256)
        p5.stroke(colours.yellow);
        drawCircles(p5, 256 - xOffset(p5, 4) * 50, 256 + xOffset(p5, 4) * 50)
        p5.stroke(colours.green);
        drawCircles(p5, 256 - xOffset(p5, 5) * 50, 256 + xOffset(p5, 5) * 50)
        
    },
    prompt : "Hexagons"
}