<script setup>
import { computed } from 'vue';
import { useQuestionStore } from '@/stores/questionStore.js';
import Question from '../Question.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
});

const questionStore = useQuestionStore();

const selectedOptions = computed({
  get: () => {
    const answer = questionStore.getAnswer(props.question.id);
    return answer ? Object.keys(answer).filter(key => answer[key] === true) : [];
  },
  set: (value) => {
    const newAnswer = value.reduce((acc, optionId) => {
      acc[optionId] = true;
      return acc;
    }, {});
    questionStore.updateAnswer(props.question.id, newAnswer);
  }
});

const otherInput = computed({
  get: () => {
    const answer = questionStore.getAnswer(props.question.id);
    const otherOption = props.question.options.find(opt => opt.isOther);
    return answer && otherOption && answer[otherOption.id] || '';
  },
  set: (value) => {
    const currentAnswer = questionStore.getAnswer(props.question.id) || {};
    const otherOption = props.question.options.find(opt => opt.isOther);
    if (otherOption) {
      questionStore.updateAnswer(props.question.id, { ...currentAnswer, [otherOption.id]: value });
    }
  }
});

const isOtherSelected = computed(() => {
  const otherOption = props.question.options.find(opt => opt.isOther);
  return otherOption && selectedOptions.value.includes(otherOption.id);
});

const showGeneralRef = computed(() => {
  if (!props.question.generalRef) return false;
  
  return selectedOptions.value.some(selectedId => {
    const option = props.question.options.find(opt => opt.id === selectedId);
    return option && !option.ref;
  });
});

const specificRefQuestions = computed(() => {
  if (showGeneralRef.value) return [];
  return props.question.options
    .filter(option => option.ref && selectedOptions.value.includes(option.id))
    .map(option => option.ref);
});

const isOptionDisabled = (option) => {
  const noneOption = props.question.options.find(opt => opt.value === 'none');
  if (noneOption && selectedOptions.value.includes(noneOption.id)) {
    return option.id !== noneOption.id;
  }
  if (showGeneralRef.value) {
    return option.ref != null;
  } else {
    return !option.ref && selectedOptions.value.some(id => {
      const selectedOption = props.question.options.find(opt => opt.id === id);
      return selectedOption && selectedOption.ref;
    });
  }
};

const handleOptionChange = (option) => {
  if (isOptionDisabled(option)) return;
  const newSelectedOptions = [...selectedOptions.value];
  const index = newSelectedOptions.indexOf(option.id);
  if (index === -1) {
    if (option.value === 'none') {
      newSelectedOptions.length = 0;
    } else {
      const noneOption = props.question.options.find(opt => opt.value === 'none');
      if (noneOption) {
        const noneIndex = newSelectedOptions.indexOf(noneOption.id);
        if (noneIndex !== -1) {
          newSelectedOptions.splice(noneIndex, 1);
        }
      }
    }
    newSelectedOptions.push(option.id);
  } else {
    newSelectedOptions.splice(index, 1);
  }
  selectedOptions.value = newSelectedOptions;
};
</script>

<template>
  <div class="rm-question">
    <fieldset>
      <legend>{{ question.label }}</legend>
      <div v-for="option in question.options" :key="option.id" class="option">
        <input 
          type="checkbox" 
          :id="`question-${question.id}-${option.id}`" 
          :checked="selectedOptions.includes(option.id)"
          @change="handleOptionChange(option)"
          :disabled="isOptionDisabled(option)"
          :name="`question-${question.id}`"
        >
        <label :for="`question-${question.id}-${option.id}`">{{ option.label }}</label>
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