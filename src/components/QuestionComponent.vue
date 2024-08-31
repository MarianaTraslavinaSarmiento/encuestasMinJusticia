<template>
  <div class="question">
    <label :for="question.id">{{ question.label }}</label>
    <div v-if="isTextInput">
      <input 
        :id="question.id" 
        :type="question.type" 
        :value="answers[question.id]" 
        @input="updateAnswer(question.id, $event.target.value)"
      >
    </div>
    <div v-else-if="question.type === 'radio'">
      <div v-for="option in question.options" :key="option.value">
        <input 
          :id="`${question.id}_${option.value}`" 
          type="radio" 
          :value="option.value" 
          :checked="answers[question.id] === option.value"
          @change="updateAnswer(question.id, option.value)"
        >
        <label :for="`${question.id}_${option.value}`">{{ option.label }}</label>
        <input 
          v-if="option.hasOther" 
          :id="`${question.id}_${option.value}_other`" 
          type="text" 
          :value="answers[`${question.id}_other`]"
          @input="updateAnswer(`${question.id}_other`, $event.target.value)"
        >
      </div>
    </div>
    <div v-else-if="question.type === 'checkbox'">
      <div v-for="option in question.options" :key="option.value">
        <input 
          :id="`${question.id}_${option.value}`" 
          type="checkbox" 
          :value="option.value" 
          :checked="answers[question.id] && answers[question.id].includes(option.value)"
          @change="updateCheckboxAnswer(question.id, option.value)"
        >
        <label :for="`${question.id}_${option.value}`">{{ option.label }}</label>
        <input 
          v-if="option.hasOther" 
          :id="`${question.id}_${option.value}_other`" 
          type="text" 
          :value="answers[`${question.id}_${option.value}_other`]"
          @input="updateAnswer(`${question.id}_${option.value}_other`, $event.target.value)"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  question: Object,
  answers: Object
})

const emit = defineEmits(['update-answer'])

const isTextInput = computed(() => 
  ['text', 'tel', 'email'].includes(props.question.type)
)

const updateAnswer = (questionId, value) => {
  emit('update-answer', questionId, value)
}

const updateCheckboxAnswer = (questionId, optionValue) => {
  const currentAnswers = props.answers[questionId] || []
  const updatedAnswers = currentAnswers.includes(optionValue)
    ? currentAnswers.filter(v => v !== optionValue)
    : [...currentAnswers, optionValue]
  emit('update-answer', questionId, updatedAnswers)
}
</script>

<style scoped>
.question {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="tel"],
input[type="email"] {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

input[type="radio"],
input[type="checkbox"] {
  margin-right: 5px;
}
</style>