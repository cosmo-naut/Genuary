import { randomBetween, randomIntBetween, randomItem, distanceSquared } from "../util.js"

const data = {
    orbs : [],
}

const update = () =>
{
    data.orbs.forEach(orb => {
        orb.step = (orb.step + 0.007) % 2;
        orb.subStep = (orb.subStep + 0.0015) % 2;
        orb.x = orb.offset + (Math.sin(orb.step * Math.PI) * orb.radius);
        orb.y = orb.offset + (Math.cos(orb.step * Math.PI) * orb.radius);
        orb.x += (Math.sin(orb.subStep * Math.PI) * 30);
        orb.y += (Math.cos(orb.subStep * Math.PI) * 30);
        orb.col[0] = orb.step * 255;
    });
    // console.log(data.step);
}


export default {
    setup : (p5) => {
        p5.background(34);
    },
    regenerate : () => {
        data.orbs.push({
            step : 0,
            subStep : 0,
            offset : 256,
            radius : 95,
            x : 256,
            y : 256,
            size : 5,
            col : [0, 100, 100] // HSB
        }),
        data.orbs.push({
            step : 1,
            subStep : 1,
            offset : 256,
            radius : 95,
            x : 256,
            y : 256,
            size : 5,
            col : [180, 100, 50] // HSB
        })
        data.orbs.push({
            step : 0,
            subStep : 0,
            offset : 256,
            radius : 0,
            x : 256,
            y : 256,
            size : 60,
            col : [180, 0, 100], // HSB
        })
        data.orbs.push({
            step : 1,
            subStep : 1,
            offset : 256,
            radius : 0,
            x : 256,
            y : 256,
            size : 60,
            col : [180, 100, 0], // HSB
        })
    },
    draw : (p5) => {
        //p5.background(34);
        p5.noStroke();
        p5.colorMode(p5.HSB);
        for (let i = 0; i < 3; i++)
        {
            update();
            data.orbs.forEach(orb => {
                p5.fill(orb.col);
                p5.ellipse(orb.x, orb.y, orb.size, orb.size);
            })
        }
        
    },
    prompt : "A Perfect Loop"
}