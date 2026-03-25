const sonic4_day_counter = document.getElementById("day-counter");
const sonic4_hour_counter = document.getElementById("hour-counter");
const sonic4_min_counter = document.getElementById("min-counter");
const sonic4_sec_counter = document.getElementById("sec-counter");
const spinoff_day_counter = document.getElementById("spinoff-day-counter");
const spinoff_hour_counter = document.getElementById("spinoff-hour-counter");
const spinoff_min_counter = document.getElementById("spinoff-min-counter");
const spinoff_sec_counter = document.getElementById("spinoff-sec-counter");

const sonic4_date = new Date("Mar 19, 2027 0:00:00").getTime();
const spinoff_date = new Date("Dec 28, 2028 0:00:00").getTime();

function countdown(film) {
  let date;
  let day_counter;
  let hour_counter;
  let min_counter;
  let sec_counter;

  switch(film) {
    case "sonic4":
      date = sonic4_date;
      day_counter = sonic4_day_counter;
      hour_counter = sonic4_hour_counter;
      min_counter = sonic4_min_counter;
      sec_counter = sonic4_sec_counter;
      break;
    case "spinoff":
      date = spinoff_date;
      day_counter = spinoff_day_counter;
      hour_counter = spinoff_hour_counter;
      min_counter = spinoff_min_counter;
      sec_counter = spinoff_sec_counter;
      break;
  }

  let now = new Date().getTime();
  let distance = date - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  day_counter.innerText = days;
  hour_counter.innerText = hours;
  min_counter.innerText = minutes;
  sec_counter.innerText = seconds;
}

setInterval(function () {
    countdown("sonic4")
    countdown("spinoff");
}, 1000);