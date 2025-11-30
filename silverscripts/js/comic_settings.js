//comic_settings.js was created by geno7, with much needed assistance from Dannarchy

//this is the main file you'll be messing with to manage and update your comic. most (not all) of the main toggle-able settings are here.

//comic_archive has more settings pertaining to the archive page, and comic_show has settings pertaining to the main place that pages of your comic are displayed.

let pg = Number(findGetParameter("pg")); //make "pg" mean the current page number (this line doesnt work unless I put it here, if you're inexperienced with js dont worry about it)

////////////////////////
//VARIABLES FOR TWEAKING
////////////////////////

//REALLY IMPORTANT ONES
const maxpg = 5; //the current number of pages your comic has in total. this DOESNT necessarily mean number of IMAGE FILES as it doesn't count pages split into multiple files. 
//YOU MUST UPDATE THIS NUMBER EVERY TIME YOU ADD A NEW PAGE or else it wont display the most recent page

// COMIC PAGE SETTINGS
const folder = "img/comics"; //directory of the folder where you keep all the comics
const image = "Comic"; //what you'll name all your comic pages
const imgPart = "_" //special character(s) you put after the page number to subdivide pages into multiple image files (ie pg2_1, pg2_2, etc)
const ext = "png"; //file extension of your comic pages

//THUMBNAIL SETTINGS
const thumbFolder = "img/thumbs" //directory of the folder where you keep all the thumbnail images for the comics, in case you want the archive page to use thumbnails.
const thumbExt = "png" //file extension of thumbnails
const thumbDefault = "default" //name of the default thumbnail that displays when no thumbnail is set, located in the directory you set thumbFolder to.

//NAVIGATION SETTINGS
const navText = ["First","Previous","Next","Last"]; //alt text for your nav images, or just the text that shows up if you're not using images
const navFolder = "img/comicnav"; //directory where nav images are stored
const navExt = "svg" //file extension of nav images
const navScrollTo = ""; //id of the div you want the page to automatically scroll to when you click to the next comic. will turn off if you delete text between quotation marks

if (pg == 0) {pg = maxpg;} //display MOST RECENT COMIC when the webpage is loaded. if you want to instead have the FIRST COMIC displayed first, change maxpg to 1.

//pgData holds all the parameters for each of your pages. copypaste this and fill out accordingly:
/* 
    {
        pgNum: ,
        title: "",
        date: writeDate([YEAR],[MONTH],[DAY]),
        altText: "",
        imageFiles: "",
        authorNotes: ``
    },
*/
//Note: the formatting is important! The whole thing won't show up if you forget to include the commas or curly braces in the right place.

