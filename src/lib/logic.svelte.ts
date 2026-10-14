import type { RemoteQuery } from '$app/server';
import type { Country } from './weatherType';
import { getNewWeather } from '#lib/weather.remote.ts'
import type { Modes } from "#lib/assets/text.ts"
import { MODES } from "#lib/assets/text.ts"
import { getRandomInt } from "#lib/help.ts"

export class Game {
    locations: RemoteQuery<Country>[]
    mode = $state<Modes>(MODES[0])
    constructor(){
        this.locations = [getNewWeather(0), getNewWeather(1)]
        this.newMode()
    }

    async anwser(selected: Country){
        // unwrap locations to Country
        const all = await Promise.all(this.locations.map(async(c) => await c))
        
        
        // check if the users anwser was correct and load new location data
        // respectivaly
        if (this.checkAnwser(selected, all)) {
            var correctIndex = all.findIndex(c => c === selected) 
            this.loadNewLocations(this.locations.toSpliced(correctIndex, 1))
        }
        else this.loadNewLocations(this.locations)
        
        
        this.newMode()
    }

    newMode(){
        this.mode = MODES[getRandomInt(0, MODES.length - 1)]
        console.log(this.mode)
    }

    loadNewLocations(c: RemoteQuery<Country>[]){
        console.log(c)
        c.forEach(c => c.refresh())
    }

    checkAnwser(selected: Country, all: Country[]): boolean{
        switch (this.mode) {
            case "hot":
                return this.checkWeatherHot(selected, all)
            case "cold":
                return this.checkWeatherCold(selected, all)
        }
        return false
    }

    checkWeatherHot(selected: Country, all: Country[]): boolean{
        for (let c of all){
            if (c.temp > selected.temp) return false
        }
        return true
    }

    checkWeatherCold(selected: Country, all: Country[]): boolean{
        for (let c of all) {
            if (c.temp < selected.temp) return false
        }
        return true
    }


}