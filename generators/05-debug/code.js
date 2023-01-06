import { randomBetween, randomIntBetween, randomItem, getLast, getLastX } from "../util.js"

const characters = "~`!@#$%^&*()=+{}[]<>?‡ƒ€™¥¤§¬µ¶abcdefghijklmnopqrstuvwxyz1234567890".split("");
const colours = [{"name":"Claret","hex":"590d22","rgb":[89,13,34],"cmyk":[0,85,62,65],"hsb":[343,85,35],"hsl":[343,75,20],"lab":[18,35,8]},{"name":"Claret","hex":"800f2f","rgb":[128,15,47],"cmyk":[0,88,63,50],"hsb":[343,88,50],"hsl":[343,79,28],"lab":[27,47,13]},{"name":"Big Dip Oruby","hex":"a4133c","rgb":[164,19,60],"cmyk":[0,88,63,36],"hsb":[343,88,64],"hsl":[343,79,36],"lab":[35,57,17]},{"name":"Bright Maroon","hex":"c9184a","rgb":[201,24,74],"cmyk":[0,88,63,21],"hsb":[343,88,79],"hsl":[343,79,44],"lab":[44,66,20]},{"name":"Fiery Rose","hex":"ff4d6d","rgb":[255,77,109],"cmyk":[0,70,57,0],"hsb":[349,70,100],"hsl":[349,100,65],"lab":[60,69,22]},{"name":"Ultra Red","hex":"ff758f","rgb":[255,117,143],"cmyk":[0,54,44,0],"hsb":[349,54,100],"hsl":[349,100,73],"lab":[66,55,12]},{"name":"Salmon Pink","hex":"ff8fa3","rgb":[255,143,163],"cmyk":[0,44,36,0],"hsb":[349,44,100],"hsl":[349,100,78],"lab":[72,44,8]},{"name":"Cherry Blossom Pink","hex":"ffb3c1","rgb":[255,179,193],"cmyk":[0,30,24,0],"hsb":[349,30,100],"hsl":[349,100,85],"lab":[80,30,4]},{"name":"Pink","hex":"ffccd5","rgb":[255,204,213],"cmyk":[0,20,16,0],"hsb":[349,20,100],"hsl":[349,100,90],"lab":[87,19,2]},{"name":"Lavender Blush","hex":"fff0f3","rgb":[255,240,243],"cmyk":[0,6,5,0],"hsb":[348,6,100],"hsl":[348,100,97],"lab":[96,6,0]}];

const getColour = (p5, index) =>
{
    return p5.color(colours[index].rgb[0], colours[index].rgb[1], colours[index].rgb[2]);
}

const data = {
    meteors : []
}

const createMeteors = () =>
{
    data.meteors = [];
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
    data.meteors.push(newMeteor())
}

const newMeteor = () =>
{
    return {
        size : randomIntBetween(12, 32),
        places : [{
            x : randomBetween(0, 512),
            y : randomBetween(0, 512),
            c : randomItem(characters)
        }],
    }
}

export default {
    setup : (p5) => {
        p5.background(34);

    },
    regenerate : () => {
        createMeteors();
    },
    draw : (p5) => {
        p5.fill(132)
        p5.noStroke();

        data.meteors.forEach(m => 
        {
            if (Math.random() > 0.05)
            {
                return;
            }

            const p = getLast(m.places);

            let x = p.x + randomBetween(-10, 10);
            let y = p.y + m.size;
            let c = randomItem(characters);
            p5.textSize(m.size);

            p5.fill(40);
            // p5.ellipse(x+5, y-5, m.size);

            const prev = getLastX(m.places, 3);


            p5.fill(getColour(p5, 8));
            p5.text(c, x, y);

            p5.fill(getColour(p5, 5));
            if (prev[0])
                p5.text(prev[0].c, prev[0].x, prev[0].y);

            p5.fill(getColour(p5, 0));
            if (prev[1])
                p5.text(prev[1].c, prev[1].x, prev[1].y);

            p5.fill(40);
            if (prev[2])
                p5.text(prev[2].c, prev[2].x + randomBetween(-5, 5), prev[2].y);
            
            if (y > 550)
            {
                y = 0;
                x = randomBetween(0, 512);
                m.size = randomIntBetween(12, 32)
                if (Math.random() > 0.95)
                {
                    p5.stroke(255);
                    p5.strokeWeight(3);
                    p5.line(x, 0, x, 512);
                    p5.strokeWeight(1);
                }
            }

            m.places.push({x: x, y: y, c: c});
        })
    },
    prompt : "Debug View"
}