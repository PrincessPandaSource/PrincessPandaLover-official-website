// https://www.tutorialspoint.com/how-to-create-a-modal-image-gallery-with-css-and-javascript (will revamp to make code original)
var modalEle = document.querySelector(".modal");
var modalImage = document.querySelector(".modalImage");
Array.from(document.querySelectorAll(".ImgThumbnail")).forEach(item => {
item.addEventListener("click", event => {
modalEle.style.display = "block";
modalImage.src = event.target.src;
});
});
document.querySelector(".close").addEventListener("click", () => {
modalEle.style.display = "none";
});