const pgData = [
    {
        pgNum: 1, //what page number it is
        title: "AI is After Both Ends", //the title of the page (leaving this blank will default it to "Page X")
        date: writeDate(2024, 3, 11), //the date on which the page was posted (mainly for the archive). The date is written using a function called "writeDate", basically just put writeDate and then some parenthesis and, comma separated, the year followed by the month and the day. Don't forget another comma at the end outside the parenthesis!
        altText: "Blaze is shown on a video call screen holding up a realistic drawing of a non-anthropomorphic wolf and saying, 'I may be a good artist, but AI may REPLACE artists. Companies may use AI instead to save money.' She then puts it down, looks at the camera, and says, smiling, 'Fortunately, I'm majoring in political science. I want to work for the government one day.' Silver, sitting at his desk with his laptop, says, 'Well, there's also the fear of AI replacing PROGRAMMERS too. And I'm studying to be one! Aren't programmers supposed to be at the top, while artists are near the bottom!'", //the alt text (mouse over text) for this particular comic. put nothing inbetween the quotes for no alt text
        imageFiles: 1, //how many image files this page is split into
        authorNotes: `
            <p>First strip in the comic, woohoo!</p>
            <p>Work on this comic strip began the Wednesday two weeks ago. I was gonna start much earlier, but I decided to participate in the Homemade TCG Community Discord server's card game jam, because I thought it would be nice and I'm developing my tabletop game design skills. You can see my entry <a href="https://screentop.gg/@PPLBoard/Cro-MobianSpring">here</a>. Well, my work for the game jam, which involved spending pretty much all my free time on it and sleepless nights (it didn't help I was facing <i>two</i> computer science exams), taught me how to maximize my creative output: Set time constraints to brainstorm quickly and spend as much time as you can!</p>
            <p>I didn't expect to get the comic strip done by Monday, but work took much longer than I expected, because of the inking process, which takes much more diligence than merely pencilling. Oh, and I failed <i>yet another Data Structures and Algorithms exam in a row</i>, which means sacrificing much of my spare time in order to pass the class now, and I'm primarily focusing on <i>Silver Scripts</i> for the time being.</p>
            <p>I intended the strip to have more shading, done in a "scribbly" style, but because of the inking process, I will have the shading be in the form of filling in certain areas entirely, maybe until I learn better time management skills.</p>
            <p>Anyway, enjoy this comic strip and be sure to check back for more!</p>
            <p>(BTW, the realistic wolf drawing was based on <a href="https://commons.wikimedia.org/wiki/File:Eurasian_wolf_2.jpg">this image</a>, and yes, I drew it.)</p>
            `,
    },
    {
        pgNum: 2, //what page number it is
        title: "Silver's Unfun Spring Break", //the title of the page (leaving this blank will default it to "Page X")
        date: writeDate(2024, 6, 17), //the date on which the page was posted (mainly for the archive). The date is written using a function called "writeDate", basically just put writeDate and then some parenthesis and, comma separated, the year followed by the month and the day. Don't forget another comma at the end outside the parenthesis!
        altText: "Blaze, at a tropical resort and wearing a tankini, is looking down on her phone and chatting, 'Hi, I'm in Zona de Fila Complejo. How are you taking your spring break from schoolwork?' Silver, on the other side of the video call and sitting at his desk in front of the laptop, says 'I'm not so fortunate, because....' He then lunges out and exclaims '...I BOMBED a Data Structures and Algorithms exam! Only a 20%!!!' The comic then switches to the screen of Blaze's phone, showing Silver with a tear in his eye and saying 'So I have to study instead of going elsewhere or playing video games all day. Sad, RIGHT?!?!'", //the alt text (mouse over text) for this particular comic. put nothing inbetween the quotes for no alt text
        imageFiles: 1, //how many image files this page is split into
        authorNotes: `
            <p>The second comic strip is here, and it's been 3 months.</p>
            <p>(If you're wondering about some of the translucent lineart sticking beyond the completely opaque lineart... If it weren't for the sheer dress layer being part of the white layer, me combining that lineart with the joined lineart layer and <i>deleting the original layer</i>, and later realizing both Krita and GIMP treat the translucent color so literally that I couldn't get rid of it easily, I would've fixed that, but I couldn't, so I guess we have to deal with it.)</p>
            <p>During college, I was indeed trying to work diligently on this strip, but, having to deal with the collegework, I saw the webcomic as work rather than relief from collegework, so I abstained from it in favor for doodling. I could've tackled it right away when summer break started, but my father is making me do tedious coding practice first. I tried to balance both the coding and artistic hobbies, but I found that focusing on the coding only was faster in getting it done. So, yeah, that explains the delay.</p>
            <p>By the way, "Zona de Fila Complejo" is supposed to be Spanish for something like "Hotel Row Zone"... I forgot by now. It's obviously been a while.</p>
            <p>Now, time to brainstorm more for <i>Silver Scripts</i>, which I haven't done in a long time.</p>
            <p>(Have you been checking out <a href="/tpt2/index.html">My Theme Park Tycoon 2 Buildlog</a>?)</p>
            <p><b>Edit</b>: I just realized I didn't blacken some of Blaze's lineart when those parts were supposed to. Sorry for the error and my forgetfulness!</p>
            `,
    },
    {
        pgNum: 3, //what page number it is
        title: "Reinforcement", //the title of the page (leaving this blank will default it to "Page X")
        date: writeDate(2024, 9, 3), //the date on which the page was posted (mainly for the archive). The date is written using a function called "writeDate", basically just put writeDate and then some parenthesis and, comma separated, the year followed by the month and the day. Don't forget another comma at the end outside the parenthesis!
        altText: "'The next semester...', Silver is standing in his nearly empty dorm room, with a large moving box and unattended bed visible. With hands on his hips, he says, 'I wonder... Does college force you to completely move in and out every year just to train you for moving away from your parents for good through reinforcement?' He then opens and reaches into a suitcase, saying to himself, 'If so, and you only have to work on job shifts afterwards...'. He then says 'Is homework for worst case scenarios or just pure torture?!', becoming annoyed.'", //the alt text (mouse over text) for this particular comic. put nothing inbetween the quotes for no alt text
        imageFiles: 1, //how many image files this page is split into
        authorNotes: `
            <p>To be more consistent with my real life, I've decided to fast-forward <i>Silver Scripts</i> to the start of my college year (I'm now a junior! Only two more years to go.).</p>
            <p>During summer, I tried to focus on both coding practice, which was constantly assigned by my father, and a web comic book which is based on a concept I've had in my head since childhood... Too bad I ran out of time to bring it to life, but <i>Silver Scripts</i> is an ingenious idea also, so I'm working on it as <i>the</i> hobby to do in college.</p>
            <p>Took like 3 weeks, because I first had to do schoolwork, then draft the strip, and then yeah! (Confession: I haven't been really creative in the few past years due to trauma... Also, I have a diary to keep track of what I did every day so I can get ideas for <i>Silver Scripts</i>.)</p>
            <p>(Also, I manually painted those lines white.)</p>
            <p>Hopefully, there will be more consistent strips for the rest of year.</p>
            `,
    },
    {
        pgNum: 4, //what page number it is
        title: "Thin-Skinned", //the title of the page (leaving this blank will default it to "Page X")
        date: writeDate(2024, 12, 31), //the date on which the page was posted (mainly for the archive). The date is written using a function called "writeDate", basically just put writeDate and then some parenthesis and, comma separated, the year followed by the month and the day. Don't forget another comma at the end outside the parenthesis!
        altText: "At lunch, Wave is sitting with Silver as they eat noodles. She says, 'Yeah, Buzzin may be a mean place, but they always treat me with respect there! How's your experience with Answer-Aligned Programming? I heard it's the best place for programmers.' Silver answers with a face somewhat asking for pity, 'Yeah, I go on that site a lot, but I don't want to post. I heard they're so rude.' Wave nonchalantly replies, 'How about you grow thicker skin?'", //the alt text (mouse over text) for this particular comic. put nothing inbetween the quotes for no alt text
        imageFiles: 1, //how many image files this page is split into
        authorNotes: `
            <p>Turns out, this is only the fourth strip of the comic, and the last one of 2024.</p>
            <p>Also, Wave the Swallow!</p>
            <p>This strip was started shortly after the previous one. However, I had <i>really</i> horrid time management skills. When I finally got my act together and began using a schedule and the Pomodoro technique, I didn't have time for the comic. (Also, the diary has been repurposed into a sketchbook specifically into <i>Silver Scripts</i> as I was often too tired to write in it at the end of the day.)</p>
            <p>My New Year's resolution is to work more consistently on my art, especially <i>Silver Scripts</i>. Hopefully with better time management skills, I can publish <i>Silver Scripts</i> strips more regularly!</p>
            <p>(FYI: Buzzin and Answer-Aligned Programming are this world's counterparts to Reddit and Stack Overflow respectively.)</p>
            `,
    },
    {
        pgNum: 5, //what page number it is
        title: "Heart Over Head", //the title of the page (leaving this blank will default it to "Page X")
        date: writeDate(2025, 11, 5), //the date on which the page was posted (mainly for the archive). The date is written using a function called "writeDate", basically just put writeDate and then some parenthesis and, comma separated, the year followed by the month and the day. Don't forget another comma at the end outside the parenthesis!
        altText: "Silver sits with Tikal in the lecture hall with their laptops. Tikal greets him, 'Silver, it's you, again!' Silver replies, 'Third year together!' Tikal says, 'I've read the syllabus and we get to make our own software. My artistic sense is tingling!' She giddily says, 'I already have an idea: A Chao-themed social network, complete with Chao avatars and virtual worlds!'. This is while she is beaming with Chao icons on her eyes and her hands clasped, being surrounded by imaginary Chao. Back to reality, while Tikal is still cheery, Silver leans back and responds, 'Nice, but we only have three months and a few people. I have a hard time coming up of an idea practical for that.'", //the alt text (mouse over text) for this particular comic. put nothing inbetween the quotes for no alt text
        imageFiles: 1, //how many image files this page is split into
        authorNotes: `
            <p><b>FINALLY</b>, another Silver Scripts strip, when 2025 is near its end!</p>
            <p>I started this strip in early 2025. I was just using my schedule and TickTick reminder app. However, I thought my routine had become so attuned that I didn't need them anymore. You ADHD brain and your positive illusory bias! Cue struggling with schoolwork for the semester. I also juggled two summer classes at once. Those all left no work for <i>Silver Scripts</i>, and finished art in general.</p>
            <p>I'm currently on a year-off from college. I am trying to make use of ADHD productivity techniques and make time for my hobbies. It took a few weeks to get this comic done, especially inking it. (Speaking of inking, I've figured out how drawing smooth lines work out in Krita, so I've switched to the raw art being done in Krita. It was that, at first, Krita's smoothing features felt too slow for me. GIMP is only used for lettering now.)</p>
            <p>Oh yeah, and I was definitely the artist of my team project in the Software Engineering class.</p>
            `,
    }
];

//below is a function you dont rly need to mess with but if you're more experienced with js you can

function findGetParameter(parameterName) { //function used to write a parameter to append to the url, to give each comic page its own unique url
    let result = null,
    tmp = []; 
    let items = location.search.substr(1).split("&");
    for (let index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function writeDate(year,month,day) { //write date of comic page
    const date = new Date(year,month-1,day)
    .toDateString() //format date as Day Month Date Year
    .toString() //convert it to a string
    .slice(4) //remove the Day
    return date
}
