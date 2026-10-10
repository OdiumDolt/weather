<script lang="ts">
import type { Country } from '#lib/getWeather.ts'
import type { Game } from '#lib/logic.ts';

let { location, game }: {location: Country, game: Game} = $props()
</script>


<button class="location-button" onclick={() => {game.checkAnwser(location)}}>
    {#if location == null}
        Loading
    {:else}
        {location.name}
    {/if}
</button>

<style lang="scss">
.location-button{
    all: unset;
    cursor: pointer; 
    background-color: grey;
    text-align: center;
}
.location-button:hover{
    border: 2px solid white
}
</style>