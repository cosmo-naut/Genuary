import { getColour, angleBetween, randomItem, clamp, distance, randomBetween, randomIntBetween } from "../util.js"

const width = 512;
const height = 512;
const pointCount = 50;
let time = 0;
let waveCount = 30;
let cloudCount = 200;
const colours = ["03045e","023e8a","0077b6","0096c7","00b4d8","48cae4","90e0ef","ade8f4","caf0f8"];
const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const lightningChance = 0.05;

const data = {
    waves : [],
    clouds: [],
    lightning: {}
}

const newWave = (id) =>
{
    const wave = {};

    const points = [];
    
    for (let i = 0; i < width; i += (width / pointCount))
    {
        points.push({x: i, y: 300 + (id * id * 0.2), char: randomItem(characters)});
    }
    wave.points = points;
    wave.id = id;
    return wave;
}

const newCloud = () =>
{
    const cloud = {};
    cloud.x = randomBetween(0, width);
    cloud.y = randomBetween(0, 10) * randomBetween(0, 12) + 10;
    cloud.char = randomItem(characters);
    cloud.age = Math.random() * (Math.PI * 2);
    return cloud;
}

const newLightning = () =>
{
    const points = [];
    let x = randomBetween(0, 512)
    let y = randomBetween(10, 80)
    const bottom = randomBetween(400, 500)
    while (y < bottom)
    {
        x += randomBetween(-7, 7)
        y += randomBetween(-1, 6)
        points.push({x: x, y: y, char: randomItem(characters)})
    }
    return {
        age: 0,
        brightness: 255,
        points: points
    }
}

export default {
    setup : (p5) => {
        p5.background(43);
        p5.noiseDetail(4, 0.5);
    },
    regenerate : () => {
        data.waves = [];
        data.clouds = [];
        for (let i = waveCount; i > 0; i--)
        {
            data.waves.push(newWave(i));
        }
        for (let i = 0; i < cloudCount; i++)
        {
            data.clouds.push(newCloud());
        }
        data.lightning = newLightning();
    },
    draw : (p5) => {
        p5.background(255 - data.lightning.age * 20);

        time += 0.1;
        let intensity = p5.noise(0,0, time * 0.01);

        p5.fill(255);
        p5.noStroke();

        
        data.waves.forEach((wave, index) => {
            p5.fill("#" + colours[colours.length - Math.floor((wave.id / waveCount) * colours.length)])
            wave.points.forEach(point => {
                point.x = (point.x + (index * 0.1)) % 512
                const offset = p5.noise(point.x * 0.01, time * 0.1 + index, time * 0.001);
                p5.textSize(5 + (wave.id * 2))
                p5.text(point.char, point.x, point.y + (offset * ((50 * intensity) + 20)))
                // p5.circle(point.x, point.y + (offset * ((50 * intensity) + 20)), 5 + (wave.id * 2));
            })
        })
        
        if (data.lightning.age < 10)
        {
            data.lightning.age++;
            p5.fill(clamp(data.lightning.brightness, 200, 255));
            data.lightning.brightness += randomBetween(-30, 20);
            data.lightning.points.forEach(point => {
                p5.textSize(10);
                p5.text(point.char, point.x + randomBetween(-1, 1), point.y + randomBetween(-1, 1));
            })
        }

        data.clouds.forEach((cloud, index) => {
            cloud.age += 0.01;
            cloud.age %= (Math.PI * 2)
            cloud.x += randomBetween(-1, 1);
            cloud.y += randomBetween(-1, 1);
            cloud.x = clamp(cloud.x, 0, 512)
            cloud.y = clamp(cloud.y, 0, 512)
            p5.fill(100)
            p5.textSize(30 + 30 * Math.abs(Math.sin(cloud.age)));
            p5.text(cloud.char, cloud.x, cloud.y);
        });

        if (Math.random() < lightningChance)
        {
            data.lightning = newLightning();
        }
    },
    prompt : "Aesemic"
}