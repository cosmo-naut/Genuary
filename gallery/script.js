import generators from "../generators/generators.js";
const backgroundColour = 34;

new p5((p5) => {
    p5.setup = () => {
        const canvas = p5.createCanvas(512, 512);
        canvas.parent("frame");

        document.getElementsByClassName("roll")[0].addEventListener("click", regenerate);
    }

    p5.draw = () => {
        generators[day].draw(p5)
    }
});


let currentDay = 0;
let day = 0;

regenerate();

function regenerate() {
    generators[day].regenerate()
}