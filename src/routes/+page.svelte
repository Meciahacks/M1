<script>
	import '../lib/images/inputtext.css'

	import {pb} from '../auth'
	import { onMount } from "svelte";
	let domainList,deptList
	let numberOFMember=2+1,opendlg1=true
	let loading=false
	let mesg,error_mesg
	let teamdetail={
		team_name:'',
		domain:'',
		nb:'',
		approach:'',

		problem_statement:''
	},	
	teamMemberList=[]
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
		loading=true
		domainList=await pb.collection('domain').getFullList()		
	} catch (error) {
		console.log('****',error);
		mesg=''
		error_mesg=error
	}
	finally{
		loading=false
	}
}
const fetchDeptList=async()=>{
	try {		
		loading=true
		deptList=await pb.collection('department').getFullList()		
	} catch (error) {
		console.log('****',error);
		mesg=''
		error_mesg=error
	}

	finally{
		loading=false
	}
}
onMount(()=>{
	fetchDeptList()
	fetchDomainList()
	shuffleText(document.getElementById('text'))
	initField()
})		
$: if(numberOFMember){
	teamMemberList = Array.from({ 
		length: numberOFMember}, 
		
		(_,i) => ({				
				name: "",
				contact: "",
				email: "",
				team: "",
				enrollment: "",
				is_leader: i==0,
				dept: "",
				year: ""
	}));
}
const onsubmit=async()=>{	
	try{
		loading=true
		const record = await pb.collection('team_details').create(teamdetail);
		for (let indx = 0; indx < teamMemberList.length; indx++) {
			const ob = teamMemberList[indx];
			// 
			// for await (const dt of teamMemberList) {
			ob.team=record.id
			await pb.collection('team_member').create(ob)		
  			// const data = {
			// 	"username": teamdetail.team_name,
			// 	"email": teamMemberList[0].email,
			// 	"emailVisibility": true,
			// 	"password": teamMemberList[0].contact,
			// 	"passwordConfirm": teamMemberList[0].contact,
			// 	"name": teamdetail.team_name
			// };
			// const record1 = await pb.collection('users').create(data)

		}
		error_mesg=''
		mesg='Form Submitted Successfully'
		if(window)
			window.location.href='http://meciahacks2.odoo.com'
	}
	catch(error){
		console.log('****',error)
		error_mesg=error
		mesg=''
		loading=false
	}
}











const testEntry=async()=>{
	try{
		loading=true
		const record1= await pb.collection('team_details').getFirstListItem(`team_name="${teamdetail.team_name}"`)
		if(record1){
			mesg=''
			error_mesg='TeamName Already Registered'
		}

	}catch(ee){		
		console.log('****',ee);		
	}
	finally{
		loading=false
	}
}
</script>
<svelte:head>	
<title>MECIA2.0 Registration</title>
	<meta name="description" content="mecia registration" />
