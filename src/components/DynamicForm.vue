<template>
  <div class="dynamic-form">
    <h1>{{ props.formData.surveyTitle }}</h1>
    <div v-for="chapter in props.formData.chapters" :key="chapter.title">
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
import QuestionComponent from './QuestionComponent.vue'
import { useFormStore } from '@/stores/formStore.js'


const formStore = useFormStore()

const props = defineProps({
  formData: { type: Object, required: true }
})

const answers = ref({})

const updateAnswer = (questionId, value) => {
  console.log('Actualizando respuesta:', questionId, value)
  answers.value[questionId] = value
  formStore.updateAnswer(questionId, value)
}

const getRelatedQuestions = (indexQuestion) => {
  console.log(`Buscando preguntas relacionadas para: ${indexQuestion.id}`)
  const allQuestions = props.formData.chapters.flatMap(chapter => chapter.questions)
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

      const filteredOptions = indexQuestion.options.filter(opt => opt.value.startsWith(suffix));

      const correspondingQuestion = allQuestions.find(q => q.id === indexQuestion.id)
      const label = correspondingQuestion ? correspondingQuestion.label : ''
        
      
      // Crear una nueva estructura de pregunta para cada sub-opción
      const subQuestions = filteredOptions.map(opt => ({
         //TODO:  Probar en los demas forms, si es podible intentar que la sub ociones salgan debajo del label de la pregunta padre
        id: `${indexQuestion.id}_${opt.value}`,
        type: indexQuestion.type || 'checkbox', // Usar el tipo de la pregunta indexada o 'checkbox' por defecto
        options: [{ ...opt, value: 'true' }], // Convertir la opción en una estructura de opción válida
        isSubQuestion: true // Añadir una bandera para identificar sub-preguntas
      }))

      // label: label,

      console.log('SubQuestions:', subQuestions)

      const trasnformQuestions = {
        id: indexQuestion.id,
        label: label,
        type: indexQuestion.type || 'checkbox', // Usar el tipo de la pregunta indexada o 'checkbox' por defecto
        options: subQuestions.map(subQ => ({
          id: subQ.id,
          value: subQ.id.split('_')[1], // Tomamos la parte después del guion bajo
          label: subQ.options[0].label,
        }))
      }
      console.log('TrasnformQuestions:', trasnformQuestions)
    
      relatedQuestions.push(...[trasnformQuestions])
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
.dynamic-form h1{

  font-size: 20px;

}

h2 {
  background-color: var(--color-darkBlue);
  color: var(--color-white);
  margin-block: 20px;
  padding: 5px;
  font-size: 17px;
}


</style>