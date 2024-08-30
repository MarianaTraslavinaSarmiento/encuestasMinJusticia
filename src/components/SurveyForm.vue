<template>
  <form @submit.prevent="submitForm">
    <div v-for="(chapter, chapterIndex) in chapters" :key="chapterIndex">
      <h2>{{ chapter.title }}</h2>
      <div v-for="question in chapter.questions" :key="question.id">
        <question-component :question="question" v-model="formData[question.id]"
          @update:modelValue="handleQuestionUpdate(question.id, $event)" />
      </div>
    </div>
    <button type="submit">Enviar encuesta</button>
  </form>
</template>

<script>
import { reactive, toRefs } from 'vue';
import QuestionComponent from './QuestionComponent.vue';

export default {
  name: 'SurveyForm',
  components: {
    QuestionComponent
  },
  props: {
    chapters: {
      type: Array,
      required: true
    }
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const state = reactive({
      formData: {}
    });

    const handleQuestionUpdate = (questionId, value) => {
      state.formData[questionId] = value;
      handleReferences(questionId, value);
      console.log(questionId, value );
      
    };

    const handleReferences = (questionId, value) => {
      const question = findQuestion(questionId);
      
      if (question && question.options) {
        console.log("question options",question.options);
        const selectedOption = question.options.find(opt => opt.value === value);
        if (selectedOption && selectedOption.ref) {
          console.log("selected option in ref", selectedOption);
          //logic for show/hide questions based on references
          console.log(selectedOption.ref);
        }
        if (selectedOption && selectedOption.isFinal) {
          //logic for finish the form
        }
      }
    };

    const findQuestion = (questionId) => {
      for (const chapter of props.chapters) {
        const question = chapter.questions.find(q => q.id === questionId);
        if (question) return question;
      }
      return null;
    };

    const submitForm = () => {
      emit('submit', state.formData);
    };

    return {
      ...toRefs(state),
      handleQuestionUpdate,
      submitForm
    };
  }
};
</script>
