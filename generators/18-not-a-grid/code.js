import { getColour, angleBetween, randomItem, isBetween, distance, randomBetween, randomIntBetween } from "../util.js"

const pointA = [256,256];
const pointB = [256,256];
const originA = [0,0];
const directionA = [1,0];
const originB = [512,512];
const directionB = [-1,0];
const speed = 1;

const historyLength = 20

const history = [];

const shift = (points, dir) =>
{
    // right
    if (dir[0] > 0)
    {
        points[0] += dir[0] * speed;
        if (points[0] > 512)
        {
            points[0] = 512;
            dir[0] = 0;
            dir[1] = 1;
        }

    }
    // down
    if (dir[1] > 0)
    {
        points[1] += dir[1] * speed;
        if (points[1] > 512)
        {
            points[1] = 512;
            dir[0] = -1;
            dir[1] = 0;
        }
    }
    // left
    if (dir[0] < 0)
    {
        points[0] += dir[0] * speed;
        if (points[0] < 0)
        {
            points[0] = 0;
            dir[0] = 0;
            dir[1] = -1;
        }

    }
    // up
    if (dir[1] < 0)
    {
        points[1] += dir[1] * speed;
        if (points[1] < 0)
        {
            points[1] = 0;
            dir[0] = 1;
            dir[1] = 0;
        }
    }
}

export default {
    setup : (p5) => {
        p5.background(43);
    },
    regenerate : () => {

    },
    draw : (p5) => {

        p5.background(0);
        p5.fill(0);
        p5.noStroke();
        p5.circle(256,256,512);

        p5.noFill();
        p5.strokeWeight(8)
        p5.stroke(p5.color(255,255,255,255));
        p5.circle(256,256,512);

        p5.fill(0);
        p5.noStroke();
        p5.circle(256,256,512);

        const sine = Math.sin(p5.frameCount * 0.08);
        const cosine = Math.cos(p5.frameCount * 0.08);
        const angle = (p5.frameCount * 0.08 % (Math.PI * 2))
        
        pointA[0] = 256 + Math.sin(p5.frameCount * 0.08) * 256;
        pointA[1] = 256 + Math.cos(p5.frameCount * 0.08) * 256;
        pointB[0] = 256 + Math.sin(p5.frameCount * 0.08) * 256;
        pointB[1] = 256 + Math.cos(p5.frameCount * 0.08) * 256;

        history.push([pointA[0], pointA[1], pointB[0], pointB[1]]);

        if (history.length > historyLength)
        {
            p5.noStroke();
            p5.fill(0);
            p5.triangle(0,0,history[history.length-1][0],history[history.length-1][1], history[history.length-historyLength][0], history[history.length-historyLength][1])
            p5.triangle(0,512,history[history.length-2][0],history[history.length-1][1], history[history.length-historyLength][0], history[history.length-historyLength][1])
            p5.triangle(512,0,history[history.length-1][0],history[history.length-1][1], history[history.length-historyLength][0], history[history.length-historyLength][1])
            p5.triangle(512,512,history[history.length-2][0],history[history.length-1][1], history[history.length-historyLength][0], history[history.length-historyLength][1])
        }

        p5.noFill();

        p5.strokeWeight(10)
        p5.stroke(0)
        p5.arc(256, 256, 512, 512, p5.frameCount * -0.08 + 1.575, p5.frameCount * -0.08 -3.2);


        p5.stroke(p5.color(255,255,255,255));
        p5.strokeWeight(1);


        for (let i = 0; i < historyLength && i < history.length; i++)
        {
            const points = history[history.length-i-1]
            if (i % 2 == 0) {
                p5.line(originA[0],originA[1],points[0],points[1]);
                p5.line(originB[0],originB[1],points[2],points[3]);
            }
             else {
                p5.line(originA[0],originB[0],points[0],points[1]);
                p5.line(originB[1],originA[1],points[2],points[3]);
            }
        }

        

        // p5.noFill();

        // p5.strokeWeight(5)
        // p5.stroke(0)
        // p5.arc(256, 256, 512, 512, p5.frameCount * -0.08 + 1.575, p5.frameCount * -0.08 -3.2);

        // console.log(angle);
        
        // if (isBetween(angle, 0, Math.PI/2))
        // {
        //     p5.arc(256, 256, 512, 512, Math.PI/2, 0);
        // }

        // Make this cooler later


        p5.strokeWeight(150);
        p5.noFill();
        p5.stroke(0);


        // p5.circle(256,256,662);

        // p5.bezier(0,0,pointA[0],pointA[1],pointB[0],pointB[1],512,512)
    },
    prompt : "Not A Grid"
}