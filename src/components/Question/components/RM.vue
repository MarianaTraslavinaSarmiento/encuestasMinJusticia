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

const refQuestions = computed(() => {
  return props.question.options
    .filter(option => option.ref && selectedOptions.value.includes(option.value))
    .map(option => option.ref);
});
</script>

<template>
  <div class="rm-question">
    <fieldset>
      <legend>{{ question.label }}</legend>
      <div v-for="option in question.options" :key="option.value" class="option">
        <input 
          type="checkbox"
          :id="`question-${question.id}-${option.value}`"
          v-model="selectedOptions"
          :value="option.value"
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

    <!-- Nested questions -->
    <div v-for="refQuestion in refQuestions" :key="refQuestion.id" class="nested-question">
      <Question :question="refQuestion" />
    </div>
  </div>
</template>

<style scoped>
</style>