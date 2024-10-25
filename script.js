document.addEventListener('DOMContentLoaded', function() {
  const dataForm = document.getElementById('dataForm');
  const dataList = document.getElementById('dataList');
  const numberSelect = document.getElementById('number');
  const nameInput = document.getElementById('name');

  // Function to save or update data to localStorage
  function saveOrUpdateData(number, name, deposit) {
      let savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];
      const existingEntryIndex = savedEntries.findIndex(entry => entry.number === number && entry.name === name);

      if (existingEntryIndex !== -1) {
          // Update existing entry
          savedEntries[existingEntryIndex].deposit = deposit;
      } else {
          // Add new entry
          const newData = { number, name, deposit };
          savedEntries.push(newData);
      }

      localStorage.setItem('savedEntries', JSON.stringify(savedEntries));
      displaySavedData();
  }

  // Function to display saved data
  function displaySavedData() {
      dataList.innerHTML = '';
      let savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];

      savedEntries.forEach(function(entry, index) {
          const li = document.createElement('li');
          li.innerHTML = `
              <span>Number: ${entry.number}, Name: ${entry.name}, Deposit: <span id="deposit_${index}">${entry.deposit}</span></span>
          `;
          dataList.appendChild(li);
      });
  }

  // Event listener for form submission
  dataForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const number = numberSelect.value;
      const name = nameInput.value;
      const deposit = document.getElementById('deposit').value;

      saveOrUpdateData(number, name, deposit);

      // Clear form fields after submission
      dataForm.reset();
  });

  // Function to get default name based on selected number
  function getDefaultName(number) {
      switch (number) {
          case '1': return 'Nayla';
          case '2': return 'Gofur';
          case '3': return 'Aqilla';
          case '4': return 'Akbar';
          case '5': return 'Rival';
          case '6': return 'Dimas';
          case '7': return 'Surya';
          case '8': return 'Danil';
          case '9': return 'Peking';
          default: return '';
      }
  }

  // Set the initial name based on the default number
  function setInitialName() {
      const initialNumber = numberSelect.value || '1'; // Use '1' as the default if not selected
      nameInput.value = getDefaultName(initialNumber);
  }

  // Event listener for number selection change
  numberSelect.addEventListener('change', function() {
      const selectedNumber = numberSelect.value;
      nameInput.value = getDefaultName(selectedNumber);
  });

  // Initial setup
  setInitialName(); // Set initial name when the page loads
  displaySavedData();
});
