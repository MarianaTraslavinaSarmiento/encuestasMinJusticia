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

<style scoped>

</style>