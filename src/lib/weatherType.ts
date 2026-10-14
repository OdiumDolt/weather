export type Coords = {lat: number | null, long: number | null}

export type Weather = {
    weather_code: number,
    temp: number,
    wind_speed: number,
    uv: number,
    precipitation_probability: number
}

export type Country = {
    name: string,
    coords: Coords,
    temp: number;
}
