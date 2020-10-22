<script>
    import PollStore from '../stores/PollStore.js';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import Buttons from "../shared/Button.svelte";

    let newpoll = {question : "", ansA: "" ,ansB: ""};
    let errors = {question : "", ansA: "" ,ansB: ""};
    let valid =false;

    const postForm = ()=>{
        valid = true;
        if(newpoll.question.trim().length < 5){
            valid= false;
            errors.question="Question must be longer than 5 characters"
        }else{errors.question="";}
        if(newpoll.ansA.trim().length < 1){
            valid= false;
            errors.ansA="Can't be empty";
        }else{errors.ansA="";}
        if(newpoll.ansB.trim().length < 1){
            valid= false;
            errors.ansB="Can't be empty";
        }else{errors.ansB="";}
        if(valid){
            let poll = {...newpoll,votesA:0,votesB:0,id: Math.random()};
            PollStore.update(currentPolls=>{
                return [poll, ...currentPolls];
            });

            dispatch('add');
            
        }
    };
</script>
<div class="container text-center">
    <form on:submit|preventDefault={postForm}>
        <div class="form-group">
            <label for="question"> Poll Question: </label>
            <input class="form-control-sm" type="text" id="question" bind:value={newpoll.question}>
            <div class= "errors">{errors.question}</div>
        </div>
        <div class="form-group">
            <label for="ans-a"> Answer A: </label>
            <input class="form-control-sm" type="text" id="ans-a" bind:value={newpoll.ansA}>
            <div class= "errors">{errors.ansA}</div>
        </div>
        <div class="form-group">
            <label for="ans-b"> Answer B: </label>
            <input class="form-control-sm" type="text" id="ans-b" bind:value={newpoll.ansB}>
            <div class= "errors">{errors.ansB}</div>
        </div>
        <Buttons type="secondary" flat= {true}> Add Poll </Buttons>
    </form>
</div>
<style>
    .errors{
        font-weight: bold;
        font-size: 12px;
        color: #d92b42;
    }
</style> 