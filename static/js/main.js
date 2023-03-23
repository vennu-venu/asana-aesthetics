let selected_asana = "";
let predicted_asana = "";

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
          if(predicted_asana !== selected_asana) {
            document.getElementById('selected-asana').classList.add(['danger-background']);
          }
          else {
            document.getElementById('selected-asana').classList.add(['success-background']);
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

setInterval(evaluate, 1000);
