<script>
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import '../app.css';	
	import { authStore, pb } from '../auth.js';	
	let user
	let fireflyList1=Array.from({length: 250}, (_, index) => index + 1);
	authStore.subscribe((store) => {
		if(!store || !store.user) 
			return;

    	user = store.user;
			if (!store.isLoggedIn) {
				console.log('****');
				goto('/login')
			}
		
	});
  	function logout() {
	  pb.authStore.clear();
	  goto('/login');
	}
  </script>


<div class="bg-transparent text-slate-800 p-2 min-h-screen">
	<header>	
	  <nav>
		  <a href="/">Home</a>
		  {#if $authStore.isLoggedIn}
			  <a href="/entry">Dashboard</a>
			  <a href="/logout" on:click={logout}>Logout</a>
		  {:else}
			  <a href="/login">Login</a>
		  {/if}

		</nav>
  </header>
  {#each fireflyList1 as _}  
  	<div class="firefly"></div>
  {/each}
	<main class="md:w-11/12 mx-auto min-h-screen p-2">
		{#if !pb.authStore.token}
			{#if $page.url.toString().includes('login')}
				<slot />
			{:else}
				<p>Please Login</p>
			{/if}
		{:else}
			<slot/>			
		{/if}
	</main>
	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>
<style>	
</style>




