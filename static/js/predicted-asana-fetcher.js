const getPredicedAsana = () => {
  fetch("/get-predicted-asana")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let pose = data.predicted_pose;
      console.log(pose);
    })
    .catch((error) => {
      console.log(error);
    });
};

setInterval(getPredicedAsana, 1000);