import {format as formatDate} from "date-fns/format";
import sampleData from "./sample.json";

const APIkey = 'QL3R75L9V9YT7HQNE67K6AM79';
const useSample = false;

export default async function fetchWeatherData(location) {

    function stripDay(day, currentDay) {
        let { datetimeEpoch, tempmax, tempmin, temp, feelslike, humidity, precipprob, conditions, description } = day;
        if (currentDay){
            temp = currentDay.temp;
            feelslike = currentDay.feelslike;
            humidity = currentDay.humidity;
            precipprob = currentDay.precipprob;
            conditions = currentDay.conditions;
        }
        let object = {  datetimeEpoch, tempmax, tempmin, temp, feelslike, humidity, precipprob, conditions, description };
        object.day = formatDate(new Date(day.datetimeEpoch * 1000), 'EEEE');
        if (currentDay){
            //object.hours = day.hours;
            //object.description = currentDay.description
            if (currentDay.temp > day.tempmax){
                object.tempmax = currentDay.temp;
            }
        }

        return object;
    }

    if (useSample === true) {
        console.log('Returning sample data')

        return stripDay(sampleData.days[0], sampleData.currentConditions)
    }
    let response;
    try {
        response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${APIkey}&contentType=json`)
    } catch (error) {
        return Promise.reject(error)
    }
    const data = await response.json();

    const week = []

    week.push(stripDay(data.days[0], data.currentConditions));
    for (let i = 1; i <= 7; i++){
        week.push(stripDay(data.days[i]))
    }

    return week;
}
