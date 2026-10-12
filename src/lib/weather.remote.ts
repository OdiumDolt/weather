import { query } from "$app/server";
import data from '../../static/countries.json'
import type { Country } from './getWeather'
import {getRandomInt} from '#lib/logic.ts'
// gets the weather via Country
async function getWeatherFetch(location: Country){
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.coords.lat}&longitude=${location.coords.long}&hourly=temperature_2m&forecast_days=1`)
    const weather = await res.json()
    try{    
        return weather["hourly"]["temperature_2m"][0]
    }
    catch (e) {
        if (e instanceof TypeError) console.log(weather)
    }
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