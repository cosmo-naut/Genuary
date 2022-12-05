import generators from "../generators/generators.js";

new p5((s) => {
    s.setup = () => {
        const canvas = s.createCanvas(512, 512);
        canvas.parent("frame");

        document.getElementById("regenerateButton").addEventListener("click", regenerate);
    }

    s.draw = () => {
        s.background(34);
        // generators[day].draw()
    }
});

let currentDay = 0;
let day = 0;


function regenerate() {
    generators[day].regenerate()
}