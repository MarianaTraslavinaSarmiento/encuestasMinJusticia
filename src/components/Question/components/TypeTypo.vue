<script setup>
import { ref } from 'vue';
import Question from '../Question.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
});

const selectedAnswers = ref({});

const handleAnswer = (optionId, choiceValue) => {
  selectedAnswers.value[optionId] = choiceValue;
};

const getRefQuestion = (option) => {
  const selectedChoice = option.options.find(choice => choice.value === selectedAnswers.value[option.id]);
  return selectedChoice?.ref;
};
</script>

<template>
  <div class="question-container">
    <h3>{{ question.label }}</h3>
    <div v-for="option in question.options" :key="option.id" class="option-group">
      <p>{{ option.label }}</p>
      <div class="radio-group">
        <label v-for="choice in option.options" :key="choice.value">
          <input
            type="radio"
            :name="option.id"
            :value="choice.value"
            v-model="selectedAnswers[option.id]"
            @change="handleAnswer(option.id, choice.value)"
          >
          {{ choice.label }}
        </label>
      </div>
      <Question 
        v-if="getRefQuestion(option)" 
        :question="getRefQuestion(option)" 
      />
    </div>
  </div>
</template>

<style scoped>
.question-container {
  margin-bottom: 20px;
}
.option-group {
  margin-bottom: 15px;
}
.radio-group {
  display: flex;
  gap: 10px;
}
label {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>