import { getColour, angleBetween, randomItem, isBetween, distance, randomBetween, randomIntBetween } from "../util.js"

const greys = [43, 67, 91, 130]
const scheme1 = ["#000814", "#001d3d", "#003566", "#ffc300", "#ffd60a"];
const scheme2 = ["#355070","#6d597a","#b56576","#e56b6f","#eaac8b"]

const threadCount = 80;
const threadThickness = 4;
const stitchLength = 3;
const riftDistance = 400;

const verticalThreads = [2,2,2,2,2,2,2,1,3,3,3,3,4]
const horizontalThreads = [4,4,4,4,4,1,1,1,1,1,1,2,3]

const vColour = (x) =>
{
    const index = x % verticalThreads.length;
    return scheme2[verticalThreads[index]];
}

const hColour = (y) =>
{
    const index = y % horizontalThreads.length;
    return scheme2[horizontalThreads[index]];
}

export default {
    setup : (p5) => {
        p5.background(43);
        p5.noiseDetail(4, 0.5); 
    },
    regenerate : () => {
        
    },
    draw : (p5) => {
        p5.background(43);
        p5.strokeWeight(threadThickness);
        
        let flag = false;
        const stepSize = 512 / threadCount;

        const riftPower = Math.max(100 * Math.sin(p5.frameCount * 0.01), 0);


        
        for (let x = 0; x < threadCount; x++)
        {
            flag = !flag;
            for (let y = 0; y < threadCount; y++)
            {
                flag = !flag;

                let xPos = x * stepSize;
                let yPos = y * stepSize;
                const distanceToCenter = distance(xPos, yPos, 256, 256);
                
                if (distanceToCenter < riftDistance)
                {

                    const force = (riftDistance - distanceToCenter)/riftDistance;
                    const angle = angleBetween(xPos, yPos, 255, 257);
                    xPos -= Math.cos(angle) * riftPower * force * p5.noise(x + p5.frameCount * 0.01, 0);
                    yPos -= Math.sin(angle) * riftPower * force * p5.noise(0, y + p5.frameCount * 0.01);
                }
                
                if (flag)
                {
                    p5.stroke(p5.color(vColour(x)))
                    p5.line(xPos,yPos-stitchLength,xPos,yPos+stitchLength);
                }
                p5.stroke(p5.color(hColour(y)))
                p5.line(xPos-stitchLength,yPos,xPos+stitchLength,yPos);
                if (!flag)
                {
                    p5.stroke(p5.color(vColour(x)))
                    p5.line(xPos,yPos-stitchLength,xPos,yPos+stitchLength);
                }
            }
        }

        p5.fill(0)
        p5.noStroke();
        p5.circle(p5.mouseX, p5.mouseY, 15);
    },
    prompt : "Textile"
}