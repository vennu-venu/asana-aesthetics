const getSelectedAsana = () => {
  fetch("/get-selected-asana")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let asana = data.selected_asana;
      document.getElementById('selected-asana').innerHTML = asana + ' Asana';
    })
    .catch((error) => {
      console.log(error);
    });
};

getSelectedAsana();