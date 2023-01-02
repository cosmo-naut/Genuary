import { randomBetween, randomIntBetween, randomItem, distanceSquared } from "../util.js"

const baseBlue = [0,119,182];
const dropBlue = [0,180,216];
const rippleBlue = [144,224,239];

let timer = 30;
let offset = 0;

const data = {
    droplets : []
}

const generateDroplets = () =>
{
    //data.droplets = [];
    data.droplets.push({
        life : 0,
        x: randomBetween(0,512),
        y: randomBetween(0,512),
    })
}

const updateLife = () =>
{

}

export default {
    setup : (p5) => {
        p5.background(34);
        p5.noiseDetail(4, 0.5);
    },
    regenerate : () => {
        generateDroplets();
    },
    draw : (p5) => {
        p5.background(34);

        offset += 0.01;
        
        for(let x = 0; x < 64; x++)
        {
            for(let y = 0; y < 64; y++)
            {
                p5.strokeWeight(4);
                const transparency = p5.noise((x * 0.1) + offset, (y * 0.1) + offset);
                p5.stroke(`rgba(${baseBlue[0]},${baseBlue[1]},${baseBlue[2]}, ${transparency})`);
                p5.point(x * 8, y * 8);
            }
        }

        timer--;
        if (timer < 0)
        {
            timer = randomBetween(5,20);
            const count = randomIntBetween(1,4);
            for (let i = 0; i < count; i++)
            {
                generateDroplets();

            }
        }
        data.droplets.forEach(droplet => {
            droplet.life += 1;

            
            const transparency = Math.max((100 - droplet.life) / 100, 0);
            p5.noStroke();
            p5.fill(`rgba(${dropBlue[0]},${dropBlue[1]},${dropBlue[2]}, ${transparency})`)
            p5.ellipse(droplet.x, droplet.y, droplet.life)

            p5.noFill();
            p5.stroke(`rgba(${rippleBlue[0]},${rippleBlue[1]},${rippleBlue[2]}, ${transparency})`)
            p5.ellipse(droplet.x, droplet.y, droplet.life * 2);
        });
    },
    prompt : "Made in 10 Minutes"
}