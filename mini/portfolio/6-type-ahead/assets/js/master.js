const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const input = document.querySelector('input');

const resultDiv = document.querySelector('ul.results');

const handleSelection = (e) => {
  input.value = e.currentTarget.innerHTML;
  while (resultDiv.firstChild) resultDiv.removeChild(resultDiv.firstChild);
}

const selectAnOption = () =>{
  const selections = document.querySelectorAll('ul.results li');
  selections.forEach(selection => selection.addEventListener('click', handleSelection))
  ;
}

const showResult = (result) => {
  // resultDiv.innerHTML = ''; the line below is faster according to my research
  while (resultDiv.firstChild) resultDiv.removeChild(resultDiv.firstChild);
  result.forEach(data => resultDiv.innerHTML += `<li>${data.city}</li>`);
  selectAnOption();
}

const listenToInput = (cities) => {
  input.addEventListener('input', ()=> {
    const inputValue = input.value;
    const regexSearch =  new RegExp(`^${inputValue}`, 'i');
    const result = cities.filter ((name) => name.city.match(regexSearch));
    showResult(result.slice(0,10));
  })
}

fetch(endpoint).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => listenToInput(response));
