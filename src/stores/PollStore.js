import {writable} from 'svelte/store';
const PollStore = writable([
    {
        id:1,
        question:"Coffee or Suicide?",
        ansA: "Coffee",
        ansB: "Suicide",
        votesA: 9,
        votesB: 16,
    },
    {
        id:2,
        question:"Day or night?",
        ansA: "Day",
        ansB: "Night",
        votesA: 3,
        votesB: 7,
    },
    {
        id:3,
        question:"Was Nietszche mad?",
        ansA: "Yes",
        ansB: "Yes and So am I",
        votesA: 7,
        votesB: 2,
    },
]);
export default PollStore;