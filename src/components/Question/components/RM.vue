<script setup>
import { ref, defineProps, computed } from 'vue';
import Question from '../Question.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
});

const selectedOptions = ref([]);
const otherInput = ref('');

const isOtherSelected = computed(() => {
  return selectedOptions.value.includes('other');
});

const showGeneralRef = computed(() => {
  if (!props.question.generalRef) return false;
  
  return selectedOptions.value.some(selectedValue => {
    const option = props.question.options.find(opt => opt.value === selectedValue);
    return option && !option.ref;
  });
});

const specificRefQuestions = computed(() => {
  if (showGeneralRef.value) return [];

  return props.question.options
    .filter(option => option.ref && selectedOptions.value.includes(option.value))
    .map(option => option.ref);
});

const isOptionDisabled = (option) => {
  if (showGeneralRef.value) {
    return option.ref != null;
  } else {
    return !option.ref && selectedOptions.value.some(value => {
      const selectedOption = props.question.options.find(opt => opt.value === value);
      return selectedOption && selectedOption.ref;
    });
  }
};

const handleOptionChange = (option) => {
  if (isOptionDisabled(option)) return;

  const index = selectedOptions.value.indexOf(option.value);
  if (index === -1) {
    selectedOptions.value.push(option.value);
  } else {
    selectedOptions.value.splice(index, 1);
  }
};
</script>

<template>
  <div class="rm-question">
    <fieldset>
      <legend>{{ question.label }}</legend>
      <div v-for="option in question.options" :key="option.value" class="option">
        <input 
          type="checkbox" 
          :id="`question-${question.id}-${option.value}`" 
          :checked="selectedOptions.includes(option.value)"
          @change="handleOptionChange(option)"
          :disabled="isOptionDisabled(option)"
          :name="`question-${question.id}`"
        >
        <label :for="`question-${question.id}-${option.value}`">{{ option.label }}</label>
        <input 
          v-if="option.isOther && isOtherSelected" 
          type="text" 
          v-model="otherInput"
          :placeholder="option.placeholder || 'Please specify'" 
          class="other-input"
        >
      </div>
    </fieldset>
    
    <!-- General reference question (if applicable) -->
    <div v-if="showGeneralRef" class="nested-question">
      <Question :question="question.generalRef" />
    </div>
    
    <!-- Specific reference questions (if generalRef is not shown) -->
    <template v-else>
      <div v-for="refQuestion in specificRefQuestions" :key="refQuestion.id" class="nested-question">
        <Question :question="refQuestion" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.rm-question {
  display: flex;
  flex-direction: column;
  & fieldset {
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 5px;
    border: 1px solid rgb(202, 202, 202);

    & legend {
      font-size: 1rem;
      font-weight: bold;
      background-color: white;
      padding-right: 10px;
      padding-left: 3px;
      line-height: 30px;
    }
    .option {
      display: flex;
      gap: 0.5rem;
      padding: 0 0 0 0.5rem;
      & label {
        font-size: 1rem;
        padding: 0.5rem;
      }
      & .other-input {
        font-size: 1rem;
        padding: 0.5rem;
        width: 100%;
        border: 1px solid #ccc;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>