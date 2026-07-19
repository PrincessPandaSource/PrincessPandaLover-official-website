const searchBar = document.getElementById("mini-search-bar");

// sketchesContain, sketches, and urlParams already declared in sketchFilter.js

const searchHeader = document.getElementById("sketch-search-header");
const searchLabel = document.getElementById("sketch-search-label");

const searchParam = "search";

function search(query) {
    const queryLower = query.toLowerCase();

    sketches.forEach(sketch => {
        const sketchAltContent = sketch.querySelector(".sketch-img").alt.toLowerCase();
        const sketchDateContent = sketch.querySelector(".sketch-date").innerText.toLowerCase();
        const sketchTagsContent = sketch.querySelector(".blog-tags-contain").innerText.toLowerCase();
        const sketchDescriptContent = sketch.querySelector(".sketch-descript")?.innerText.toLowerCase();

        const hasQuery = sketchAltContent.includes(queryLower) ||
                        sketchDateContent.includes(queryLower) ||
                        sketchTagsContent.includes(queryLower) ||
                        sketchDescriptContent?.includes(queryLower);
        if (!hasQuery) sketch.remove();
    });
}

function displaySearched(query) {
    searchHeader.style.display = "block";
    searchLabel.innerText = query;
}

if (urlParams.has(searchParam)) {
    let query = urlParams.get(searchParam);
    searchBar.value = query;

    if (query == "") {
        urlParams.delete(searchParam);
        if (urlParams.size == 0) {
            history.pushState("", document.title, window.location.pathname.replace('\?+$', '')); // Removes trailing ?
        } else {
            history.pushState("", document.title, window.location.pathname + '?' + urlParams);
        }
    } else {
        search(query);
        displaySearched(query);
    }
}