import { randomBetween, randomIntBetween, randomItem, distanceSquared } from "../util.js"


const black = [0,0,0];
const pink = [225, 171, 145];
const purple = [146, 135, 165];
const white = [255, 255, 255];

const colours = [black, pink, purple, white];
const cutouts = [[2, 6], [2, 5], [2, 4], [2, 3], [3, 4], [3, 5], [4, 4]];

const pixelSize = 8;
const canvasSizeInPixels = 64;

const data = {
    pixelArray : [], // 64 x 64 array of 0 - 255 color values
}

const makePixelArray = () =>
{
    data.pixelArray = [];
    for (let i = 0; i < 64; i++)
    {
        data.pixelArray.push(Array(64));
    }
}

const pixelArraySubBoxes = () =>
{
    for (let x = 0; x < 8; x++)
    {
        for (let y = 0; y < 8; y++)
        {
            fillSubBox(x,y,randomItem(colours));
        }
    }
}

const fillSubBox = (xPos, yPos, col) =>
{
    for (let x = 0; x < 8; x++)
    {
        for (let y = 0; y < 8; y++)
        {
            data.pixelArray[x + (xPos * pixelSize)][y + (yPos * pixelSize)] = col;
        }
    }
}

const makeCutout = () =>
{
    const cutout = randomItem(cutouts);
    for (let x = 0; x < cutout[0]; x++)
    {
        for (let y = 0; y < cutout[1]; y++)
        {
            fillSubBox(x,y,white);
        }
    }

}


export default {
    setup : (p5) => {
        p5.pixelDensity(0.25);
        p5.background(34);
        p5.loadPixels();
        //console.log(p5.pixels.length)
    },
    regenerate : () => {
        makePixelArray();
        pixelArraySubBoxes();
        makeCutout();
    },
    draw : (p5) => {
        p5.fill(255);
        p5.noStroke();
        for (let x = 0; x < 64; x++)
        {
            for (let y = 0; y < 64; y++)
            {
                let cols = data.pixelArray[x][y];
                if (cols == undefined)
                    continue;

                p5.fill(cols[0], cols[1], cols[2]);
                p5.square(x * 8, y * 8, 8)
            }
        }
    },
    prompt : "Glitch Art"
}