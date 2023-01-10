import { getColour, distanceSquared, randomItem, getLast, getLastX, randomBetween, randomIntBetween } from "../util.js"

const colours = ["#edf2f4","#2b2d42","#8d99ae","#ef233c","#d90429"];

const data = {
    shapes : []
}

const addShape = () =>
{
    data.shapes.push(createTrapezoid());
}

const createTrapezoid = () =>
{
    const x = randomBetween(0, 512);
    const y = randomBetween(0, 512);
    const l = randomBetween(30, 180);
    const w = randomBetween(30, 180);

    const x2 = x + w
    const y2 = y;

    const x3 = (Math.sin(Math.PI / 3) * l) + x2;
    const y3 = (Math.cos(Math.PI / 3) * l) + y2;

    const x4 = x3 - w;
    const y4 = y3;

    let xSpeed = randomBetween(-1, 1);
    let ySpeed = 0;
    if (Math.abs(xSpeed) < 0.3)
        xSpeed *= 2;
    if (Math.random() > 0.5)
    {
        ySpeed = Math.cos(Math.PI / 3) * xSpeed;
        xSpeed = Math.cos(Math.PI / 3) * xSpeed;
    }

    const colour = colours[randomIntBetween(1, 4)];
    const alpha = randomItem(["66","77","88","99","aa","bb","cc"])

    return { s: "Trap", x: [x,x2,x3,x4], y: [y,y2,y3,y4], xS: xSpeed, yS: ySpeed, c: colour, a: alpha};
}

const flip = (n) =>
{
    return (n * -1) + 512;
}

export default {
    setup : (p5) => {
        p5.background(colours[0]);
    },
    regenerate : () => {
        addShape();
    },
    draw : (p5) => {
        p5.background(colours[0]);
        p5.noStroke();
        
        data.shapes.forEach(s => {
            p5.fill(s.c)

            if (s.s === "Trap")
            {
                s.x = s.x.map(x => x + s.xS);
                s.y = s.y.map(y => y + s.yS);
                p5.quad(s.x[0], s.y[0], s.x[1], s.y[1], s.x[2], s.y[2], s.x[3], s.y[3] );
                p5.quad(flip(s.x[0]), flip(s.y[0]), flip(s.x[1]), flip(s.y[1]), flip(s.x[2]), flip(s.y[2]), flip(s.x[3]), flip(s.y[3]) );
            }
        })
        
    },
    prompt : "Suprematism"
}