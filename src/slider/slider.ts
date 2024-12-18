/*
        <div id="images" class="image-group">
            <div class="image">
                <img class="active-image" src="img/1.jpg" alt="1.jpg">
            </div>
        </div>

        <div id="buttons" class="button-group">
            <button class="btn btn-primary pre">Previous</button>
            <button class="btn btn-primary next">Next</button>
        </div>

*/

import { ImageModel } from "./image";


export class Slider {
    imageList: ImageModel[];
    currentImageId: number;


    sliderElement: HTMLElement | null;
    imagesElement: HTMLDivElement | null;
    imageElement: HTMLDivElement | null;
    imgElement: HTMLImageElement | null;
    buttonsElement: HTMLDivElement | null;
    preButtonElement: HTMLButtonElement | null;
    nextButtonElement: HTMLButtonElement | null;


    constructor(imageList: ImageModel[]) {
        this.imageList = imageList;
        this.createElements();
    }

    createElements() {
        this.sliderElement = document.getElementById("slider");
        console.log(this.sliderElement);

        //images
        // images div element
        this.imagesElement = document.createElement("div");
        this.imagesElement.id = "images";
        this.imagesElement.className = "image-group";

        // image div element
        this.imageElement = document.createElement("div");
        this.imageElement.className = "image";

        // img
        this.imgElement = document.createElement("img");
        this.imgElement.className = "active-image";

        this.imageElement.appendChild(this.imgElement);
        this.imagesElement.appendChild(this.imageElement);

        //buttons
        this.buttonsElement = document.createElement("div");
        this.buttonsElement.id = "buttons";
        this.buttonsElement.className = "button-group";

        //previous button element
        this.preButtonElement = document.createElement("button");
        this.preButtonElement.className = "btn btn-primary pre";
        this.preButtonElement.textContent = "Previous";
        this.preButtonElement.addEventListener("click", this.goToPreSlide.bind(this));

        // next button element
        this.nextButtonElement = document.createElement("button");
        this.nextButtonElement.className = "btn btn-primary next";
        this.nextButtonElement.textContent = "Next";
        this.nextButtonElement.addEventListener("click", this.goToNextSlide.bind(this));

        this.buttonsElement.appendChild(this.preButtonElement);
        this.buttonsElement.appendChild(this.nextButtonElement);

        this.sliderElement?.appendChild(this.imagesElement);
        this.sliderElement?.appendChild(this.buttonsElement);
    }

    loadImage(imageIndex: number, imagePosition: string | null) {
        this.clearImage();
        this.currentImageId = this.imageList[imageIndex - 1].id;
        const imagePath = this.imageList[imageIndex - 1].img;
        const img = this.generateImg(imagePath, imagePosition!);
        this.imageElement?.appendChild(img);
    }

    goToPreSlide(ev: Event) {
        let newImageId = this.currentImageId - 1;
        if (newImageId <= 0) {
            newImageId = this.imageList.length;
        }
        this.loadImage(newImageId, "image-animate-pre");
    }

    goToNextSlide(ev: Event) {
        let newImageId = this.currentImageId + 1;
        if (newImageId >= this.imageList.length + 1) {
            newImageId = 1;
        }
        this.loadImage(newImageId, "image-animate-next");

    }

    generateImg(imgPath: string, imgPosition: string): HTMLImageElement {
        const img = document.createElement("img");
        img.src = imgPath;
        img.className = `active-image ${imgPosition? imgPosition : ""}`;
        return img;
    }

    clearImage() {
        this.imageElement!.innerHTML = "";
    }

}