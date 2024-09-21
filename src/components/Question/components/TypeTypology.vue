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

const additionalQuestions = computed(() => {
  const addQuestions = [];
  flattenedQuestions.value.forEach(item => {
    item.questions.forEach(question => {
      question.options.forEach(option => {
        if (option.ref && selectedOptions.value[question.id]?.[option.id]) {
          addQuestions.push(option.ref);
        }
      });
    });
  });
  return addQuestions;
});
</script>

<template>
  <div class="survey-container">
    <table class="survey-table">
      <thead>
        <tr>
          <th>Catálogo por tipología</th>
          <th>{{ props.question.label }}</th>
          <th v-for="(question, index) in flattenedQuestions[0].questions" :key="index">
            {{ question.label }}
          </th>
          <th v-for="(addQuestion, index) in additionalQuestions" :key="`add-${index}`">
            {{ addQuestion.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, itemIndex) in flattenedQuestions" :key="itemIndex">
          <tr v-if="itemIndex === 0 || item.typology !== flattenedQuestions[itemIndex - 1].typology">
            <td :colspan="4 + additionalQuestions.length" class="typology-header">{{ item.typology }}</td>
          </tr>
          <tr>
            <td>{{ item.category }}</td>
            <td>
              <input type="checkbox" :id="`category-${itemIndex}`" />
              <label :for="`category-${itemIndex}`">Marcar con X</label>
            </td>
            <td v-for="(question, questionIndex) in item.questions" :key="questionIndex">
              <Question 
                :question="question"
                :selectedOptions="selectedOptions"
                @select="handleOptionSelect"
              />
            </td>
            <td v-for="(addQuestion, index) in additionalQuestions" :key="`add-${index}`">
              <Question 
                v-if="item.questions.some(q => q.options.some(o => o.ref && o.ref.id === addQuestion.id))"
                :question="addQuestion"
                :selectedOptions="selectedOptions"
                @select="handleOptionSelect"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.survey-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  overflow-x: auto;
}

.survey-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.survey-table th, .survey-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
  vertical-align: top;
}



.typology-header {
  background-color: #e6f3ff;
  font-weight: bold;
  text-align: center;
}
</style>