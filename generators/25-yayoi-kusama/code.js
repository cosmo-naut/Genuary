import { getColour, angleBetween, randomItem, isBetween, distance, randomBetween, randomIntBetween } from "../util.js"

const UP = 0;
const RIGHT = 1;
const LEFT = 2;
const colours = ["#f4f1de","#e07a5f","#3d405b","#81b29a","#f2cc8f"];

let grid1 = {};
let grid2 = {};
let grid3 = {};
let grid4 = {};

const makeGrid = (xOffset, yOffset, count) =>
{
    const step = 256 / count;

    let offset = false;
    
    const grid = {}

    grid.points = []
    grid.count = count;

    for (let x = 0; x < count; x++)
    {
        for (let y = 0; y < count; y++)
        {
            grid.points.push({x: x * step + xOffset, y: y * step + offset * (step/2) + yOffset})
        }
        offset = !offset;
    }
    return grid;
}

const drawQuad = (p5, pIndex, direction, offset, grid) => {
    let p1, p2, p3, p4;
    if (direction === UP)
    {
        p1 = grid.points[pIndex];
        p2 = grid.points[pIndex + grid.count + offset];
        p3 = grid.points[pIndex - 1];
        p4 = grid.points[pIndex - grid.count + offset];
    }
    if (direction === RIGHT)
    {
        p1 = grid.points[pIndex];
        p2 = grid.points[pIndex + grid.count + offset];
        p3 = grid.points[pIndex + grid.count + 1 + offset];
        p4 = grid.points[pIndex + 1];
    }
    if (direction === LEFT)
    {
        p1 = grid.points[pIndex];
        p2 = grid.points[pIndex + 1];
        p3 = grid.points[pIndex - grid.count + 1 + offset];
        p4 = grid.points[pIndex - grid.count + offset];
    }
    
    drawLine(p5, p1, p2, pIndex);
    drawLine(p5, p2, p3, pIndex);
    drawLine(p5, p3, p4, pIndex);
    drawLine(p5, p4, p1, pIndex);
}

const drawLine = (p5, p1, p2, colIndex = 0) => {
    p5.stroke(p5.color(colours[colIndex % colours.length]));
    if (p1 && p2)
    {
        if (distance(p1.x,p1.y,p2.x,p2.y) < 55)
        p5.line(p1.x, p1.y, p2.x, p2.y);
    }
}

const drawHex = (p5, index, grid) => {
    const pointIndex = (grid.count + 1) + (index * 3)
    let offset = 0
    if ((pointIndex / grid.count) % 2 < 1)
        offset = -1;

    // p5.text(pointIndex + offset + ", " + index, points[pointIndex + offset].x, points[pointIndex + offset].y);
    
    drawQuad(p5, (grid.count + 1) + (index * 3) + offset, UP, offset, grid)
    drawQuad(p5, (grid.count + 1) + (index * 3) + offset, RIGHT, offset, grid)
    drawQuad(p5, (grid.count + 1) + (index * 3) + offset, LEFT, offset, grid)
}

export default {
    setup : (p5) => {
        p5.background(43);
        p5.noiseDetail(4, 0.5); 
    },
    regenerate : () => {
        grid1 = makeGrid(0,0,12);
        grid2 = makeGrid(0,256,13);
        grid3 = makeGrid(256,0,14);
        grid4 = makeGrid(256,256,15);
    },
    draw : (p5) => {
        p5.background(43);
        p5.stroke(255);
        p5.strokeWeight(3);

        grid1.points.forEach((point, index) => {
            p5.stroke(p5.color(colours[index % colours.length]));
            p5.point(point.x, point.y);
            // p5.text(index, point.x, point.y)
        });

        for (let i = 0; i < 100; i++)
        {
            // drawHex(p5, i, grid1)
            drawHex(p5, i, grid2)
            drawHex(p5, i, grid3)
            drawHex(p5, i, grid4)
        }


        // drawQuad(p5, 27, UP, -1)
        // drawQuad(p5, 27, RIGHT, -1)
        // drawQuad(p5, 27, LEFT, -1)
    },
    prompt : "Yayoi Kusama"
}