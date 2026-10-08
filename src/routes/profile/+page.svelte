<script lang='ts'>
import type { Country } from '#lib/getWeather.ts';
import { getNewWeather } from '#lib/weather.remote.ts'
import type { RemoteQuery } from '$app/server';
let locations: [RemoteQuery<Country>, RemoteQuery<Country>] = $state([getNewWeather(0), getNewWeather(1)]);


async function checkAnwser(selected: Country){
    let left = await locations[0]
    let right = await locations[1]
    if (left.temp > right.temp && left == selected){
        locations[1].refresh()
        return
    }
    else if(right.temp > left.temp && right == selected){
        locations[0].refresh()
        return
    }
    locations[0].refresh()
    locations[1].refresh()
}
</script>
<div class='game-container'>
    <div class='options-container'>
        {#each locations as country}   
            {#await country}
                Loading...
            {:then c} 
                <button class='options-button' onclick={() => checkAnwser(c)}>{c.name}</button>
            {/await}
        {/each}
    </div>
</div>

<style lang="scss">
.game-container{
    display: flex;
    width: 100svw;
    height: 100svh;
    align-items: center;
    justify-content: center;

}

.options-button {
    color: #FFA500;
    height: 100%;
}
.options-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    width: 80%;
    height: 80%;
}
</style>