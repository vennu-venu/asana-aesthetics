let milliSeconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let totalSeconds = 0;
let timer = false;

function start() {
  if (timer == false) {
    timer = true;
    stopWatch();
  }
}

function stop() {
  timer = false;
}

function reset() {
  timer = false;

  milliSeconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;

  document.getElementById("seconds").innerHTML = "00";
  document.getElementById("minutes").innerHTML = "00";
  document.getElementById("hours").innerHTML = "00";
}

function stopWatch() {
  if (timer == true) {
    milliSeconds = milliSeconds + 1;

    if (milliSeconds > 99) {
      milliSeconds = 0;
      seconds = seconds + 1;
      totalSeconds = totalSeconds + 1;
    }
    if (seconds > 59) {
      seconds = 0;
      minutes = minutes + 1;
    }
    if (minutes > 59) {
      minutes = 0;
      hours = hours + 1;
    }

    let milliSecondString = milliSeconds;
    let secondString = seconds;
    let minuteString = minutes;
    let hoursString = hours;

    if (milliSeconds < 10) {
      milliSecondString = "0" + milliSecondString;
    }
    if (seconds < 10) {
      secondString = "0" + secondString;
    }
    if (minutes < 10) {
      minuteString = "0" + minuteString;
    }
    if (hours < 10) {
      hoursString = "0" + hoursString;
    }

    if (seconds === 1) {
      document.getElementById("seconds-label").innerHTML = "Second";
    } else {
      document.getElementById("seconds-label").innerHTML = "Seconds";
    }

    if (minutes === 1) {
      document.getElementById("minutes-label").innerHTML = "Minute";
    } else {
      document.getElementById("minutes-label").innerHTML = "Minutes";
    }

    if (hours === 1) {
      document.getElementById("hours-label").innerHTML = "Hour";
    } else {
      document.getElementById("hours-label").innerHTML = "Hours";
    }

    document.getElementById("seconds").innerHTML = secondString;
    document.getElementById("minutes").innerHTML = minuteString;
    document.getElementById("hours").innerHTML = hoursString;

    timeout = setTimeout("stopWatch()", 10);
  }
}

start();
