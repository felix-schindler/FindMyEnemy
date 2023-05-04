<script lang="ts">
    import { questions, type Question } from "$lib/data";
    import '$lib/style/main.css';

    let qIndex = 0;
    let question: Question = questions[qIndex];
    let answers: number[] = [];

    function addAnswer(index: number) {
        question = questions[++qIndex];
        answers = [...answers, index];
    }
</script>

<meter min="1" max="35" value={qIndex} />
<p>{question.question}</p>
<ol>
    {#each question.answers as answer, index}
        <li>
            <button type="button" on:click={() => addAnswer(index)}>{answer}</button>
        </li>
    {/each}
</ol>
{#if qIndex > 0}
    <button type="button" on:click={() => {
        const newIndex = --qIndex;
        if (newIndex > -1) {
            question = questions[newIndex];
            answers.pop();
        }
    }}>Back</button>
{/if}

<button class="mainBtn">
    <span>Click Me!</span>
</button>

<style>
    ol {
        list-style: upper-latin;
    }
    

</style>
