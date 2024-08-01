import fetchWeatherData from "./fetchWeatherData";
import weatherIcons from "./weatherIcons";
import { unit } from "./main";
import { isTomorrow } from 'date-fns';
import waterIcon from './svg/icons/water.svg'

export default class WeatherController {

    static async initialise(location){
        await this.getWeather(location)
    }

    static async getWeather(location){
        this.weatherData = await fetchWeatherData(location)
        console.log(this.weatherData)
    }

    static renderWeather(){

        console.log('rendering weather');
        //let unit = 'fahrenheit'

        let renderToday = () => {
            let day = this.weatherData[0];
            if (unit === 'fahrenheit'){
                day.temp = this.celsiusToFahrenheit(day.temp);
                day.tempmax = this.celsiusToFahrenheit(day.tempmax);
                day.tempmin = this.celsiusToFahrenheit(day.tempmin);
                day.feelslike = this.celsiusToFahrenheit(day.feelslike);
            }
            day.temp = Math.round(day.temp);
            day.tempmin = Math.round(day.tempmin);
            day.tempmax = Math.round(day.tempmax);
            day.feelslike = Math.round(day.feelslike);
            //console.log(day)
            const weatherNow = document.querySelector('#weather-now');
            weatherNow.querySelector('.now-temp').textContent = day.temp + '°';
            weatherNow.querySelector('.weather-conditions').textContent = day.conditions;
            weatherNow.querySelector('.low-temp').textContent = day.tempmin + '°';
            weatherNow.querySelector('.high-temp').textContent = day.tempmax + '°';
            weatherNow.querySelector('.feels-like-temp').textContent = day.feelslike + '°';
            const precipprob = Math.round(day.precipprob);
            weatherNow.querySelector('.precipitation-percent').textContent = precipprob + '%';
            const precipitationGauge = weatherNow.querySelector('.precipitation-gauge');
            precipitationGauge.setAttribute('style', `width: ${precipprob}%`);
            const humidity = Math.round(day.humidity);
            weatherNow.querySelector('.humidity-percent').textContent = humidity + '%';
            const humidityGauge = weatherNow.querySelector('.humidity-gauge');
            humidityGauge.setAttribute('style', `width: ${humidity}%`);

            //day.icon = 'partly_cloudy_night'
            weatherNow.querySelector('.now-icon').innerHTML = weatherIcons[day.icon];
        }

        let renderDay = (day, element) => {
            //console.log(waterIcon)
            //console.log('rendering day');
            //console.log(day, element)
            if (isTomorrow(new Date(day.datetimeEpoch))){
                element.querySelector('.day-name').textContent = 'Tomorrow';
            }else{
                element.querySelector('.day-name').textContent = day.day;
            }
            if (unit === 'fahrenheit'){
                day.temp = this.celsiusToFahrenheit(day.temp);
                day.tempmax = this.celsiusToFahrenheit(day.tempmax);
                day.tempmin = this.celsiusToFahrenheit(day.tempmin);
                day.feelslike = this.celsiusToFahrenheit(day.feelslike);
            }
            day.temp = Math.round(day.temp);
            day.tempmin = Math.round(day.tempmin);
            day.tempmax = Math.round(day.tempmax);
            day.feelslike = Math.round(day.feelslike);
            day.precipprob = Math.round(day.precipprob)
            element.querySelector('.weather-main-temp').textContent = day.temp + '°';
            element.querySelector('.weather-main-icon').innerHTML = weatherIcons[day.icon];
            element.querySelector('.weather-conditions').textContent = day.conditions;
            element.querySelector('.low-temp').textContent = day.tempmin + '°';
            element.querySelector('.high-temp').textContent = day.tempmax + '°';
            element.querySelector('.precipitation-percent').textContent = day.precipprob + '%';
            element.querySelector('.rain-icon').innerHTML = waterIcon;
        }

        renderToday();

        let dayElements = [...document.querySelectorAll('.weather-card')];

        //console.log('hello')
        //throw new Error('dsgsdfsd')

        for (let i = 1; i < this.weatherData.length; i++){
            console.log(i)
            renderDay(this.weatherData[i], dayElements[i-1])
        }

    }




    static celsiusToFahrenheit(celsius){
        return (celsius * (9/5) + 32)
    }

    static printUnit(){
        console.log(unit)
    }
}