document.querySelectorAll(".article-select").forEach((element, index) => {
    element.querySelector(`#go-to-article-${index}`).addEventListener('click', () => {
        window.location = element.querySelector(`#article-select-${index}`).value;
    })
});