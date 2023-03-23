<<<<<<< HEAD
let milsec = 0;
let sec = 0;
let min = 0;
let hr = 0;
=======
let milliSeconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let totalSeconds = 0;
>>>>>>> e1c81ee5e8985621da2d6a729ff5711ae9314666
let timer = false;

function start() {
  if (timer == false) {
    timer = true;
<<<<<<< HEAD
    stopwatch();
=======
    stopWatch();
>>>>>>> e1c81ee5e8985621da2d6a729ff5711ae9314666
  }
}

function stop() {
  timer = false;
}

function reset() {
  timer = false;

<<<<<<< HEAD
  milsec = 0;
  sec = 0;
  min = 0;
  hr = 0;

  document.getElementById("milsec").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("hr").innerHTML = "00";
}

function stopwatch() {
  if (timer == true) {
    milsec = milsec + 1;

    if (milsec > 99) {
      milsec = 0;
      sec = sec + 1;
    }
    if (sec > 59) {
      sec = 0;
      min = min + 1;
    }
    if (min > 59) {
      min = 0;
      hr = hr + 1;
    }

    let milsecstring = milsec;
    let secstring = sec;
    let minstring = min;
    let hrstring = hr;
    if (milsec < 10) {
      milsecstring = "0" + milsecstring;
    }
    if (sec < 10) {
      secstring = "0" + secstring;
    }
    if (min < 10) {
      minstring = "0" + minstring;
    }
    if (hr < 10) {
      hrstring = "0" + hrstring;
    }

    document.getElementById("milsec").innerHTML = milsecstring;
    document.getElementById("sec").innerHTML = secstring;
    document.getElementById("min").innerHTML = minstring;
    document.getElementById("hr").innerHTML = hrstring;

    timeout = setTimeout("stopwatch()", 10);
  }
}
=======
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

    document.getElementById("seconds").innerHTML = secondString;
    document.getElementById("minutes").innerHTML = minuteString;
    document.getElementById("hours").innerHTML = hoursString;

    timeout = setTimeout("stopWatch()", 10);
  }
}

start()
>>>>>>> e1c81ee5e8985621da2d6a729ff5711ae9314666
