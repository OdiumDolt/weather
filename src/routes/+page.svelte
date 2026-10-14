<script lang='ts'>
import type { Country } from '#lib/weatherType.ts';
import { getNewWeather } from '#lib/weather.remote.ts'
import type { RemoteQuery } from '$app/server';
import '#lib/SelectButton.svelte';
import SelectButton from '#lib/SelectButton.svelte';
import {Game} from "#lib/logic.svelte.ts"
import { modeText } from '#lib/assets/text.ts';

const game = new Game()
</script>

<div class='game-container'>
    <div class='question-text geo-regular'>{modeText[game.mode]}</div>
    <div class='options-container'>
        {#each game.locations as country}
            {#await country}
                Loading...
            {:then c} 
                <SelectButton location={c} game={game}></SelectButton>
            {/await}
        {/each}
    </div>
</div>


<style lang="scss">
@use '../styles/fonts.scss';

.game-container{
    display: flex;
    flex-direction: column;
    gap: 5%;
    width: 100svw;
    height: 100svh;
    max-height: 100vmin;
    align-items: center;
    justify-content: center;
    background-color: rgb(37, 37, 37);
}

.options-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20%;
    width: 80%;
    height: 80%;
    max-width: 100vmin;
}

.question-text{
    color: white;
    font-size: 30px;
}
</style>