const getPose = () => {
  fetch("/get-pose")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let pose = data.pose;
      document.getElementById("pose").innerHTML = pose;
    })
    .catch((error) => {
      console.log(error);
    });
};

setInterval(getPose, 1000);