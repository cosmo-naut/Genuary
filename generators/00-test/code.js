import { randomBetween, randomIntBetween, randomItem, distanceSquared } from "../util.js";

const MIN_CIRCLES = 12;
const MAX_CIRCLES = 30;
const MIN_CIRCLE_SIZE = 5;
const MAX_CIRCLE_SIZE = 15;

const data = {
    stars: [],
    distances: [], // 2d array, major index indicates which star it relates to, and minor index the distance to each other star
    connections: []
}

const generateStars = (count) => {
    return Array.from(Array(count)).map(_ => {
        return {
            x : Math.random() * 512,
            y : Math.random() * 512,
            r : randomBetween(MIN_CIRCLE_SIZE, MAX_CIRCLE_SIZE),
            col : [255, 255, 255, randomIntBetween(128, 250)]
        }
    })
}

const generateDistances = (stars) => {
    return stars.map((s1, i) => {
        return {
            index: i,
            neighbours: stars.map((s2, j) => {
                return {
                    index: j,
                    distance: i == j? -1: distanceSquared(s1.x, s1.y, s2.x, s2.y)
                }
            })
        }
    })
}

const generateConnections = (stars, distances, count) => {
    // indexes of stars in our constellation
    const nodes = []; 
    // array of int[2] containing 2 star indexes
    const paths = [];
    // distance to center
    const dtc = stars.map(s => distanceSquared(s.x, s.y, 256, 256));
    // center-most index
    const cmi = dtc.reduce((p, c, i) => c < dtc[p]? i: p, 0);

    nodes.push(cmi);

    while (paths.length < count) {
        // connected nodes
        const cns = distances.filter(n => nodes.includes(n.index));
        // random connected node
        const rcn = cns[randomIntBetween(0, cns.length)];

        // shortest connection
        const sc = rcn.neighbours.filter(e => !nodes.includes(e.index))
            .reduce((p, c) => {
                return c.distance < p.distance? c: p
            });
        nodes.push(sc.index);
        paths.push([rcn.index, sc.index]);
    }

    return {
        nodes: nodes,
        paths: paths
    };
}

export default {
    setup : (p5) => {
        
    },
    regenerate : () => {
        // data.stars = generateStars(randomIntBetween(MIN_CIRCLES, MAX_CIRCLES));
        data.stars = generateStars(35);
        data.distances = generateDistances(data.stars);
        data.connections = generateConnections(data.stars, data.distances, randomIntBetween(3, 8));
        data.stars.forEach((s, i) => {
            if (data.connections.nodes.includes(i))
            {
                s.r += (randomIntBetween(0, 5));
                s.col[3] += (randomIntBetween(0, 30));
            }
        })
    },
    draw : (p5) => {
        p5.background(34);
        
        p5.stroke(128);
        p5.strokeWeight(3);
        data.connections.paths.forEach(path => {
            const from = data.stars[path[0]];
            const to = data.stars[path[1]];
            p5.line(from.x, from.y, to.x, to.y);
        })

        p5.noStroke();
        data.stars.forEach((c, i) => {
                p5.fill(c.col)
                p5.ellipse(c.x,c.y,c.r,c.r);
            //p5.text(i, c.x, c.y - 20);
        });
        
    },
    prompt : "Constellation"
}