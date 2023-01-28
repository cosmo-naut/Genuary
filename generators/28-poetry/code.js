import { angleBetween, randomItem, isBetween, distance, randomBetween, randomIntBetween, clamp } from "../util.js"

const characters = ["💀","👽","🤖","🐸","🐎","🦍","🦥","🐉","🐙","🐧","👀","🧠","🦷","🤺","👄","🛀","🤳","💪","👆","👇","👈","👉","✌","🖖","🤘","🤙","👌","🤝","🙏","👏","🎈","🎠","🎨","🎢","🛒","🎩","💍","💎","🎱","🪁","🏆","🕹","🎮","🎵","🎷","⚙","💊","🧲","🔪","🚬","📷","💰","🍕","🥩","🍸","🍻","🍍","🍌","🥑","🥦","🌵","🌹","🚗","🛹","✈","🚀","⚓","🚩","🛎","🌜","⚡","🌊"];

const UP = {x: 0, y:-1};
const RIGHT = {x: 1, y:0};
const DOWN = {x: 0, y:1};
const LEFT = {x: -1, y:0};

const snake = [];

const newSegment = () =>
{
    let valid = false;
    let direction;
    let newPos;
    let retry = 0;
    while (!valid && retry++ < 20)
    {
        direction = randomItem([UP, RIGHT, DOWN, LEFT]);
        newPos = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
        valid = true;
        snake.forEach(segment => {
            if (newPos.x == segment.x && newPos.y == segment.y)
            {
                valid = false;
            };
        })
    }

    return {x: newPos.x, y:newPos.y, c: randomItem(characters)};
}

export default {
    setup : (p5) => {
        p5.background(43);
        p5.noiseDetail(4, 0.5);
        p5.textFont(p5.fonts.emoji);
        snake.push({x:5, y:5, c:randomItem(characters)})
    },
    regenerate : () => {
        
    },
    draw : (p5) => {
        p5.background(43);
        
        
        if (p5.frameCount % 30 == 0) {
            if (snake.length > 5) {
                snake.pop()
            }
            snake.unshift(newSegment())
        }
        p5.textSize(500);
        p5.fill(70);
        p5.text(snake[0].c, -60, 430)
        p5.fill(255);
        p5.textSize(50);
        snake.forEach(seg => {
            p5.text(seg.c, (Math.abs(seg.x) % 10) * 50, (Math.abs(seg.y) % 10) * 50)
        })
    },
    prompt : "Generative Poetry"
}