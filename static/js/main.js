function start() {
  if (timer == false) {
    timer = true;
    stopWatch();
  }
}

function stop() {
  timer = false;
  fetch("/post-calories-and-time", {
    method: "POST",
    body: JSON.stringify({
      calories: calories,
      time: [hourString, minuteString, secondString].join(":"),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((data) => window.location.assign(data.url))
    .catch((err) => console.log(err));
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
      evaluate();
      getCalories();
    }
    if (seconds > 59) {
      seconds = 0;
      minutes = minutes + 1;
    }
    if (minutes > 59) {
      minutes = 0;
      hours = hours + 1;
    }

    milliSecondString = milliSeconds;
    secondString = seconds;
    minuteString = minutes;
    hourString = hours;

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
      hourString = "0" + hourString;
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
    document.getElementById("hours").innerHTML = hourString;

    stopWatchTimeoutId = setTimeout(stopWatch, 10);
  } else {
    clearInterval(stopWatchTimeoutId);
  }
}

const countdown = () => {
  count--;
  timerElement.innerHTML = count;
  if (count < 1) {
    clearInterval(countdownTimeoutId);
    timerElement.style.display = "none";
    setTimeout(() => {}, 1000);
    start();
  }
};



const evaluate = () => {
  fetch("/get-selected-asana")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      selected_asana = data.selected_asana;
      fetch("/get-predicted-asana")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          predicted_asana = data.predicted_asana;
          if (predicted_asana !== selected_asana) {
            document
              .getElementById("selected-asana")
              .classList.remove(["success-background"]);
            document
              .getElementById("selected-asana")
              .classList.add(["danger-background"]);
          } else {
            document
              .getElementById("selected-asana")
              .classList.remove(["danger-background"]);
            document
              .getElementById("selected-asana")
              .classList.add(["success-background"]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

function caloriesPerSec(weight, METs) {
  calPerSec = (METs * 3.5 * weight) / (200 * 60);
  return calPerSec;
}

const getCalories = () => {
  fetch("/get-calories")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let selected_asana = data.selected_asana;
      let weight = data.weight;
      let predicted_asana = data.predicted_asana;
      let METs = data.METs;
      document.getElementById("ideal_time").innerHTML = "<span>"+asanaDurationInSec[selected_asana] + "<small>Sec</small></span>";
      document.getElementById("ideal_calories_burnt").innerHTML = Number(
          caloriesPerSec(weight, METs)*asanaDurationInSec[selected_asana]
        ).toFixed(2) ;


      if (predicted_asana == selected_asana) {
        calories = Number(
          (
            parseFloat(document.getElementById("calories").innerHTML) +
            caloriesPerSec(weight, METs)
          ).toFixed(2)
        );
        document.getElementById("calories").innerHTML = calories;
      }
      else {
        audio2.play()
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

asanaDurationInSec = {
  'Downward Facing Dog':30,
  'Goddess':60,
  'Plank':30,
  'Tree': 60,
  'Warrior-2':60
}

let milliSeconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let totalSeconds = 0;
let calories = 0;
let timer = false;
let count = 4;
let selected_asana = "";
let predicted_asana = "";
let timerElement = document.getElementById("countdown");
let milliSecondString = "";
let secondString = "";
let minuteString = "";
let hourString = "";
let audio1 = new Audio('../static/mp3/start.mp3')
let audio2 = new Audio('../static/mp3/wrong_posture.mp3')


audio1.addEventListener("canplaythrough", () => {
  audio1.play().catch(e => {
     window.addEventListener('click', () => {
        audio1.play()
        
     }, { once: true })
  })
});

document.getElementById("main").style.display = "none";

setTimeout(function () {
  document.getElementById("main").style.display = "block";
}, 4000);

const countdownTimeoutId = setInterval(countdown, 1000);
