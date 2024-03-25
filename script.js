const input = document.getElementById('location-input');
const weatherData = document.getElementById('weather-data');
const form = document.getElementById('location-form');
const loadingSpinner = document.getElementById('loading-spinner');
form.addEventListener('submit', getWeather);

async function getWeather(e) {
  e.preventDefault();

  const cityName = input.value;
  if (!checkInput(cityName)) {
    return; // Stop execution if input is invalid
  }
  input.value = '';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=f2513af01d64e416a4475af322389a6c`;

  try {
      showLoadingSpinner();
    const response = await fetch(URL);
    const data = await response.json();
    const status = response.status;
    renderWeather(data , status);
  } catch (error) {
    console.error('Oops, an error occurred:', error);
        showError('An error occurred while fetching data. Please try again later.');
      } finally {
        hideLoadingSpinner();
      }
}
function checkInput(val) {
  if (val.trim() === '') {
    alert('Please enter a valid city name');
    return false;
  } else if (/\d/.test(val)) {
    alert('Please enter a valid city name without numbers');
    return false;
  } else {
    return true;
  }
}

function renderWeather(data, status) {
  if(status == 404){
    showError('Error: City not found');
  }
 else{
  weatherData.innerHTML = `
  <p class="city">${data.name}</p>
  <p class="weather">${data.weather[0].main} ${Math.abs(data.main.temp)}&deg;C</p>
`;
 }
}
function showError(message) {
  weatherData.innerHTML = `<p class="error">${message}</p>`;
}

function showLoadingSpinner() {
  loadingSpinner.style.display = 'block';
}

function hideLoadingSpinner() {
  loadingSpinner.style.display = 'none';
}
