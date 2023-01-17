import { getColour, angleBetween, randomItem, clamp, distance, randomBetween, randomIntBetween } from "../util.js"

const HORIZONTAL = -1;
const VERTICAL = 1;

const lines = [];
const rects = [];

const newLine = () =>
{

    let parent = lines.length > 0? lines[lines.length-1]: {x1: 0, y1: 0, x2: 0, y2: 512, dir: -1, axis: VERTICAL, s: 0.1, age: 1};

    let x1 = 0;
    let y1 = 0;
    let x2 = 512;
    let y2 = 512;

    const axis = parent.axis * -1;

    if (axis === HORIZONTAL)
    {
        y1 = randomBetween(parent.y1, parent.y2)
        y2 = y1;

        if (parent.dir < 0)
            x1 = parent.x1;
        else
            x2 = parent.x1;
    }
    if (axis === VERTICAL)
    {
        x1 = randomBetween(parent.x1, parent.x2)
        x2 = x1;

        if (parent.dir < 0)
            y1 = parent.y1;
        else
            y2 = parent.y1;
    }

    let dir = randomItem([-1, 1]);

    return {x1: x1, y1: y1, x2: x2, y2: y2, dir: dir, axis: axis, age: 0, parent: parent};
}

const move = (p5, line) =>
{
    const speed = Math.max(Math.sin(p5.frameCount * 0.01) * 0.7 + 0.3, 0);

    if (line.axis === HORIZONTAL)
    {
        line.y1 += line.dir * speed;
        line.y2 = line.y1;

        if (line.parent.dir < 0)
            line.x1 = line.parent.x1;
        else
            line.x2 = line.parent.x1;

        if (line.y1 < 0 || line.y1 > 512)
            line.age = 0;
    }

    if (line.axis === VERTICAL)
    {
        line.x1 += line.dir * speed;
        line.x2 = line.x1;

        if (line.parent.dir < 0)
            line.y1 = line.parent.y1;
        else
            line.y2 = line.parent.y1;

        if (line.x1 < 0 || line.x1 > 512)
            line.age = 0;
    }

    line.age += 0.005;
}

export default {
    setup : (p5) => {
        p5.background(43);
    },
    regenerate : () => {
        lines.push(newLine())
        // lines.push(newLine())
    },
    draw : (p5) => {
        p5.stroke(p5.color(255,255,255,255));
        
        if (Math.random() < 0.05)
        {
            lines.push(newLine())
        }

        p5.background(43);

        lines.forEach(line => {
            move(p5, line);
            p5.strokeWeight(line.age);
            p5.line(line.x1, line.y1, line.x2, line.y2)
        })
        
        
    },
    prompt : "A Grid Inside A Grid Inside A Grid"
}