<script>
	import '../lib/images/inputtext.css'

	import {pb} from '../auth'
	import { onMount } from "svelte";
	// @ts-ignore
	let domainList,deptList
	const shuffleText=(label)=>{
	if(!label)
			return
	let itration=0,originalText=label.innerText
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
		label.innerText = shuffledText;
		itration += 1 / 4;
		if (itration <= originalText.length) {
			requestAnimationFrame(()=>shuffleText1(label));
		} else {
			itration = 0;
		}
	}
	shuffleText1(label)
}
// @ts-ignore
function onInputFocus( ev ) {
	ev.target.parentNode.classList.add('input--filled');
}
// @ts-ignore
function onInputBlur( ev ) {
	if( ev.target.value.trim() === '' ) {
		ev.target.parentNode.classList.remove('input--filled')
	}
}
const initField=()=>{
	document.querySelectorAll( 'input.input__field' ).forEach( function( inputEl ) {
		// @ts-ignore
		if( inputEl.value.trim() !== '' ) {						
			// @ts-ignore
			inputEl.parentNode.classList.add('input--filled');
		}
		inputEl.addEventListener( 'focus', onInputFocus );
		inputEl.addEventListener( 'blur', onInputBlur );
	} );
	document.querySelectorAll( 'select.input__field' ).forEach( function( inputEl ) {
		// @ts-ignore
		if( inputEl.value.trim() !== '' ) {						
			// @ts-ignore
			inputEl.parentNode.classList.add('input--filled');
		}
		inputEl.addEventListener( 'focus', onInputFocus );
		inputEl.addEventListener( 'blur', onInputBlur );
	} );
}


const fetchDomainList=async()=>{
	try {		
		domainList=await pb.collection('domain').getFullList()		
	} catch (error) {
		console.log('****',error);
	}
}
const fetchDeptList=async()=>{
	try {		
		deptList=await pb.collection('department').getFullList()		
	} catch (error) {
		console.log('****',error);
	}
}
onMount(()=>{
	fetchDeptList()
	fetchDomainList()
	shuffleText(document.getElementById('text'))
	initField()
})				
</script>
<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<section class="mx-auto w-10/12">	
	<h2 id='text' class="font-bold uppercase justify-center flex text-xl md:text-4xl">MECIA2.0 Registration</h2>	
	<div >		
		<span class="input1 input--juro">
			<input class="input__field input__field--juro" type="text" id="teamname" />
			<label class="input__label input__label--juro" for="teamname">
				<span class="input__label-content input__label-content--juro uppercase font-bold">team name</span>
			</label>
		</span>
		<span class="input1 input--juro">
			<input class="input__field input__field--juro" type="text" id="prob" />
			<label class="input__label input__label--juro" for="prob">
				<span class="input__label-content input__label-content--juro uppercase font-bold">Problem Defination</span>
			</label>
		</span>
		<span class="input1 input--juro">
			<select class="input__field input__field--juro"  id="approch">
				<option value="" disabled selected></option>
				<option value="Hardware">HARDWARE</option>
				<option value="Software">SOFTWARE</option>
				<option value="Hybrid">HYBRID</option>
			</select>
			<label class="input__label input__label--juro" for="approch">
				<span class="input__label-content input__label-content--juro uppercase font-bold">select approch</span>
			</label>
		</span>

		<span class="input1 input--juro">
			<select class="input__field input__field--juro uppercase text-left"  id="domain">
				<option value="" disabled selected></option>
				{#if domainList}
					{#each domainList  as domain}					
						<option value={domain.id} class="uppercase text-left">{domain.name}</option>
					{/each}
				{/if}
			</select>
			<label class="input__label input__label--juro" for="domain">
				<span class="input__label-content input__label-content--juro uppercase font-bold">select domain</span>
			</label>
		</span>
	</div>











	<div class="p-1 border">
		<div class="grid grid-cols-2">
			<span class="input1 input--juro">
				<input class="input__field input__field--juro" type="text" id="name" />
				<label class="input__label input__label--juro" for="name">
					<span class="input__label-content input__label-content--juro uppercase font-bold">Full Name</span>
				</label>
			</span>
			<span class="input1 input--juro">
				<input class="input__field input__field--juro" type="text" id="enroll" />
				<label class="input__label input__label--juro" for="enroll">
					<span class="input__label-content input__label-content--juro uppercase font-bold">Enrollment/College ID</span>
				</label>
			</span>
			</div>
			<div class="grid grid-cols-4">
			<span class="input1 input--juro">
				<input class="input__field input__field--juro" type="text" id="contact" />
				<label class="input__label input__label--juro" for="contact">
					<span class="input__label-content input__label-content--juro uppercase font-bold">Contact Number(WhatsApp)</span>
				</label>
			</span>
			<span class="input1 input--juro">
				<input class="input__field input__field--juro" type="emain" id="email" />
				<label class="input__label input__label--juro" for="email">
					<span class="input__label-content input__label-content--juro uppercase font-bold">Email</span>
				</label>
			</span>			
			<span class="input1 input--juro">
				<select class="input__field input__field--juro uppercase text-left"  id="dept">
					<option value="" disabled selected></option>
					{#if deptList}
						{#each deptList  as dept}					
							<option value={dept.id} class="uppercase text-left">{dept.name}</option>
						{/each}
					{/if}
				</select>
				<label class="input__label input__label--juro" for="dept">
					<span class="input__label-content input__label-content--juro uppercase font-bold">select department</span>
				</label>
			</span>
			<span class="input1 input--juro">
				<select class="input__field input__field--juro uppercase text-left"  id="year">
					<option value="" disabled selected></option>
					<option value="First Year">First Year</option>				
					<option value="Second Year">Second Year</option>
					<option value="Third Year">Third Year</option>
					<option value="Last Year">Last Year</option>
				</select>
				<label class="input__label input__label--juro" for="year">
					<span class="input__label-content input__label-content--juro uppercase font-bold">select year</span>
				</label>
			</span>
		</div>
	</div>
</section>

<style>
</style>


