const images = [
    { id: 1, img: "../img/1.jpg" },
    { id: 2, img: "../img/2.jpg" },
    { id: 3, img: "../img/3.jpg" },
    { id: 4, img: "../img/4.jpg" },
];

const ui = new UI();

const img = document.createElement("img");
let currentImageId;

loadImage(1);
function loadImage(indx) {
    // ui.imageDiv.removeChild(img);
    currentImageId = images[indx - 1].id;
    img.src = images[indx - 1].img;
    img.classList.add("active-image");

    ui.imageDiv.appendChild(img);
}

{/* <img class="active-image" src="img/1.jpg" alt="1.jpg"> */ }


ui.btnPre.addEventListener("click", () => {
    changeImagePre();
    let newImageId = currentImageId - 1;
    if (newImageId <= 0) {
        newImageId = images.length;
    }

    loadImage(newImageId);

});


ui.btnNext.addEventListener("click", () => {
    changeImageNext();
    let newImageId = currentImageId + 1;
    if (newImageId >= images.length + 1) {
        newImageId = 1;
    }

    loadImage(newImageId);
})


function changeImagePre(){
    const activeImage = document.querySelector("#images .image .active-image");
    activeImage.className="active-image image-animate-pre";
}

function changeImageNext(){
    const activeImage = document.querySelector("#images .image .active-image");
    activeImage.className="active-image image-animate-next";
}