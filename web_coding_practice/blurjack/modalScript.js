const helpButton = document.getElementById("howDoIPlay");
const modal = document.getElementById("helpModal");
const closeButton = document.getElementsByClassName("close")[0];

helpButton.onclick = function() {
    modal.style.display = "block";
}

closeButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 