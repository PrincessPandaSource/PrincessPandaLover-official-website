const body = document.querySelector("body");
const modal = document.getElementById("sketch-modal");

function openSketchModal(imgAttr, date, tags, description) {
    modal.style.display = "flex";
    modal.classList.add("show");
    body.classList.add("modal-open");

    const modalImg = modal.querySelector("#sketch-modal-img");
    const modalDate = modal.querySelector("#sketch-modal-date");
    const modalTags = modal.querySelector("#sketch-modal-tags");
    const modalDescript = modal.querySelector("#sketch-modal-descript");

    for (const attribute of imgAttr) {
        if (attribute.name == "class") continue;
        modalImg.setAttribute(attribute.name, attribute.value);
    }

    modalDate.innerText = date;
    modalTags.innerHTML = tags;

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

    history.pushState("", document.title, window.location.pathname + window.location.search);
}

function getDataFromSketchDiv(sketchDiv) {
    const sketchImg = sketchDiv.querySelector(".sketch-img");
    const sketchDate = sketchDiv.querySelector(".sketch-date");
    const sketchTags = sketchDiv.querySelector(".blog-tags-contain");
    const sketchDescript = sketchDiv.querySelector(".sketch-descript");

    let sketchDescriptHTML;
    if (sketchDescript) {
        sketchDescriptHTML = sketchDescript.innerHTML;
    } else {
        sketchDescriptHTML = null;
    }

    console.log(sketchImg.attributes);

    return {imgAttr: sketchImg.attributes, date: sketchDate.innerText, tagsHTML: sketchTags.innerHTML, description: sketchDescriptHTML};
}

function sketchLink(id) {
    const targetSketchDiv = document.getElementById(id);

    if (targetSketchDiv) {
        const {imgAttr, date, tagsHTML, description} = getDataFromSketchDiv(targetSketchDiv);
        openSketchModal(imgAttr, date, tagsHTML, description);
    }
}

if (window.location.hash) {
    const id = window.location.hash.slice(1);

    if (id.match("sketch-[0-9]+")) {
        // No scrolling to sketch div!
        window.scrollTo(0, 0);

        sketchLink(id);
    }
}