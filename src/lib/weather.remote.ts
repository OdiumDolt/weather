import { query } from "$app/server";
import data from '../../static/countries.json'
import type { Country } from './getWeather'

// gets the weather via Country
async function getWeatherFetch(location: Country){
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.coords.lat}&longitude=${location.coords.long}&hourly=temperature_2m&forecast_days=1`)
    const weather = await res.json()
    return weather["hourly"]["temperature_2m"][0]
}

// inclusive for min and max
function getRandomInt(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    console.log(Math.random())
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// entry function - remote function - slot for unique requests
export const getNewWeather = query('unchecked', async (slot: number): Promise<Country> => {
    let randomIndex = getRandomInt(0, data.length - 1)
    let country = data[randomIndex]

    if (Math.abs(country.coordinates[0]) > 180 || Math.abs(country.coordinates[1]) > 90){
        throw Error(country.name + " has coords greater than 90 or 180 " + country.coordinates)
    }

    let location: Country = {
        name: country.name, 
        coords: {lat: country.coordinates[1], long: country.coordinates[0]}, 
        temp: 0,
    }

    location.temp = await getWeatherFetch(location)

    return location
})