<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
});

const answers = ref({});

const handleAnswer = (optionId, value) => {
  answers.value[optionId] = value;
};

const isAnswered = computed(() => {
  return Object.keys(answers.value).length === props.question.options.length;
});
</script>

<template>
  <div class="type-question">
    <h3>{{ question.label }}</h3>
    <div v-for="option in question.options" :key="option.id" class="option-group">
      <p>{{ option.label }}</p>
      <div class="radio-group">
        <label v-for="choice in option.options" :key="choice.id">
          <input
            type="radio"
            :name="option.id"
            :value="choice.value"
            @change="handleAnswer(option.id, choice.value)"
          >
          {{ choice.label }}
        </label>
      </div>
    </div>
    <p v-if="isAnswered" class="completion-message">Todas las opciones han sido respondidas.</p>
  </div>
</template>

<style scoped>
.type-question {
  margin-bottom: 20px;
}

.option-group {
  margin-bottom: 15px;
}

.radio-group {
  display: flex;
  gap: 15px;
}

label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.completion-message {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}
</style>