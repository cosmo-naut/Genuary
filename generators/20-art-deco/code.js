import { getColour, angleBetween, randomItem, isBetween, distance, randomBetween, randomIntBetween } from "../util.js"

const gold = "#d4af37"
const lineCount = 32;

const drawLines = (p5) =>
{
    p5.strokeWeight(3);
    for (let i = 0; i < lineCount; i++)
    {
        const seg = p5.TAU / lineCount;
        const x = Math.sin(seg * i - p5.frameCount * 0.001) * 245
        const y = Math.cos(seg * i - p5.frameCount * 0.001) * 245
        p5.line(256 + x, 256 + y, 256 + x*2, 256 + y*2);
    }

    p5.strokeWeight(1)
    for (let i = 0; i < lineCount * 4; i++)
    {
        const seg = p5.TAU / (lineCount * 4);
        const x = Math.sin(seg * i - p5.frameCount * 0.001) * 245
        const y = Math.cos(seg * i - p5.frameCount * 0.001) * 245
        p5.line(256 + x, 256 + y, 256 + x*2, 256 + y*2);
    }

    p5.strokeWeight(1);
    for (let i = 0; i < lineCount; i++)
    {
        const seg = p5.TAU / lineCount;
        const x = Math.sin(seg * i - p5.frameCount * 0.001) * 55
        const y = Math.cos(seg * i - p5.frameCount * 0.001) * 55
        p5.line(256, 256, 256 + x, 256 + y);
    }
}

const outerArc = (p5) =>
{
    // const lineStart = p5.TAU * p5.noise(p5.frameCount * 0.001);
    // const lineEnd = p5.TAU * p5.noise(0, p5.frameCount * 0.001);

    const lineStart = p5.TAU * p5.noise(p5.frameCount * 0.005);
    const lineEnd = lineStart + Math.PI/2;
    
    p5.arc(256,256, 400, 400, lineStart, lineEnd)
    
    let x = Math.cos(lineStart)
    let y = Math.sin(lineStart)
    
    p5.line(256 + x * 200, 256 + y * 200, 256 + x * 227, 256 + y * 227)
    
    x = Math.cos(lineEnd)
    y = Math.sin(lineEnd)
    
    p5.line(256 + x * 200, 256 + y * 200, 256 + x * 227, 256 + y * 227)
}

const innerArc = (p5) =>
{
    // const lineStart = Math.abs(p5.TAU * p5.noise(p5.frameCount * 0.001, 10));
    // const lineEnd = Math.abs(p5.TAU * p5.noise(0, p5.frameCount * 0.001, 10));
    const lineStart = Math.abs(p5.TAU * p5.noise(p5.frameCount * 0.005, 10));
    const lineEnd = lineStart + Math.PI/2;
    
    p5.arc(256,256, 346, 346, lineStart, lineEnd)

    const outerLineStart = p5.TAU * p5.noise(p5.frameCount * 0.005);
    const outerLineEnd = outerLineStart + Math.PI/2;

    let lineRadius = 227;

    if (isBetween(lineStart, outerLineStart, outerLineEnd))
        lineRadius = 200;
    
    let x = Math.cos(lineStart)
    let y = Math.sin(lineStart)
    
    p5.line(256 + x * 173, 256 + y * 173, 256 + x * lineRadius, 256 + y * lineRadius)
    
    lineRadius = 227;

    if (isBetween(lineEnd, outerLineStart, outerLineEnd))
        lineRadius = 200;

    x = Math.cos(lineEnd)
    y = Math.sin(lineEnd)

    p5.line(256 + x * 173, 256 + y * 173, 256 + x * lineRadius, 256 + y * lineRadius)
}

const drawCircles = (p5) =>
{
    for (let i = 0; i < lineCount; i++)
    {
        p5.strokeWeight(5)
        const seg = p5.TAU / lineCount;
        const x = Math.sin(seg * i - p5.frameCount * 0.001)
        const y = Math.cos(seg * i - p5.frameCount * 0.001)
        // p5.circle(256 + x * 100, 256 + y * 100, 5);
        p5.circle(256 + x * 99, 256 + y * 99, 3);
    }
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
        p5.noFill()
        p5.stroke(p5.color(gold))
        p5.strokeWeight(3)
        p5.circle(256,256,490)
        p5.circle(256,256,472)
        p5.circle(256,256,454)

        drawLines(p5);
        p5.strokeWeight(3);
        outerArc(p5);
        innerArc(p5);

        p5.strokeWeight(3);
        p5.circle(256, 256, 180);
        p5.circle(256, 256, 140);
        p5.circle(256, 256, 110);
        // p5.circle(256, 256, 292);
        drawCircles(p5);

        p5.strokeWeight(1);
        for (let i = 0; i < lineCount; i++)
        {
            const seg = p5.TAU / lineCount;
            const x = Math.sin(seg * i - p5.frameCount * 0.001) * 85
            const y = Math.cos(seg * i - p5.frameCount * 0.001) * 85
            p5.circle(256 + x, 256 + y, 60);
        }

        p5.strokeWeight(17);
        p5.stroke(43);
        p5.circle(256, 256, 160);
    },
    prompt : "Art Deco"
}