<template>
  <div class="dynamic-form">
    <h1>{{ formData.surveyTitle }}</h1>
    <div v-for="chapter in formData.chapters" :key="chapter.title">
      <h2>{{ chapter.title }}</h2>
      <div v-for="question in chapter.questions" :key="question.id">
        <template v-if="!question.isIndex">
          <QuestionComponent 
            :question="question"
            :answers="answers"
            @update-answer="updateAnswer"
          />
        </template>
        <template v-else>
          <div v-for="subQuestion in getRelatedQuestions(question)" :key="subQuestion.id">
            <QuestionComponent 
              :question="subQuestion"
              :answers="answers"
              @update-answer="updateAnswer"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useFormStore } from '@/stores/formStore.js'
import QuestionComponent from './QuestionComponent.vue'

const store = useFormStore()
const formData = computed(() => store.formData)
const answers = ref({})

const updateAnswer = (questionId, value) => {
  answers.value[questionId] = value
  store.updateAnswer(questionId, value)
}

const getRelatedQuestions = (indexQuestion) => {
  const parentQuestion = formData.value.chapters
    .flatMap(chapter => chapter.questions)
    .find(q => q.options && q.options.some(opt => opt.ref === indexQuestion.id))

  if (!parentQuestion) return []

  const selectedOption = answers.value[parentQuestion.id]
  if (!selectedOption) return []

  const matchingOption = parentQuestion.options.find(opt => opt.value === selectedOption)
  if (!matchingOption || !matchingOption.ref) return []

  const prefix = matchingOption.ref.split('.')[0]
  return indexQuestion.options.filter(opt => opt.value.startsWith(prefix))
}

watch(answers, (newAnswers) => {
  console.log('Form answers:', newAnswers)
}, { deep: true })
</script>

<style scoped>
.dynamic-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>