</svelte:head>
<div class="bg-[url('/android.jpg')] md:bg-[url('/ultrar.jpg')] w-full bg-cover bg-center bg-fixed bg-no-repeat">
<section class="mx-auto w-10/12">	
	<h2 id='text' class="text-white font-bold uppercase font-[synthan] justify-center flex text-xl md:text-4xl p-2">MECIA2.0 Registration</h2>	
	{#if error_mesg}
		<p class="bg-orange-800 text-white text-2xl p-4 font-bold">{error_mesg}</p>
	{/if}
	{#if mesg}
		<p class="bg-green-500 text-white text-2xl p-4 font-bold">{mesg}</p>
	{/if}
	<form on:submit={onsubmit}>
	<div >		
		<span class="input1 input--minoru">

			<input on:blur={()=>{testEntry();}} bind:value={teamdetail.team_name} class="input__field input__field--minoru rounded-xl" type="text" id="teamname" required/>
			<label class="input__label input__label--minoru" for="teamname">
				<span class="input__label-content input__label-content--minoru uppercase font-bold">team name</span>
			</label>
		</span>
		<span class="input1 input--minoru">
			<input bind:value={teamdetail.problem_statement} class="input__field input__field--minoru rounded-xl" type="text" id="prob" required/>
			<label class="input__label input__label--minoru" for="prob">
				<span class="input__label-content input__label-content--minoru uppercase font-bold">Problem Defination</span>
			</label>
		</span>
		<span class="input1 input--minoru">
			<select bind:value={teamdetail.approach} class="input__field input__field--minoru rounded-xl"  id="approch" required>
				<option value="" disabled selected></option>
				<option value="Software">SOFTWARE</option>
				<option value="Hardware">HARDWARE</option>
				<option value="Hybrid">HYBRID</option>
			</select>
			<label class="input__label input__label--minoru" for="approch">
				<span class="input__label-content input__label-content--minoru uppercase font-bold">select approch</span>
			</label>
		</span>
		<span class="input1 input--minoru">			
			<select bind:value={teamdetail.domain} class="input__field input__field--minoru rounded-xl uppercase text-left"  id="domain" required>
				<option class="text-[#142d46]" value="" disabled selected></option>
				{#if domainList}
					{#each domainList  as domain}					
						<option value={domain.id} class="uppercase text-left text-[#142d46]">{domain.name}</option>
					{/each}
				{/if}
			</select>
			<label class="input__label input__label--minoru" for="domain">
				<span class="input__label-content input__label-content--minoru uppercase font-bold">select domain</span>
			</label>
		</span>
	</div>
	<div>
		<span class="input1 input--minoru">
			<select bind:value={numberOFMember} class="input__field input__field--minoru rounded-xl"  id="nb" required>
				<option class="text-[#142d46]" value="" disabled selected></option>
				<option class="text-[#142d46]" value="3">3</option>
				<option class="text-[#142d46]" value="4">4</option>
			</select>
			<label class="input__label input__label--minoru" for="nb">
				<span class="input__label-content input__label-content--minoru uppercase font-bold">Number of Member</span>
			</label>
		</span>
	</div>
	{#each teamMemberList as team_member,indx}
		<div class="p-2">
		<h4 class="bg-[#01c38d] text-[#142d46] uppercase font-bold rounded p-4 font-bold">{#if team_member.is_leader}Leader Detail{:else}Member-{indx} Detail{/if}</h4>
		<div class="grid grid-cols-1 md:grid-cols-3">
			<span class="input1 input--minoru">
				<input bind:value={team_member.name} class="input__field input__field--minoru rounded-xl" type="text" id="name" required/>
				<label class="input__label input__label--minoru" for="name">
					<span class="input__label-content input__label-content--minoru uppercase font-bold">			
						{#if team_member.is_leader}Leader Name{:else}Member Name{/if}
					</span>
				</label>
			</span>
			<span class="input1 input--minoru">
				<input bind:value={team_member.enrollment} class="input__field input__field--minoru rounded-xl" type="text" id="enroll" required/>
				<label class="input__label input__label--minoru" for="enroll">
					<span class="input__label-content input__label-content--minoru uppercase font-bold">Enrollment/College ID</span>
				</label>
			</span>
			<span class="input1 input--minoru">
				<select bind:value={team_member.tshirt_size} class="input__field input__field--minoru rounded-xl" type="text" id="tshirt_size" required>
				<option value="" disabled selected></option>	
					<option class="text-[#142d46]" value="S">S</option>
					<option class="text-[#142d46]" value="M">M</option>
					<option class="text-[#142d46]" value="L">L</option>
					<option class="text-[#142d46]" value="XL">XL</option>
					<option class="text-[#142d46]" value="XXL">XXL</option>
					</select>
				<label class="input__label input__label--minoru" for="tshirt_size">
					<span class="input__label-content input__label-content--minoru uppercase font-bold">T-shirt size</span>
				</label>
			</span>

		</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
			<span class="input1 input--minoru">
				<input bind:value={team_member.contact} class="input__field input__field--minoru rounded-xl" type="text" id="contact" required/>
				<label class="input__label input__label--minoru" for="contact">
					<span class="input__label-content input__label-content--minoru uppercase font-bold">Contact Number(WhatsApp)</span>
				</label>
			</span>
			<span class="input1 input--minoru">
				<input bind:value={team_member.email} class="input__field input__field--minoru rounded-xl" type="email" id="email" required/>
				<label class="input__label input__label--minoru" for="email">
					<span class="input__label-content input__label-content--minoru uppercase font-bold">Email</span>
				</label>
			</span>			
			<span class="input1 input--minoru">
				<select bind:value={team_member.dept} class="input__field input__field--minoru rounded-xl uppercase text-left"  id="dept" required>
					<option value="" disabled selected></option>
					{#if deptList}
						{#each deptList  as dept}					
							<option  value={dept.id} class="uppercase text-left text-[#142d46]">{dept.name}</option>
						{/each}
					{/if}
				</select>
				<label class="input__label input__label--minoru" for="dept">
					<span class="input__label-content input__label-content--minoru uppercase font-bold">select department</span>
				</label>
			</span>
			<span class="input1 input--minoru">
				<select bind:value={team_member.year} class="input__field input__field--minoru rounded-xl uppercase text-left"  id="year" required>
					<option value="" disabled selected></option>
					<option class="text-[#142d46]" value="First Year">First Year</option>				
					<option class="text-[#142d46]" value="Second Year">Second Year</option>
					<option class="text-[#142d46]" value="Third Year">Third Year</option>
					<option class="text-[#142d46]" value="Last Year">Last Year</option>
				</select>
				<label class="input__label input__label--minoru" for="year">
					<span class="input__label-content input__label-content--minoru uppercase font-bold">select year</span>
				</label>
			</span>
		</div>
		</div>		
	{/each}
	<!-- <div class="flex justify-end p-2 w-full">
		<button class="uppercase text-slot-800 btn md:w-48 w-full bg-[#01c38d] hover:bg-[#12d4bd] hover:shadow hover:shadow-white font-bold" type="submit">submit</button>
	</div> -->
	</form>
</section>

<dialog id="dlg1" class={loading?'modal modal-top modal-open min-h-screen flex items-center justify-center':'min-h-screen modal modal-top'}>
	<!-- <span class="bg-white w-24 loading loading-bars loading-lg"></span> 
	 -->
	<div>
		<img src="/tt.gif" class="w-72" alt="">
	</div>
</dialog>
<dialog id="dlg1" class={opendlg1?'modal modal-bottom sm:modal-middle modal-open':'modal modal-bottom sm:modal-middle'}>
	<div class="modal-box">
	  <h4 class="bg-[#01c38d] text-white text-lg font-bold w-full p-2">Instructions!</h4>
	  <p class="py-4 ">
		<br/>
		<span class="text-xl text-orange-700">
NOTE: This Form is no longer accepting responses
</span>
	  </p>
	 <div class="modal-action">
		<button on:click={()=>{opendlg1=false;}} class="btn" >Close</button>
	  </div> 
	</div>
</dialog>
</div>
<style>
</style>


