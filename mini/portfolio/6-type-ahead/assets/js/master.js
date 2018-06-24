const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const clearSelections = () => {
  while (resultDiv.firstChild) resultDiv.removeChild(resultDiv.firstChild);
}

const input = document.querySelector('input');

const resultDiv = document.querySelector('ul.results');

const handleSelection = (e) => {
  const elID = e.currentTarget.id;
  if (matches[elID]) {
    input.value = matches[elID].city;
    clearSelections();
  }
}

const selectAnOption = () =>{
  const selections = document.querySelectorAll('ul.results li');
  selections.forEach(selection => selection.addEventListener('click', handleSelection));
}

const displayMatches = (inputValue) => {
  clearSelections();
  const regexSearch =  new RegExp(`${inputValue}`, 'gi');
  let index = -1;
  const html = matches.map(data => {
    let { city, state, population } = data;
    city = city.replace(regexSearch, `<span class='highlight'>${inputValue}</span>`)
    state = state.replace(regexSearch, `<span class='highlight'>${inputValue}</span>`)
    ++index;
    return `
    <li class='data' id=${index}>
      <ul>
        <li><span class='city'>${city}</span><span class='state'>, ${state}</span></li>
        <li class='population'>${numberWithCommas(population)}</li>
      </ul>
    </li>`;
    console.log(index);
  }).join('')

  resultDiv.innerHTML = html;
  selectAnOption();
}

const findMatch = (inputValue, cities) => {
  const regexSearch =  new RegExp(`${inputValue}`, 'gi');
  return cities.filter((name) => name.city.match(regexSearch) || name.state.match(regexSearch)).slice(0,10);
}

const listenToInput = (cities) => {
  input.addEventListener('input', ()=> {
    const inputValue = input.value;
    if (inputValue === '') {
      clearSelections();
    } else {
      matches = findMatch(inputValue, cities);
      displayMatches(inputValue);
    }
  })
}

fetch(endpoint).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => listenToInput(response));

const locationButton = document.querySelector('.geolocation');

locationButton.addEventListener('click', () => {
  locationButton.removeChild(locationButton.firstChild)
  locationButton.classList.add('loading');

  if (navigator.geolocation) {
    /* geolocation is available */
    console.log('geolocation is available');
    navigator.geolocation.getCurrentPosition( (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      fetch(url).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        input.value = response.address.city;
        locationButton.classList.remove('loading');
        locationButton.innerHTML = `<i class="material-icons">location_searching</i>`

      });
    });
  } else {
    /* geolocation IS NOT available */
    console.log('geolocation IS NOT available');
  }

})
