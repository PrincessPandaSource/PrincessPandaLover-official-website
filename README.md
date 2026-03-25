# PrincessPandaLover - Official website
![PrincessPandaLover logo](https://princesspandalover.com/images/logo.svg)

This is my official personal website that I use for showcasing my creative works, such as art and comics, as well as web coding gizmos and experiments, and personal writings about what I do. It can be accessed [here](https://princesspandalover.com/).

The source code uses [Eleventy](https://www.11ty.dev/) to generate the website. HTML (I'd rather code my posts myself, thank you) and Nunjucks are used as the main languages. The website is deployed via [Cloudflare Workers](https://workers.cloudflare.com/).

## Important notices
* If you have noted a significant error on my website, please open up a new issue in the "Issues" tab so that I can be notified. If you can fix it yourself, make a pull request.
* Automatically optimized images are used on the site to improve performance. To access the original, unoptimized images, edit the URL so that the width and preceding dash is removed and the extension is the original (typically PNG).

## How to run locally
First, Node.js and NPM are needed. Please refer to [this installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) if you don't have them.

Then, in the terminal with the website directory set as the current one, run the following command to install the dependencies needed:
```
npm i
```

To build the website and launch a local server running it, run this command:
```
npm start
```

Eleventy does not delete files from the output directory when they are deleted themselves. To remove the output directory for a refreshed build, run ```npm run clean```.

To merely generate the build, but not launch the server, run ```npm run build```.

## Copyright
Source code is licensed under the MIT license. (Some code was written with the assistance of AI. Please read [my GitHub bio](https://github.com/PrincessPandaSource/PrincessPandaSource/blob/main/README.md) for the disclaimer about this.) Original assets, such as images and audio, may only be used with attribution and for non-commercial purposes that are not abusive or illegal, unless otherwise noted. Copyrighted assets not owned by me are used in regard to the U.S. Fair Use doctrine.

Eleventy is [licensed under the MIT license](https://github.com/11ty/eleventy/blob/main/LICENSE) and Rarebit is [licensed under the GPL-3.0 license](https://github.com/diana-wright/Rarebit/blob/main/LICENSE).

