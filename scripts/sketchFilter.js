const sketchesContain = document.querySelector(".sketches-contain");
const sketches = sketchesContain.querySelectorAll(".sketch-div");
const taggedHeader = document.getElementById("sketch-tagged-header");
const taggedLabel = document.getElementById("sketch-tagged-label");

// Create array of sketch objects (optimization) and get all used tags
let sketchObjects = [];
let usedTags = [];
sketches.forEach(sketch => {
    const sketchTagLinks = sketch.querySelector(".blog-tags-contain").querySelectorAll(".blog-tag");
    let sketchTags = [];

    sketchTagLinks.forEach(link => {
        const tagLabel = link.innerText;
        sketchTags.push(tagLabel);

        if (!usedTags.includes(tagLabel)) usedTags.push(tagLabel);
    });

    sketchObjects.push({id: sketch.id, tags: sketchTags});
});

function filterSketches(tag) {
    const tagLower = tag.toLowerCase();

    sketches.forEach(sketch => {
        const sketchTags = sketchObjects.find(obj => obj.id == sketch.id).tags;

        const hasTag = sketchTags.includes(tag);
        if (!hasTag) sketch.remove();
    });
}

const urlParams = new URLSearchParams(window.location.search);
const tagParam = "tag";

function displayTagged(tag) {
    taggedHeader.style.display = "block";
    taggedLabel.innerText = tag;
}

function clearTag() {
    urlParams.delete(tagParam);
    window.location.search = urlParams;
}

if (urlParams.has(tagParam)) {
    let query = urlParams.get(tagParam);
    filterSketches(query);
    displayTagged(query);
}