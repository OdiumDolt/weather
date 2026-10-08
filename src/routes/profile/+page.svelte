<script lang='ts'>
import { getNewWeather } from '#lib/weather.remote.ts'
let weather: null | number = $state(null);
let name: null | string = $state(null)
let loading = $state(false);
let guess = $state(false)
</script>

<div>{name}</div>
{#if !guess}
<div class:guess>{weather}</div>
{/if}

{#if guess}
<button onclick={()=> {
    guess = false
}}>Show</button>
{/if}

{#if !guess}
<button onclick={async () => {
    loading = true
    let res = await getNewWeather()
    name = res.name
    weather = res.weather
    loading = false
    guess = true
}} >Update</button>
{/if}

<style>
</style>