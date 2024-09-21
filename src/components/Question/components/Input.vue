<script setup>
import { computed } from 'vue';
import { useQuestionStore } from '@/stores/questionStore.js';

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
});

const questionStore = useQuestionStore();

const inputValue = computed({
  get: () => questionStore.getAnswer(props.question.valueId),
  set: (value) => questionStore.updateAnswer(props.question.valueId, value)
});

</script>

<template>
  <div class="input-question">
    <label>{{ question.label }}</label>
    <input type="text" :id="`question-${question.valueId}`" v-model="inputValue">
  </div>
</template>

<style lang="scss" scoped>
.input-question {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-block: 20px;

  & label {
    font-size: 1rem;
    padding: 0.5rem;
    font-weight: bold;
    width: 100%;
  }
  & input {
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    width: 100%;
    margin-right: 0.5rem;
    max-height: 35px;
    border-radius: 5px;
  }
}
</style>