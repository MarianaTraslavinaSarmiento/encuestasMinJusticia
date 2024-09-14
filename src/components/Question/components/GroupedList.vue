<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
    question: {
        type: Object,
        required: true
    }
});

const selectedOptions = ref([]);
const otherInputs = ref({});

const emit = defineEmits(['update:modelValue']);

const isOptionSelected = (optionId) => {
    return selectedOptions.value.includes(optionId);
};

const updateSelection = () => {
    const result = selectedOptions.value.reduce((acc, optionId) => {
        const option = findOption(optionId);
        if (option && option.isOther) {
            acc[optionId] = otherInputs.value[optionId] || '';
        } else {
            acc[optionId] = true;
        }
        return acc;
    }, {});

    emit('update:modelValue', result);
};

const findOption = (optionId) => {
    for (const group of props.question.groups) {
        const option = group.options.find(opt => opt.id === optionId);
        if (option) return option;
    }
    return null;
};

watch(() => props.question, () => {
    selectedOptions.value = [];
    otherInputs.value = {};
}, { deep: true });
</script>


<template>
    <div class="ru-question">
        <h3>{{ question.label }}</h3>
        <div v-for="(group, groupIndex) in question.groups" :key="groupIndex" class="option-group">
            <h4>{{ group.name }}</h4>
            <div v-for="option in group.options" :key="option.id" class="option">
                <input type="checkbox" :id="option.id" :value="option.id" v-model="selectedOptions"
                    @change="updateSelection">
                <label :for="option.id">{{ option.label }}</label>
                <input v-if="option.isOther && isOptionSelected(option.id)" type="text" v-model="otherInputs[option.id]"
                    :placeholder="option.placeholder || 'Por favor especifique'" class="other-input"
                    @input="updateSelection">
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