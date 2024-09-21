<script setup>
import { ref, watch, computed } from 'vue';
import { useQuestionStore } from '@/stores/questionStore.js';

const props = defineProps({
    question: {
        type: Object,
        required: true
    }
});

const questionStore = useQuestionStore();

const selectedOptions = computed({
    get: () => {
        const answer = questionStore.getAnswer(props.question.id) || {};
        return Object.keys(answer).filter(key => answer[key] === true);
    },
    set: (value) => {
        updateSelection(value);
    }
});

const otherInputs = computed(() => {
    const answer = questionStore.getAnswer(props.question.id) || {};
    return Object.keys(answer).reduce((acc, key) => {
        if (typeof answer[key] === 'string') {
            acc[key] = answer[key];
        }
        return acc;
    }, {});
});

const isOptionSelected = (optionId) => {
    return selectedOptions.value.includes(optionId);
};

const updateSelection = (selectedOptionIds) => {
    const result = selectedOptionIds.reduce((acc, optionId) => {
        const option = findOption(optionId);
        if (option && option.isOther) {
            acc[optionId] = otherInputs.value[optionId] || '';
        } else {
            acc[optionId] = true;
        }
        return acc;
    }, {});
    questionStore.updateAnswer(props.question.id, result);
};

const updateOtherInput = (optionId, value) => {
    const currentAnswer = questionStore.getAnswer(props.question.id) || {};
    questionStore.updateAnswer(props.question.id, {
        ...currentAnswer,
        [optionId]: value
    });
};

const findOption = (optionId) => {
    for (const group of props.question.groups) {
        const option = group.options.find(opt => opt.id === optionId);
        if (option) return option;
    }
    return null;
};

watch(() => props.question, () => {
    questionStore.updateAnswer(props.question.id, {});
}, { deep: true });
</script>

<template>
    <div class="ru-question">
        <h3>{{ question.label }}</h3>
        <div v-for="(group, groupIndex) in question.groups" :key="groupIndex" class="option-group">
            <h4>{{ group.name }}</h4>
            <div v-for="option in group.options" :key="option.id" class="option">
                <input type="checkbox" :id="option.id" :value="option.id" v-model="selectedOptions">
                <label :for="option.id">{{ option.label }}</label>
                <input v-if="option.isOther && isOptionSelected(option.id)" 
                       type="text" 
                       :value="otherInputs[option.id]"
                       @input="event => updateOtherInput(option.id, event.target.value)"
                       :placeholder="option.placeholder || 'Por favor especifique'" 
                       class="other-input">
            </div>
        </div>
    </div>
</template>

<style scoped>
.ru-question {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
}
h3 {
    font-size: 1.2em;
    margin-bottom: 1em;
    color: #333;
}
.option-group {
    margin-bottom: 1.5em;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
}
h4 {
    font-size: 1em;
    margin: 0;
    padding: 0.5em;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ddd;
}
.option {
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.option:not(:last-child) {
    border-bottom: 1px solid #eee;
}
input[type="checkbox"] {
    margin-right: 0.5em;
}
label {
    cursor: pointer;
    margin-right: 0.5em;
}
.other-input {
    margin-left: 1.5em;
    margin-top: 0.5em;
    padding: 0.3em;
    width: calc(100% - 2em);
}
</style>