<script>
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import Header from './Header.svelte';
	import { onMount } from "svelte";
	import '../app.css';	
	import { authStore, pb } from '../auth.js';	
	let isValid=false
	let fireflyList1=Array.from({length: 250}, (_, index) => index + 1);
	onMount(()=>{
		authStore.subscribe((store) => {

			if(!store || !store.user) 
				return;//....
    		isValid = store.token?true:false			
			if (!store.isLoggedIn) {
				console.log('****');
				goto('/login')
			}		
		});		
	})
  </script>
<div class="bg-gray-100 text-slate-800 p-2 min-h-screen">
	<Header isValid={isValid}></Header>	
	{#each fireflyList1 as _}  
		<div class="firefly"></div>
	{/each}
	<main class="md:w-11/12 mx-auto min-h-screen p-2">
		{#if !isValid}
			{#if $page?.route?.id?.toString()=='/' || $page.url.toString().includes('login')}
				<slot />
			{:else}
				<p class="text-2xl text-orange-700 text-center w-full">You are Not Authorized,Please Login to Proceed</p>
			{/if}
		{:else}
			<slot/>			
		{/if}
	</main>
	<footer>
		<p class="uppercase text-center">visit <a href="https://mecia.oodo">MECIA2.0 WEBSITE</a></p>
	</footer>
</div>
<style>	
</style>




