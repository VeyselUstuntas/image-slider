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

    mouseX: number;
    mouseY: number;
    mouseTX: number;
    mouseTY: number;
    startX = 0;
    startY = 0;
    panning = false;


    sliderElement: HTMLElement | null;
    imagesElement: HTMLDivElement | null;
    imageElement: HTMLDivElement | null;
    imgElement: HTMLImageElement | null;
    buttonsElement: HTMLDivElement | null;
    resetButtonsElement: HTMLDivElement | null;
    preButtonElement: HTMLButtonElement | null;
    nextButtonElement: HTMLButtonElement | null;
    resetPanButton: HTMLButtonElement | null;


    constructor(imageList: ImageModel[]) {
        this.imageList = imageList;
        this.createElements();
    }

    createElements() {
        this.sliderElement = document.getElementById("slider");
        console.log(this.sliderElement);

        //resetPanButton
        this.resetPanButton = document.createElement("button");
        this.resetPanButton.className = "btn btn-primary reset";
        this.resetPanButton.textContent = "Reset Pan";
        this.resetPanButton.addEventListener("click", this.resetImagePan.bind(this));

        this.resetButtonsElement = document.createElement("div");
        this.resetButtonsElement.id = "reset-button";
        this.resetButtonsElement.appendChild(this.resetPanButton);

        //images
        // images div element
        this.imagesElement = document.createElement("div");
        this.imagesElement.id = "images";
        this.imagesElement.className = "image-group";


        // image div element
        this.imageElement = document.createElement("div");
        this.imageElement.className = "image";
        this.imageElement.addEventListener("wheel", this.imageZoom.bind(this), { passive: false });
        this.imageElement.addEventListener("mousedown", this.onMouseDown.bind(this), { passive: false });
        this.imageElement.addEventListener("mouseup", this.onMouseUp.bind(this), { passive: false });
        this.imageElement.addEventListener("mousemove", this.onMouseMove.bind(this), { passive: false });


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
        this.sliderElement?.appendChild(this.resetButtonsElement);
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
        this.resetImagePan(ev);
        let newImageId = this.currentImageId - 1;
        if (newImageId <= 0) {
            newImageId = this.imageList.length;
        }
        this.loadImage(newImageId, "image-animate-pre");
    }

    goToNextSlide(ev: Event) {
        this.resetImagePan(ev);
        let newImageId = this.currentImageId + 1;
        if (newImageId >= this.imageList.length + 1) {
            newImageId = 1;
        }
        this.loadImage(newImageId, "image-animate-next");

    }

    generateImg(imgPath: string, imgPosition: string): HTMLImageElement {
        const img = document.createElement("img");
        img.src = imgPath;
        img.className = `active-image ${imgPosition ? imgPosition : ""}`;
        return img;
    }

    clearImage() {
        this.imageElement!.innerHTML = "";
    }

    ts = {
        scale: 1,
        translate: {
            x: 0,
            y: 0
        }
    };

    imageZoom(ev: WheelEvent) {
        console.log(ev.deltaY);
        const deltaY = ev.deltaY;
        ev.preventDefault();
        var func = this.imageElement!.onwheel;
        this.imageElement!.onwheel = null;

        let rec = this.imageElement!.getBoundingClientRect();
        let x = (ev.clientX - rec.x) / this.ts.scale;
        let y = (ev.clientY - rec.y) / this.ts.scale;

        let delta = deltaY;
        this.ts.scale = (delta > 0) ? (this.ts.scale + 0.2) : (this.ts.scale - 0.2);

        let m = (delta > 0) ? 0.1 : -0.1;
        this.ts.translate.x += (-x * m * 2) + (this.imageElement!.offsetWidth * m);
        this.ts.translate.y += (-y * m * 2) + (this.imageElement!.offsetHeight * m);

        this.setTransform();
        this.imageElement!.onwheel = func;

    }

    onMouseUp(ev: MouseEvent) {
        this.panning = false;
        this.imageElement!.style.cursor = "grab";
    }

    onMouseDown(ev: MouseEvent) {
        ev.preventDefault();
        this.panning = true;
        this.imageElement!.style.cursor = 'grabbing';
        this.mouseX = ev.clientX;
        this.mouseY = ev.clientY;
        this.mouseTX = this.ts.translate.x;
        this.mouseTY = this.ts.translate.y;

    }


    onMouseMove(ev: MouseEvent) {
        ev.preventDefault();
        const x = ev.clientX;
        const y = ev.clientY;
        if (!this.panning) {
            return;
        }
        this.ts.translate.x = this.mouseTX + (x - this.mouseX);
        this.ts.translate.y = this.mouseTY + (y - this.mouseY);

        this.setTransform();
    }


    setTransform() {
        const steps = `translate(${this.ts.translate.x}px,${this.ts.translate.y}px) scale(${this.ts.scale})`;
        this.imageElement!.style.transform = steps;
    }


    resetImagePan(ev: Event) {
        this.ts.scale = 1;
        this.ts.translate = {
            x: 0,
            y: 0
        };
        this.imageElement!.style.transform = 'none';
    }

}