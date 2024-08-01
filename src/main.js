import resetcss from './reset.css'
import stylesheet from './styles.css'
import WeatherController from "./weatherController";

import logo from './svg/logo.svg'
import loadingIcon from './svg/icons/loading.svg'

const loadingDiv = document.querySelector('#loading-icon');
const locationHeading = document.querySelector('#location-heading')
const weatherContent = document.querySelector('#weather')

document.querySelector('#logo').innerHTML = logo

loadingDiv.innerHTML = loadingIcon;

let location = localStorage.getItem('location');

if (location === null){
    localStorage.setItem('location', 'Melbourne VIC 3000');
    location = 'Melbourne VIC 3000'
    console.log('No location found in local storage, set to Melbourne');
}

let unit = localStorage.getItem('unit');

if (unit === null){
    localStorage.setItem('unit', 'celsius');
    unit = 'celsius';
    console.log('No unit found in local storage, set to Celsius')
}

const unitSwitcher = document.querySelector('#unit-switch')

if (unit === 'celsius'){
    unitSwitcher.dataset.unit = 'celsius'
}else{
    unitSwitcher.dataset.unit = 'fahrenheit'
}

export { unit, location }

const searchForm = document.querySelector('#search-box');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    locationHeading.classList.add('hidden')
    weatherContent.classList.add('hidden')
    loadingDiv.classList.remove('hidden')
    const searchTerm = document.querySelector('#weather-search').value;
    await WeatherController.getWeather(searchTerm);
    location = searchTerm;
    WeatherController.renderWeather()
    locationHeading.classList.remove('hidden')
    weatherContent.classList.remove('hidden')
    loadingDiv.classList.add('hidden')
})

unitSwitcher.addEventListener('click', async () => {
    if (unitSwitcher.dataset.unit === 'celsius'){
        unit = 'fahrenheit';
        unitSwitcher.dataset.unit = 'fahrenheit'
    }else{
        unit = 'celsius';
        unitSwitcher.dataset.unit = 'celsius'
    }
    await WeatherController.getWeather(location)
    WeatherController.renderWeather()
    localStorage.setItem('unit', unit)
})

await WeatherController.initialise(location);

WeatherController.renderWeather()
locationHeading.classList.remove('hidden')
weatherContent.classList.remove('hidden')
loadingDiv.classList.add('hidden')

