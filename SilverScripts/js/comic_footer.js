//the footer of the site would be handled in this javascript file, so you don't have to copypaste the whole thing onto every page.
//at the bottom of your page, but before the js script calls and the closing body tag, put an empty div with a class of "writeFooter"
document.querySelector(".writeFooter").innerHTML = `
    <footer>
        <p>Copyright © 2024 by PrincessPandaLover. <i>Sonic the Hedgehog</i> is copyrighted © by SEGA CORPORATION.</p>
        <p>All content may be reproduced and/or altered with attribution and for noncommercial purposes that are not abusive or illegal.</p>
        <p>Website template:</p>
        <a href="https://rarebit.neocities.org"><img src="img/rarebitlogo_small.png" height = "30" /></a><br/><span style="font-size:0.8em">(Of course, I could've coded the whole thing myself, but when I discovered this template, I was like "This is a godsend! I NEED to use it!".)</span>
        <p>Hosted by <a href="https://www.netlify.com/">Netlify</a></p>
    </footer>
`;
