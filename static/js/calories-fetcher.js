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
      if (predicted_asana == selected_asana) {
        let calories = Number(
          (
            parseFloat(document.getElementById("calories").innerHTML) +
            caloriesPerSec(weight, METs)
          ).toFixed(2)
        );
        document.getElementById("calories").innerHTML = calories;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

setInterval(getCalories, 1000);
