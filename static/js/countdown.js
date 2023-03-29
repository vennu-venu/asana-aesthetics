var count = 4;
var timerElement = document.getElementById("countdown");
var audio = new Audio();
var ping = "static/audio/ping.mp3";
var start = "../audio/start.mp3";

document.getElementById("delay").style.display = "none";
setTimeout(function () {
  document.getElementById("delay").style.display = "block";
}, 4000);


const playAudio = (count) => {
  console.log("HIIIIII!");
  switch (count) {
    case 3:
      audio.src = start;
      audio.play();
      break;
    case 2:
      audio.src = start;
      audio.play();
      break;
    case 1:
      audio.src = start;
      audio.play();
      break;
    case 0:
      audio.src = ping;
      audio.play();
      clearInterval(count);
      break;
  }
};

const countdown = () => {
  count--;
  timerElement.innerHTML = count;
  playAudio(count);

  if (count < 1) {
    clearInterval(countdown);
    timerElement.style.display = "none";
    setTimeout(function () {}, 1000);
  }
};

setInterval(countdown, 1000);
