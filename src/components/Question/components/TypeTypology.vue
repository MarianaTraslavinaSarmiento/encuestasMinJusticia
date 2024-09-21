<template>
  <div class="survey-container">
    <div class="survey-header">
      <div class="header-cell">{{ props.question.label }}</div>
      <div v-for="(question, index) in flattenedQuestions[0].questions" :key="index" class="header-cell">
        {{ question.label }}
      </div>
    </div>
    <div class="survey-body">
      <template v-for="(item, itemIndex) in flattenedQuestions" :key="itemIndex">
        <div v-if="isNewTypology(item, itemIndex)" class="typology-header">
          {{ item.typology }}
        </div>
        <div class="survey-row">
          <div class="category-cell">{{ item.category }}</div>
          <div class="checkbox-cell">
            <input type="checkbox" :id="`category-${itemIndex}`" />
            <label :for="`category-${itemIndex}`">Marcar con X</label>
          </div>
          <div v-for="(question, questionIndex) in item.questions" :key="questionIndex" class="question-cell">
            <Question 
              :question="question"
              :selectedOptions="selectedOptions"
              @select="handleOptionSelect"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Question from '../Question.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
});

const selectedOptions = ref({});

const handleOptionSelect = (questionId, optionId, value) => {
  if (!selectedOptions.value[questionId]) {
    selectedOptions.value[questionId] = {};
  }
  selectedOptions.value[questionId][optionId] = value;
};

const flattenedQuestions = computed(() => {
  const questions = [];
  props.question.typologies.forEach(typology => {
    typology.categories.forEach(category => {
      questions.push({
        typology: typology.label,
        category: category.label,
        questions: category.questions
      });
    });
  });
  return questions;
});

const isNewTypology = (item, index) => {
  return index === 0 || item.typology !== flattenedQuestions.value[index - 1].typology;
};
</script>

<style scoped>
.survey-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.survey-header {
  display: flex;
  background-color: #f5f5f5;
  font-weight: bold;
  border-bottom: 2px solid #ccc;
}

.header-cell {
  flex: 1;
  padding: 10px;
  text-align: left;
  border-right: 1px solid #ccc;
}

.survey-body {
  border: 1px solid #ccc;
}

.typology-header {
  background-color: #e6f3ff;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.survey-row {
  display: flex;
  border-bottom: 1px solid #ccc;
}

.category-cell, .checkbox-cell, .question-cell {
  flex: 1;
  padding: 10px;
  border-right: 1px solid #ccc;
}

.category-cell {
  flex: 0 0 200px;
}

.checkbox-cell {
  flex: 0 0 150px;
}

input[type="checkbox"] {
  margin-right: 5px;
}

@media (max-width: 768px) {
  .survey-header {
    display: none;
  }

  .survey-row {
    flex-direction: column;
  }

  .category-cell, .checkbox-cell, .question-cell {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ccc;
  }

  .category-cell, .checkbox-cell {
    flex: none;
  }
}
</style>