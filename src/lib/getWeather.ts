export type Coords = {lat: number | null, long: number | null}

export type Country = {
    name: string,
    coords: Coords,
    temp: number;
}
