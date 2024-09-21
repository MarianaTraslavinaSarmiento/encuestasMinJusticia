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
    <h3 class="question-label">{{ question.label }}</h3>
    <div v-for="option in question.options" :key="option.id" class="option-group">
      <p class="option-label">{{ option.label }}</p>
      <div class="radio-group">
        <label v-for="choice in option.options" :key="choice.value" class="radio-label">
          <input
            type="radio"
            :name="option.id"
            :value="choice.value"
            v-model="selectedAnswers[option.id]"
            @change="handleAnswer(option.id, choice.value)"
          >
          <span class="radio-text">{{ choice.label }}</span>
        </label>
      </div>
      <Question 
        v-if="getRefQuestion(option)" 
        :question="getRefQuestion(option)" 
        class="nested-question"
      />
    </div>
  </div>
</template>

<style scoped>
.question-container {
  width: 100%;
  margin-bottom: 1rem;
  padding-block: 1rem;
  border-radius: 8px;
}

.question-label {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #000;
}

.option-group {
  margin-bottom: 1.5rem;
}

.option-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #000;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-label input {
  margin-right: 0.5rem;
}

.radio-text {
  font-size: 1rem;
}

.nested-question {
  margin-top: 1rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #ddd;
}

@media (max-width: 480px) {
  .question-container {
    margin: 0.5rem;
    padding: 0.5rem;
  }

  .question-label {
    font-size: 1.1rem;
  }

  .radio-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  .radio-text {
    font-size: 0.9rem;
  }

  .nested-question {
    margin-left: 0.5rem;
    padding-left: 0.5rem;
  }
}
</style>