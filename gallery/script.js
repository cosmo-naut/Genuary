import generators from "../generators/generators.js";
const backgroundColour = 34;

new p5((p5) => {
    p5.setup = () => {
        const canvas = p5.createCanvas(512, 512);
        canvas.parent("frame");

        document.getElementsByClassName("roll")[0].addEventListener("click", regenerate);
        generators[day].setup(p5);
    }

    p5.draw = () => {
        generators[day].draw(p5)
    }
});

const regenerate = () => {
    generators[day].regenerate();
    updateHeading();
}

const updateHeading = () => {
    const heading = document.getElementById("pageHeading");
    heading.innerText = `${day} - ${generators[day].prompt}`
}


let day = 25;

regenerate();