import { getColour, angleBetween, randomItem, lerp, distance, randomBetween, randomIntBetween } from "../util.js"

const PI2 = Math.PI * 2;
const RIGHT = 1;
const LEFT = -1;

const data = {
    walkers : [],
    ripples : []
}

const newWalker = (legs = true) =>
{
    const walker = {};

    walker.x = 128;
    walker.y = 256;
    walker.d = (Math.PI/2) * 3;
    walker.speed = 1;
    walker.follow = [];

    walker.feet = []
    if (legs)
    {
        walker.feet.push(newFoot(walker, RIGHT))
        walker.feet.push(newFoot(walker, LEFT))

    }

    return walker;
}

const newFoot = (walker, side) =>
{
    const foot = {};
    foot.body = walker;
    foot.side = side;
    foot.l = 50;
    foot.armLength = 50;
    foot.x = walker.x + (Math.sin(walker.d) * foot.l) * side;
    foot.y = walker.y + (Math.cos(walker.d) * foot.l) * side;
    foot.cX = foot.x;
    foot.cY = foot.y;
    if (side == RIGHT)
        foot.y += 50;

    return foot;
}

const move = (walker) => 
{
    walker.x += (Math.cos(walker.d) * walker.speed)
    walker.y += (Math.sin(walker.d) * walker.speed)
    if (walker.y < 0)
    {
        walker.d += 0.05;
    }
    if (walker.y > 512)
    {
        walker.d -= 0.05;
    }
    if (walker.x < 0)
    {
        walker.d += 0.05;
    }
    if (walker.x > 512)
    {
        walker.d -= 0.05;
    }
        
    walker.d += randomBetween(-0.05, 0.05);
    walker.d = walker.d % PI2;

    walker.feet.forEach(foot => {
        if (distance(walker.x, walker.y, foot.x, foot.y) > 80) {
            step(foot);
        }
        foot.cX = lerp(foot.cX, foot.x, 0.1);
        foot.cY = lerp(foot.cY, foot.y, 0.1);
        if (distance(foot.x, foot.y, foot.cX, foot.cY) < 1)
            {
                data.ripples.push({x: foot.x, y: foot.y, r: 0});
            }
    })
}

const follow = (walker, following) =>
{
    walker.follow.push({
        x: following.x,
        y: following.y,
        d: following.d
    })

    if (walker.follow.length > 45)
    {
        const values = walker.follow.shift();
        walker.x = values.x;
        walker.y = values.y;
        walker.d = values.d;

        walker.feet.forEach(foot => {
            if (distance(walker.x, walker.y, foot.x, foot.y) > 80) {
                step(foot);
            }
            foot.cX = lerp(foot.cX, foot.x, 0.1);
            foot.cY = lerp(foot.cY, foot.y, 0.1);
            if (distance(foot.x, foot.y, foot.cX, foot.cY) < 1)
            {
                data.ripples.push({x: foot.x, y: foot.y, r: 0});
            }
        })
    }
}

const step = (foot) =>
{
    foot.x = foot.body.x + (Math.sin(-foot.body.d) * foot.l) * foot.side;
    foot.x += Math.cos(foot.body.d) * 60;
    foot.x += randomBetween(-10, 10)
    foot.y = foot.body.y + (Math.cos(-foot.body.d) * foot.l) * foot.side;
    foot.y += Math.sin(foot.body.d) * 60;
    foot.y += randomBetween(-10, 10)

    
}

export default {
    setup : (p5) => {
        p5.background(43);

    },
    regenerate : () => {
        data.walkers = [];
        data.walkers.push(newWalker());
        data.walkers.push(newWalker());
        data.walkers.push(newWalker());
        data.walkers.push(newWalker(false));
    },
    draw : (p5) => {
        p5.background(43);

        move(data.walkers[0]);
        follow(data.walkers[1], data.walkers[0]);
        follow(data.walkers[2], data.walkers[1]);
        follow(data.walkers[3], data.walkers[2]);

        data.ripples.forEach(ripple => {
            p5.stroke(p5.color("#E8F7EE"));
            p5.strokeWeight(1);
            p5.noFill();
            if (ripple.r < 30)
            {
                ripple.r += 1;
                p5.circle(ripple.x, ripple.y, ripple.r);
            }
        });

        data.walkers.forEach(walker => {
            // move(walker);
            walker.feet.forEach(foot => {
                // p5.fill(128)
                // p5.circle(foot.x, foot.y, 20);
                p5.fill(p5.color("#B8C4BB"));
                p5.noStroke();
                p5.circle(foot.cX, foot.cY, 20);

                p5.stroke(p5.color("#663F46"))
                p5.strokeWeight(10);
                let opp = distance(walker.x, walker.y, foot.cX, foot.cY) / 2;
                let between = angleBetween(walker.x, walker.y, foot.cX, foot.cY);
                let hyp = foot.armLength;
                let elbow = Math.asin(opp/hyp);
                let angle = (Math.PI / 2) - elbow;
                const X = Math.cos((angle * foot.side) + between) * foot.armLength;
                const Y = Math.sin((angle * foot.side) + between) * foot.armLength;
                p5.line(walker.x, walker.y, X + walker.x, Y + walker.y);
                p5.line(foot.cX, foot.cY, X + walker.x, Y + walker.y);
            });
            
            p5.fill(p5.color("#B8C4BB"));
            p5.noStroke();
            p5.circle(walker.x, walker.y, 50);
        });
    },
    prompt : "Something I've Wanted To Learn"
}