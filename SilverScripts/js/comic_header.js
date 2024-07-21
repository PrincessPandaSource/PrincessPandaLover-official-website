//the header of the site would be handled in this javascript file, so you don't have to copypaste the whole thing onto every page.
//at the bottom of your page, but before the js script calls and the closing body tag, put an empty div with a class of "writeHeader"
document.querySelector(".writeHeader").innerHTML = `
    <header align="center">
        <a href="index.html"><img src="./img/Logo.svg" alt="Silver Scripts logo" /></a>
        <div id="nav">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="archive.html">Archive</a></li>
                <li><a href="characters.html">Characters</a></li>
                <li><a href="/index.html">PrincessPandaLover home</a></li>
            </ul>
        </div>
    </header>
`;