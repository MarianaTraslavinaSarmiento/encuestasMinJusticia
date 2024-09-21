<script setup>
import { ref, computed } from 'vue';
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

const getRefQuestion = (option, questionNumber) => {
  if (!option || typeof option !== 'object') return null;
  
  const selectedChoice = option.options && Array.isArray(option.options) 
    ? option.options.find(choice => choice.value === selectedAnswers.value[option.id])
    : null;

  return selectedChoice && selectedChoice[`p${questionNumber}`];
};

const flattenedOptions = computed(() => {
  const flatten = (options) => {
    return options.flatMap(option => {
      if (option.options && Array.isArray(option.options)) {
        return [option, ...flatten(option.options)];
      }
      return option;
    });
  };
  
  return flatten(props.question.options || []);
});
</script>

<template>
  <div class="question-container">
    <h3>{{ question.label }}</h3>
    <table class="catalog-table">
      <thead>
        <tr>
          <th>Catálogo por tipología</th>
          <th>P34. ¿Cuáles de las siguientes tipologías de problemas se tramitan con mayor frecuencia desde su competencia?</th>
          <th>P35. ¿En qué zonas del municipio se están presentando estos problemas / desacuerdos / conflictos y disputas?</th>
          <th>P36. ¿Existe ruta/protocolo de atención para estos problemas / desacuerdos / conflictos y disputas?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="option in flattenedOptions" :key="option.id">
          <td>{{ option.label }}</td>
          <td>
            <div v-if="option.options && Array.isArray(option.options)" class="radio-group">
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
          </td>
          <td>
            <Question 
              v-if="getRefQuestion(option, 35)" 
              :question="getRefQuestion(option, 35)" 
            />
          </td>
          <td>
            <Question 
              v-if="getRefQuestion(option, 36)" 
              :question="getRefQuestion(option, 36)" 
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.question-container {
  margin-bottom: 20px;
}
.catalog-table {
  width: 100%;
  border-collapse: collapse;
}
.catalog-table th, .catalog-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.catalog-table th {
  background-color: #f2f2f2;
}
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>