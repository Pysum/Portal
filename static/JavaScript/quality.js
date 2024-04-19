function fetchAOR() {
  fetch('/get_aor_list')
    .then(response => response.json())
    .then(data => {
      const aorList = document.getElementById('aorList');
      aorList.innerHTML = '';

      data.forEach(aor => {
        const listItem = document.createElement('li');
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'selectedAor';
        radioButton.value = aor;

        listItem.appendChild(radioButton);

        const label = document.createElement('label');
        label.textContent = aor;
        listItem.appendChild(label);

        aorList.appendChild(listItem);
      });

      // Attach event listener to the parent ul element
      aorList.addEventListener('click', displayAORData);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayAORData(event) {
  if (event.target.nodeName === 'INPUT') {
    const selectedAor = event.target.value;
    fetch(`/get_aor_data?selectedAor=${selectedAor}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('teamLeaderLabel').textContent = `${data.managerName}`;

        const agentList = document.getElementById('agentList');
        agentList.innerHTML = '';

        data.agents.forEach(agent => {
          const listItem = document.createElement('li');
          const radioButton = document.createElement('input');
          radioButton.type = 'radio';
          radioButton.name = 'selectedAorData';
          radioButton.value = `${agent.name} (${agent.ntid})`;
          listItem.appendChild(radioButton);
          listItem.appendChild(document.createTextNode(`${agent.name} (${agent.ntid})`));
          agentList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
