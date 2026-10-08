import { command, query } from "$app/server";
import data from '../../static/countries.json'

type Coords = {lat: number | null, long: number | null}
type Country = {
    name: string,
    coordinates: number[];
}
async function getWeather({lat, long}: Coords){
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&forecast_days=1`)
    const weather = await res.json()
    return weather["hourly"]["temperature_2m"][0]
}

function getRandomInt(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    // The maximum is inclusive and the minimum is inclusive
    console.log(Math.random())
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export const getNewWeather = command(async () => {
    let randomIndex = getRandomInt(0, data.length - 1)
    console.log(randomIndex)
    let country = data[randomIndex]
    if (Math.abs(country.coordinates[0]) > 180 || Math.abs(country.coordinates[1]) > 90){
        throw Error(country.name + " has coords greater than 90 " + country.coordinates)
    }
    let weather_number = await getWeather({'lat': country.coordinates[1], 'long': country.coordinates[0]})

    return {name: country.name, weather: weather_number}
})