document.querySelectorAll(".articleSelect").forEach((element) => element.innerHTML = `
    <label for="article-select" style="color:black;">Select month:</label>
    <select id="article-select">
    <option value="July_2024.html">July 2024</option>
    <option value="June_2024.html">June 2024</option>
    <option value="May_2024.html">May 2024</option>
    </select>
    <button id="go-to-article" onclick="goToArticle()">Go</button>
`);