<script>
	import PollStore from './stores/PollStore.js';
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import CreatePollForm from './components/createPollForm.svelte';
	import PollList from './components/PollList.svelte';
	import Tabs from './shared/Tabs.svelte';
	

	//tabs
	let items = ['Current Polls', 'Add New Poll'];
	let activeItem='Current Polls';

	const tabChangeFunc = (e) => {
		activeItem = e.detail;
	};

	const addPollHandler=(e)=>{
		activeItem='Current Polls';

	};
	const handleVotes=(e)=>"";
</script>

<main>
	<Header />

	<Tabs {items} {activeItem} on:tabChange={tabChangeFunc}/>
	{#if activeItem ==="Current Polls"}
		<PollList on:vote={handleVotes}/>
	{:else if activeItem ==="Add New Poll"}
		<CreatePollForm on:add={addPollHandler}/>
	{/if}
	<Footer />
</main>

<style>
	main{
		max-width:960px;
		margin: 40px auto; 
	}
</style>