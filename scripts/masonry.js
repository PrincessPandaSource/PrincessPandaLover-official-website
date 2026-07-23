// CREDIT: https://codepen.io/Mandyee/pen/jOxLbLw
const masonryContain = document.querySelector('.masonry-contain');
const masonryEntries = document.querySelectorAll('.masonry-entry');

function masonry() {
    let numCols = 3;

    let width = window.innerWidth;

    if (width <= 767) {
        // Mobile
        numCols = 1;
    } else if (width <= 1024) {
        // Tablet (portrait)
        numCols = 2;
    }

    // Clear masonry_contain
    masonryContain.innerHTML = "";

    for (let i = 1; i < numCols + 1; i++) {
        let colElem = document.createElement('div');
        colElem.classList.add('masonry-col');
        masonryContain.append(colElem);
    }

    let colKeyArray = [...Array(numCols).keys()];

    let colArray = [];

    let timesBy;

    if (masonryEntries.length % numCols == 0) {
        timesBy = Math.floor(masonryEntries.length / numCols);
    } else {
        timesBy = Math.ceil(masonryEntries.length / numCols);
    }

    for (let i = 0; i < timesBy; i++) {
        colArray.push(...colKeyArray);
    }

    let colElems = document.querySelectorAll('.masonry-col');

    for (let i = 0; i < colArray.length; i++) {
        if (masonryEntries[i]) {
            colElems[colArray[i]].appendChild(masonryEntries[i]);
        }
    }
}

document.addEventListener("DOMContentLoaded", function(arg) {
    masonryContain.style.display = "flex";
    masonry();
});

window.addEventListener('resize', masonry);