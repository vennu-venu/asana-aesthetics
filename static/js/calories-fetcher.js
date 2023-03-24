
var asanasDetails = {
    'downward-facing-dog':2.5,
    'goddess':2.5,
    'plank':4.0,
    'tree': 2.5,
    'warrior-2':4.0
}

function caloriesPerSec(asana, weight) {
    calPerSec = (asanasDetails[asana] * 3.5 * weight)/(200*60) 
    return calPerSec
  }


const getCalories = () => {
    fetch("/get-calories")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let s_asana = data.selected_asana;
        let weight = data.weight;
        let p_asana = data.predicted_asana;
        if(s_asana == p_asana){
            let calories = Number((parseFloat( document.getElementById('calories').innerHTML )+caloriesPerSec(p_asana,weight)).toFixed(2));
            console.log("calories : ",calories);
            document.getElementById('calories').innerHTML = calories;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  setInterval(getCalories, 1000);