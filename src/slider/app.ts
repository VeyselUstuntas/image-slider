import { ImageModel } from "./image";
import { Slider } from "./slider";

import img1 from '../static/img/1.jpg';
import img2 from '../static/img/2.jpg';
import img3 from '../static/img/3.jpg';
import img4 from '../static/img/4.jpg';

export class App {
    private images: ImageModel[];
    private slider: Slider;


    constructor() {
        const images = [
            { id: 1, img: img1 },
            { id: 2, img: img2 },
            { id: 3, img: img3 },
            { id: 4, img: img4 },
        ];

        this.images = images;
        this.slider = new Slider(images);

    }

    runApp() {
        this.slider.loadImage(this.images[0].id, null);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.runApp();
});

