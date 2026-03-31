function hideNormalContent() {
    document.querySelectorAll(".normal-day").forEach(ele => ele.classList.add("holiday"));
}

function aprilFools() {
    const today = new Date();
    const is_april_fools = today.getMonth() === 3 && today.getDate() === 1;

    if (!is_april_fools) return;

    hideNormalContent();

    // Replace certain images
    document.querySelectorAll(".april-fools").forEach(ele => ele.classList.add("holiday"));

    // Replace certain text
    const countdown_heading = document.querySelector(".countdown-heading");
    countdown_heading.innerText = "COUNTDOWN TO UGLY";

    // Replace video
    const featured_video = document.getElementById("the-featured-video");
    featured_video.src = "https://www.youtube.com/embed/IAYEMlPOHG8?si=KCb7NT3yYNp3EJkU";
}

aprilFools();