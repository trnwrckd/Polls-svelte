<script>
    export let poll;
    import PollStore from '../stores/PollStore.js';
    import Card from '../shared/Card.svelte';
    import Button from '../shared/Button.svelte';
    import {tweened} from 'svelte/motion';

    $: totalVotes = poll.votesA+ poll.votesB;
    $: percentA = Math.floor(100/ totalVotes*poll.votesA) || 0;
    $: percentB = Math.floor(100/ totalVotes*poll.votesB) || 0;
    //tweened percentages
    const tweenedA = tweened(0);
    const tweenedB = tweened(0);
    $: tweenedA.set(percentA);
    $: tweenedB.set(percentB);


    const handleVote=(option,id)=>{
		PollStore.update(currentPolls=>{
            let copiedPolls = [...currentPolls];
	    	let upvotedPoll = copiedPolls.find((poll)=>poll.id == id);
            if(option ==='a'){
                upvotedPoll.votesA++;
            }
            if(option ==='b'){
                upvotedPoll.votesB++;
            }
            return copiedPolls;
        }); 
};
const handleDelete = (id)=>{
    PollStore.update(currentPolls =>{
        return currentPolls.filter(poll=>poll.id!=id);
    });
};

</script>

<Card>
    <div class="poll">
        <h3> {poll.question}</h3>
        <p> Total votes: {totalVotes} </p>
        <div class="answer" on:click={()=>handleVote('a',poll.id)}>
            <div class="percent percent-a" style="width:{$tweenedA}%">
                <span>{poll.ansA} ({poll.votesA}) </span>
            </div>
        </div>
        <div class="answer" on:click={()=>handleVote('b',poll.id)}>
            <div class="percent percent-b" style="width:{$tweenedB}%">
                <span>{poll.ansB} ({poll.votesB}) </span>
            </div>
        </div>
            <div class="delete">
                <Button inverse={true} flat={true} on:click={()=>{handleDelete(poll.id)}}> Delete Poll</Button>
            </div>
    </div>
</Card>

<style>
    h3{
        margin: 0 auto;
        margin-top:1rem;
        color:#555;
        text-align: center;
    }
    p{
        text-align: center;
        margin-top:6px;
        font-size: 14px;
        color:#aaa;
        margin-bottom: 30px;
    }
    .answer{
        background: #fafafa;
        cursor:pointer;
        margin: 10px auto;
        position: relative;
    }
    .answer:hover{
        opacity:0.6;
    }
    span{
        display: inline-block;
        padding: 10px 20px;
    }
    .percent{
        /* height: 100%; */
        /* position:absolute; */
        box-sizing: border-box;
        font-size: 12px;
    }
    .percent-a{
        border-left: 4px solid rgba(217,27,66);
        background: rgba(217,27,66,0.2);
    }
    .percent-b{
        border-left: 4px solid rgba(5, 39, 104);
        background: rgba(5, 39, 104, 0.4);
    } 
    .delete{
        text-align: center;
    }

    
</style>