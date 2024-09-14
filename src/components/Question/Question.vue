<script setup>
import { ref, watch, computed } from 'vue';
import RU from './components/RU.vue';
import RM from './components/RM.vue';
import Input from './components/Input.vue';
import Select from './components/Select.vue';
import Type from './components/Type.vue';

const props = defineProps({
    question: {
        type: Object,
        required: true
    }
});

const question = computed(() => props.question);


</script>

<template>
    <div class="question">
        <div v-if="question.type === 'RU' && !question.specialType">
            <RU :question="question"/>
        </div>
        <div v-else-if="question.specialType === 'Select'">
            <Select :question="question"/>
        </div>
        <div v-else-if="question.type === 'RM'">
            <RM :question="question"/>
        </div>
        <div v-else-if="question.type === 'Text'">
            <Input :question="question"/>
        </div>
        <div v-else-if="question.type === 'Type'">
            <Type :question="question"/>
        </div>
    </div>
</template>

<style scoped>

</style>