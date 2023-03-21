let milsec = 0;
let sec = 0;
let min = 0;
let hr = 0;
let timer = false;

function start() {
  if (timer == false) {
    timer = true;
    stopwatch();
  }
}

function stop() {
  timer = false;
}

function reset() {
  timer = false;

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
