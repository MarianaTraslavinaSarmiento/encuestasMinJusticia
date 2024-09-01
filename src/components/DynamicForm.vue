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
  console.log('Actualizando respuesta:', questionId, value)
  answers.value[questionId] = value
  store.updateAnswer(questionId, value)
}

const getRelatedQuestions = (indexQuestion) => {
  console.log(`Buscando preguntas relacionadas para: ${indexQuestion.id}`)
  const allQuestions = formData.value.chapters.flatMap(chapter => chapter.questions)
  console.log('Todas las preguntas:', allQuestions)

  const parentQuestion = allQuestions.find(q => q.options && q.options.some(opt => opt.ref && opt.ref.startsWith(indexQuestion.id)))
  console.log('Pregunta padre encontrada:', parentQuestion)

  if (!parentQuestion) {
    console.log('No se encontró pregunta padre, retornando array vacío')
    return []
  }

  const selectedOptions = answers.value[parentQuestion.id] || []
  console.log('Opciones seleccionadas para la pregunta padre:', selectedOptions)

  if (selectedOptions.length === 0) {
    console.log('No hay opciones seleccionadas, retornando array vacío')
    return []
  }

  const relatedQuestions = []

  selectedOptions.forEach(selectedOption => {
    const matchingOption = parentQuestion.options.find(opt => opt.value === selectedOption)
    console.log('Opción coincidente:', matchingOption)

    if (matchingOption && matchingOption.ref) {
      const suffix = matchingOption.ref.split('.')[1]
      console.log('Sufijo de referencia:', suffix)

      const filteredOptions = indexQuestion.options.filter(opt => opt.value.startsWith(suffix))
      
      // Crear una nueva estructura de pregunta para cada sub-opción
      const subQuestions = filteredOptions.map(opt => ({
        label: '', //TODO: Extraer el label de la pregunta correspondiente, Probar en los demas forms
        id: `${indexQuestion.id}_${opt.value}`,
        type: indexQuestion.type || 'checkbox', // Usar el tipo de la pregunta indexada o 'checkbox' por defecto
        options: [{ ...opt, value: 'true' }], // Convertir la opción en una estructura de opción válida
        isSubQuestion: true // Añadir una bandera para identificar sub-preguntas
      }))

      relatedQuestions.push(...subQuestions)
    }
  })

  console.log('Preguntas relacionadas encontradas:', relatedQuestions)
  return relatedQuestions
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