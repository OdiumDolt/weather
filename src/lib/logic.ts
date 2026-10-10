import type { RemoteQuery } from '$app/server';
import type { Country } from './getWeather';
import { getNewWeather } from '#lib/weather.remote.ts'

export function getRandomInt(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    console.log(Math.random())
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export class Game {
    locations: [RemoteQuery<Country>, RemoteQuery<Country>]
    mode: string[] = ['hot', 'cold', 'humid']
    constructor(){
        this.locations = [getNewWeather(0), getNewWeather(1)]
    }

    getNewMode(): string{
        return this.mode[getRandomInt(0, this.mode.length - 1)]
    }

    

    // change to return next state and have function update animations and such
    async checkAnwser(selected: Country){
        // if (this.location[0] == null || this.location[1] == null) return
        
        let left = await this.locations[0]
        let right = await this.locations[1]
        
        if (left.temp > right.temp && left == selected){
            this.locations[1].refresh()
            return
        }
        else if(right.temp > left.temp && right == selected){
            this.locations[0].refresh()
            return
        }
        this.locations[0].refresh()
        this.locations[1].refresh()
    }
}