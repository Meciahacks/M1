<script>
import { onMount } from "svelte";

import { authStore, pb } from '../auth.js';	
import {goto} from '$app/navigation'

export let isValid=false
const shuffleText=(label)=>{
	if(!label)
			return
	let itration=0,originalText=label.textContent
	const charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const shuffleText1=(/** @type {HTMLElement | null} */ label)=>{
		let shuffledText = '';

        for (let i = 0; i < originalText.length; i++) {
			if (i < itration) {		
				shuffledText += originalText[i];
			} else {
				shuffledText += charList.charAt(Math.floor(Math.random() * charList.length));
			}
		}
		if(!label)
			return
		label.textContent = shuffledText;
		itration += 1 / 4;
		if (itration <= originalText.length) {
			requestAnimationFrame(()=>shuffleText1(label));
		} else {
			itration = 0;
		}
	}
	shuffleText1(label)
}


const logout=()=>{
    pb.authStore.clear();
    isValid=false
    goto('/login');
}
onMount(()=>{
	shuffleText(document.getElementById('text1'))    
})
</script>

<div class="navbar bg-[#1784cd] text-white uppercase font-bold py-4 px-2">
    <div class="flex-1">
        <a class="btn text-xl" href='/'><p id='text1'>MECIA2.0 VASAD</p></a>
    </div>

    <div class="flex-none gap-2">        
        {#if isValid}
            <a href="/entry" class="btn btn-neutral">QR SCANNER</a>
            <button on:click={logout} class="btn btn-neutral">    
                LOGOUT
            </button>
        {:else}
            <a class="btn btn-neutral" href="/login">LOGIN</a>
        {/if}
    </div>
</div>
