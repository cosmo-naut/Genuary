import { randomBetween, randomIntBetween, distanceSquared } from "../util.js";

const MIN_CIRCLES = 12;
const MAX_CIRCLES = 30;
const MIN_CIRCLE_SIZE = 5;
const MAX_CIRCLE_SIZE = 25;

const data = {
    stars: [],
    distances: [],
    connections: []
}

const generateStars = (count) => {
    return Array.from(Array(count)).map(_ => {
        return {
            x : Math.random() * 512,
            y : Math.random() * 512,
            r : randomBetween(MIN_CIRCLE_SIZE, MAX_CIRCLE_SIZE),
        }
    })
}

const generateDistances = (stars) => {
    return stars.map((s1, i) => {
        return stars.map((s2, j) => i == j? -1: distanceSquared(s1.x, s1.y, s2.x, s2.y))
    })
}

const generateConnections = (stars, distances, count) => {
    // distance to center
    const dtc = stars.map(s => distanceSquared(s.x, s.y, 256, 256));
    // center-most index
    const cmi = dtc.reduce((p, c, i) => c < dtc[p]? i: p, 0);
    const connections = [];
    distances.remove
    connections.push([cmi, distances.reduce((p, c, i) => c < distances[p]? i: p, 0)]);
    console.log(connections);
    // while (connections.length < count) {

    // }
    return connections;
}

export default {
    regenerate : () => {
        // data.stars = generateStars(randomIntBetween(MIN_CIRCLES, MAX_CIRCLES));
        data.stars = generateStars(3);
        data.distances = generateDistances(data.stars);
        data.connections = generateConnections(data.stars, data.distances, 5);
    },
    draw : (p5) => {
        p5.background(34);
        p5.noStroke();
        data.stars.forEach((c, i) => {
            if (data.connections.includes(i))
                p5.fill(255, 204, 0)
            else
                p5.fill(255)
            p5.ellipse(c.x,c.y,c.r,c.r);
        });
    }
}