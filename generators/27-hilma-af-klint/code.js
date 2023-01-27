import { angleBetween, randomItem, isBetween, distance, randomBetween, randomIntBetween, clamp } from "../util.js"

const tailLength = 30;

const tail = "#f77f00"
const head = "#eae2b7"
const treeClose = "#003566"
const treeFar = "#001d3d"

const getNoise = (p5, x, y) =>
{
    return (p5.noise(x * 0.1, y * 0.1, p5.frameCount * 0.01) * 2) - 1;
}

const getColour = (p5, value) =>
{
    if (value > 0)
        return p5.color(0,0,255 * value)
    else
        return p5.color(255 * -value,0,0)
    return p5.color(255, 255, 255);
}

const fairies = [];

const newFairy = () =>
{
    return { x : randomBetween(0,512), y: randomBetween(0,512), hSpeed: 0, vSpeed: 0, tail: [] }
}

const moveFairy = (p5, fairy) =>
{
    fairy.hSpeed += getNoise(p5, fairy.x, fairy.y) * Math.sin(p5.frameCount * 0.01);
    fairy.hSpeed = clamp(fairy.hSpeed, -1, 1);
    fairy.vSpeed += getNoise(p5, fairy.x, fairy.y) * Math.cos(p5.frameCount * 0.01);
    fairy.vSpeed = clamp(fairy.vSpeed, -1, 1);

    for (let i = tailLength-1; i > 0; i--)
    {
        fairy.tail[i] = fairy.tail[i-1];
    }

    fairy.x += fairy.hSpeed;
    if (fairy.x < 0)
        fairy.x += 512;
    fairy.x = fairy.x % 512;
    fairy.y += fairy.vSpeed;
    if (fairy.y < 0)
        fairy.y += 512;
    fairy.y = fairy.y % 512;

    fairy.tail[0] = {x: fairy.x, y:fairy.y }
}

const trees = [];

const newTree = () =>
{
    const xPos = randomBetween(0,512);

    return {x1: xPos, y1: 0, x2: xPos + randomBetween(-30,30), y2:512, layer:Math.random()}
}

export default {
    setup : (p5) => {
        p5.background(43);
        p5.noiseDetail(4, 0.5); 
    },
    regenerate : () => {
        fairies.push(newFairy());

        trees.push(newTree());
    },
    draw : (p5) => {
        p5.background(0);
        
        // for (let x = 0; x < 129; x++)
        // {
        //     for (let y = 0; y < 129; y++)
        //     {
        //         p5.stroke(getColour(p5, getNoise(p5,x,y)))
        //         p5.point(x*4,y*4);
        //     }
        // }
        trees.forEach(tree => {
            p5.strokeWeight(20 + 30 * tree.layer)
            p5.stroke(p5.lerpColor(p5.color(treeClose),p5.color(treeFar),tree.layer))

            p5.line (tree.x1,tree.y1,tree.x2,tree.y2);
        })

        fairies.forEach(fairy => {
            moveFairy(p5, fairy);

            p5.noStroke();

            for (let i = 0; i < 4; i++)
            {
                p5.fill(p5.color(head + "33"));
                p5.circle(fairy.x, fairy.y, (i * 10) + 10)
            }
            p5.fill(p5.color(head));
            p5.circle(fairy.x, fairy.y, 15)

            fairy.tail.forEach((t,i) => {
                p5.fill(p5.lerpColor(p5.color(head + "ff"),p5.color(tail + "00"),i / tailLength))
                p5.lerpColor(p5.color(head),p5.color(tail),i / tailLength)
                if (t)
                    p5.circle(t.x, t.y, 15 - (i /2))
            });

            p5.blendMode
        })

        trees.forEach(tree => {
            if (tree.layer > 0.6)
                return;
            p5.strokeWeight(20 + 30 * tree.layer);
            p5.stroke(p5.lerpColor(p5.color(treeClose),p5.color(treeFar),tree.layer))

            p5.line (tree.x1,tree.y1,tree.x2,tree.y2);
        })
        
    },
    prompt : "In the style of Hilma Af Klint"
}