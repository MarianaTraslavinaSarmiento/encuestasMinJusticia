<script setup>
import Question from '@/components/Question/Question.vue';

const props = defineProps({
    chapter: {
        type: Object,
        questions:{
            type: Array,
            required: true
        },
        required: true
    }
});

</script>

<template>
    <div class="chapter">
        <label>{{ chapter.title }}</label>
        <div class="chapter__questions">
            <Question v-for="question in chapter.questions" :key="question.id" :question="question"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .chapter {
        display: flex;
        flex-direction: column;
        gap: 20px;
        & label{
            background-color: var(--color-darkBlue);
            color: var(--color-white);
            padding: 10px;
            font-weight: bold;
            font-size: 1.2em;
            width: 100%;
        }
    }
</style>