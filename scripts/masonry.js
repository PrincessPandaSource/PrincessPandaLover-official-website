// CREDIT: https://codepen.io/Mandyee/pen/jOxLbLw
const masonry_contain = document.querySelector('.masonry-contain');
const masonry_entries = document.querySelectorAll('.masonry-entry');

function masonry() {
    let num_cols = 3;

    let width = window.innerWidth;

    if (width <= 767) {
        // Mobile
        num_cols = 1;
    } else if (width <= 1024) {
        // Tablet (portrait)
        num_cols = 2;
    }

    // Clear masonry_contain
    masonry_contain.innerHTML = "";

    for (let i = 1; i < num_cols + 1; i++) {
        let col_elem = document.createElement('div');
        col_elem.classList.add('masonry-col');
        masonry_contain.append(col_elem);
    }

    let array = [...Array(num_cols).keys()];

    let main_array = [];

    let times_by;

    if (masonry_entries.length % num_cols == 0) {
        times_by = Math.floor(masonry_entries.length / num_cols);
    } else {
        times_by = Math.ceil(masonry_entries.length / num_cols);
    }

    for (let i = 0; i < times_by; i++) {
        main_array.push(...array);
    }

    col_elems = document.querySelectorAll('.masonry-col');

    for (let i = 0; i < main_array.length; i++) {
        col_elems[main_array[i]].appendChild(masonry_entries[i]);
    }
}

masonry();

window.addEventListener('resize', masonry);