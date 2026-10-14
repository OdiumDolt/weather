<script lang="ts">
import type { Country } from '#lib/weatherType.ts'
import type { Game } from '#lib/logic.svelte.ts';

let { location, game }: {location: Country, game: Game} = $props()
</script>


<button class="location-button" onclick={() => {
    game.anwser(location)
    }}>
    <div class='title-bar'>
        <div class='country-title geo-regular'>{location.name}</div>
        <div></div>
    </div>
</button>

<style lang="scss"> 
@use '../styles/fonts.scss';

.location-button{
    all: unset;
    cursor: pointer; 
    background-color: #393939;
    text-align: center;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 0 0px white;
}
.location-button:hover{
    box-shadow: 0 0 0 3px white;
}

.title-bar {
    display: flex;
    justify-content: space-between;
    // height: 20%;
    background-color: darkslategrey;
}

.country-title{
    font-size: 1.5em;
    margin: 10px;
    max-width: 70%;
    color: white;
}
</style>