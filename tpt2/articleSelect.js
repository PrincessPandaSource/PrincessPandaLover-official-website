document.querySelectorAll(".articleSelect").forEach((element, index) => {
    element.innerHTML = `
    <label for="article-select-${index}" style="color:black;">Select month:</label>
    <select id="article-select-${index}">
    <option value="July-2024.html">July 2024</option>
    <option value="June-2024.html">June 2024</option>
    <option value="May-2024.html">May 2024</option>
    </select>
    <button id="go-to-article-${index}" onclick="goToArticle()">Go</button>
    `;

    element.querySelector(`#go-to-article-${index}`).addEventListener('click', () => {
        window.location = element.querySelector(`#article-select-${index}`).value;
    })
});