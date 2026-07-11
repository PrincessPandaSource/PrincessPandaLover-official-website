const body = document.querySelector("body");
const modal = document.getElementById("sketch-modal");

function openSketchModal(imgSrc, date, description) {
    modal.style.display = "flex";
    modal.classList.add("show");
    body.classList.add("modal-open");

    const modalImg = modal.querySelector("#sketch-modal-img");
    const modalDate = modal.querySelector("#sketch-modal-date");
    const modalDescript = modal.querySelector("#sketch-modal-descript");

    modalImg.src = imgSrc;
    modalDate.innerText = date;

    modalDescript.style.display = "block";
    if (description) {
        modalDescript.innerHTML = description;
    } else {
        modalDescript.style.display = "none";
    }
}

function closeSketchModal() {
    modal.style.display = "none";
    modal.classList.remove("show");
    body.classList.remove("modal-open");

    history.pushState("", document.title, window.location.pathname);
}

function getDataFromSketchDiv(sketchDiv) {
    const sketchImg = sketchDiv.querySelector(".sketch-img");
    const sketchDate = sketchDiv.querySelector(".sketch-date");
    const sketchDescript = sketchDiv.querySelector(".sketch-descript");

    let sketchDescriptHTML;
    if (sketchDescript) {
        sketchDescriptHTML = sketchDescript.innerHTML;
    } else {
        sketchDescriptHTML = null;
    }

    return {imgSrc: sketchImg.src, date: sketchDate.innerText, description: sketchDescriptHTML};
}

const allSketchDivs = document.querySelectorAll(".sketch-div");

allSketchDivs.forEach(sketchDiv => {
    const sketchImg = sketchDiv.querySelector(".sketch-img");

    sketchImg.addEventListener("click", () => {
        history.pushState(null, null, `#${sketchDiv.id}`);

        const {imgSrc, date, description} = getDataFromSketchDiv(sketchDiv);
        openSketchModal(imgSrc, date, description);
    });
})

if (window.location.hash) {
    const id = window.location.hash.slice(1);

    if (id.startsWith("sketch-")) {
        // No scrolling to sketch div!
        window.scrollTo(0, 0);

        const targetSketchDiv = document.querySelector(window.location.hash);

        if (targetSketchDiv) {
            const {imgSrc, date, description} = getDataFromSketchDiv(targetSketchDiv);
            openSketchModal(imgSrc, date, description);
        }
    }
}